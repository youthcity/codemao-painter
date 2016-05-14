//  todo: 多图层时,上下图层关系在绘制完毕后才应用,upper 处在最高层,透明度没有应用在 upper 层上
//  todo: 撤销功能还需完成: 图层透明度, 设置清除背景, 显示隐藏
// import Vue from 'vue';
import 'babel-polyfill';
import '../css/common.css';

import '../js/override/static-canvas';
import '../js/override/canvas.js';
import '../js/override/canvas-events.js';
import '../js/override/base-brush.js';
import '../js/override/pencil-brush.js';
import '../js/layer.js';
import '../js/layer-manager.js';
import '../js/cursor-render.js';
import '../js/eraser-brush.js';
import '../js/point-brush.js';
import '../js/line-brush.js';
import '../js/rect-brush.js';
import '../js/round-brush.js';
import './color/colors.js';
import './color/colorPicker.data.js';
import './color/colorPicker.js';
import './color/jsColor.js';

import painter from '../vue/painter.vue';

class Painter {
  constructor(el) {
    /**
     * State Manager
     * @type {{
     *          painter: Painter,
     *          state: {currentObject: null, currentObjectType: null},
     *          updateObject: (function())
     *       }}
     */
    this.store = {
      painter: this,
      state: {
        currentObject: null,
        currentGroup: null,
        currentObjectType: '',
        needRefreshThumbnails: false,
        costumeTitle: '',
        rotationCenter: {
          x: null,
          y: null,
        },
        objectOpacity: 1,
        currentFontSize: 40,
      },
      updateObject() {
        const canvas = this.painter.vm.canvas;
        const currentObject = canvas.getActiveObject();
        if (canvas) {
          //  currentObject & currentObjectType
          this.state.currentObject = currentObject;
          if (this.state.currentObject) {
            if (currentObject.text !== undefined) {
              this.state.currentObjectType = 'text';
            } else if (currentObject.stroke) {
              this.state.currentObjectType = 'line';
            } else if (currentObject instanceof fabric.Image) {
              this.state.currentObjectType = 'image';
            } else {
              this.state.currentObjectType = '';
            }
            this.state.objectOpacity = currentObject.opacity;
            if (this.state.currentObjectType === 'text') {
              this.state.currentFontSize = currentObject.fontSize;
            }
          }
          //  currentGroup
          this.state.currentGroup = canvas.getActiveGroup();
        }
      },
      refreshThumbnails() {
        this.state.needRefreshThumbnails = true;
      },
      setCostumeName(val) {
        this.state.costumeTitle = val;
      },
    };

    this.vm = new Vue(
      {
        el: '#painter-wrapper',
        components: { painter },
        data: {
          canvas: null,
          layerManager: null,
          painter: this,
          isShowPainter: false,
        },
        computed: {
          painterVisibility() {
            return this.isShowPainter ? '' : 'hidden';
          },
          zIndex() {
            return this.isShowPainter ? '100' : '';
          },
        },
        methods: {
          setCanvasSize(width, height) {
            this.canvas.setWidth(width);
            this.canvas.setHeight(height);
            this.canvas.layerManager.setBackgroundImageURL();
          },
        },
        events: {
          'painter-save'() {
            this.painter.save();
          },
          'painter-cancel'() {
            this.painter.close();
          },
        },
      }
    );

    /**
     * Init DOM Element
     * @type {Element}
     */
    this.painterEl = document.querySelector(`#${el}`);
    this.canvasWrapperEl = this.painterEl.querySelector('.painter-canvas-wrapper');
    this.canvasEl = this.canvasWrapperEl.querySelector('.painter-canvas');
    this.initColorPicker();
    this.initFabricCanvas();
    this.initListener();
  }

  /**
   * Init canvas
   */
  initFabricCanvas() {
    this.vm.canvas = new fabric.Canvas(this.canvasEl);
    this.vm.setCanvasSize(this.canvasWrapperEl.clientWidth, this.canvasWrapperEl.clientHeight);

    this.vm.canvas.setFreeDrawingBrush('pencil', {
      width: 5,
      color: '#333',
      opacity: 1,
    });
    this.vm.canvas.setDrawingMode(true);
  }

  /**
   * Init Color Picker
   */
  initColorPicker() {
    this.colorPicker = jsColorPicker('input.color', {
      customBG: '#333333',
      // readOnly: true,
      init(ele) { // colors is a different instance (not connected to colorPicker)
        Object.assign(ele, {
          type: '',
        });
        // elm.style.backgroundColor = elm.value;
        // elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
      },
    });
  }

  initListener() {
    /**
     * Global Events
     * Listener of Resize
     */
    this.onPainterResize = () => {
      this.vm.setCanvasSize(this.canvasWrapperEl.clientWidth, this.canvasWrapperEl.clientHeight);
    };
    window.addEventListener('resize', this.onPainterResize.bind(this));
    /**
     * Fabric Events
     * Object selected events
     */
    this.onObjectSelected = () => {
      this.store.updateObject();
    };
    this.vm.canvas.on('object:selected', this.onObjectSelected.bind(this));
    /**
     *  Mouse up events
     */
    this.onMouseUpFabric = () => {
      this.store.refreshThumbnails();
    };
    this.vm.canvas.on('mouse:up', this.onMouseUpFabric.bind(this));
    /**
     *  Selection cleared events
     */
    this.vm.canvas.on('selection:cleared', this.store.updateObject.bind(this.store));
    /**
     *  Path created events (Objects created)
     * @param event
     */
    this.onPathCreated = (event) => {
      this.toUndoStack(event, 'pathCreated');
    };
    this.vm.canvas.on('path:created', this.onPathCreated.bind(this));
    /**
     *  Object modified events
     * @param event
     */
    this.onObjectModified = (event) => {
      this.toUndoStack(event, 'objectModified');
    };
    this.vm.canvas.on('object:modified', this.onObjectModified.bind(this));
    this.vm.canvas.on('object:removed', this.onObjectRemoved.bind(this));
    this.vm.canvas.on('selected:removed', this.onSelectedRemoved.bind(this));
    this.vm.canvas.on('canvas:cleared', this.onCanvasCleared.bind(this));
    this.vm.canvas.on('eraser:done', this.onEraserDone.bind(this));
    this.vm.canvas.on('color:changed', this.onColorChanged.bind(this));
    this.vm.canvas.on('opacity:changed', this.onOpacityChanged.bind(this));
    this.vm.canvas.on('text:changed', this.onTextChanged.bind(this));
    this.vm.canvas.on('fontSize:changed', this.onFontSizeChanged.bind(this));
    // this.vm.canvas.on('background:changed', this.onBackgroundChanged.bind(this));
  }

  /**
   * Object removed events
   */
  onObjectRemoved() {
    this.store.updateObject();
  }

  /**
   * Selected removed events
   * @param event
   */
  onSelectedRemoved(event) {
    this.toUndoStack(event, 'selectedRemoved');
  }

  /**
   * Canvas cleared events
   * @param event
   */
  onCanvasCleared(event) {
    this.toUndoStack(event, 'canvasCleared');
  }

  /**
   * Eraser done events
   * @param event
   */
  onEraserDone(event) {
    this.toUndoStack(event, 'eraserDone');
  }

  /**
   * Color changed events
   * @param event
   */
  onColorChanged(event) {
    this.toUndoStack(event, 'colorChanged');
  }

  onOpacityChanged(event) {
    this.toUndoStack(event, 'opacityChanged');
    this.store.updateObject();
  }

  onTextChanged(event) {
    this.toUndoStack(event, 'textChanged');
  }

  onFontSizeChanged(event) {
    this.toUndoStack(event, 'fontSizeChanged');
  }

  // onBackgroundChanged(event) {
  //   this.toUndoStack(event, 'backgroundChanged');
  // }

  openIn(img, name, options) {
    this.vm.isShowPainter = true;
    this.vm.zIndex = '100';
    const x = this.vm.canvas.width / 2;
    const y = this.vm.canvas.height / 2;
    let width = 0;
    let height = 0;
    if (options) {
      width = options.width;
      height = options.height;
      this.vm.canvas.rotationPoint = {
        x: (width > this.vm.canvas.width) ? x : options.rotationCenter.x
        + (this.vm.canvas.width - width) / 2,
        y: (height > this.vm.canvas.height) ? y : options.rotationCenter.y
        + (this.vm.canvas.height - height) / 2,
      };
      this.vm.canvas.callback = options.callback;
    }
    this.vm.canvas.clear();

    this.store.state.costumeTitle = name;

    this.vm.canvas.setHeight(this.canvasWrapperEl.clientHeight);
    this.vm.canvas.setWidth(this.canvasWrapperEl.clientWidth);
    if (img) {
      this.addImage(img, (this.vm.canvas.width - width) / 2, (this.vm.canvas.height - height) / 2);
    }

    this.store.refreshThumbnails();
    this.vm.canvas.layerManager.setBackgroundImageURL('');
    this.vm.canvas.layerManager.setBackgroundColor('transparent');
    this.vm.canvas.renderAll();

    // this.vm.canvas.setFreeDrawingBrush('pencil', {
    //   width: 5,
    //   color: '#333',
    //   opacity: 1,
    // });
    //  this.vm.canvas.setDrawingMode(true);
  }

  save() {
    const param = {};
    this.vm.canvas.setDrawingMode(false);
    this.vm.canvas.layerManager.combineAllLayers();
    const activeObj = this.vm.canvas.getActiveObject();
    const activeGroup = this.vm.canvas.getActiveGroup();
    if (activeGroup) {
      const objectsInGroup = activeGroup.getObjects();
      this.vm.canvas.discardActiveGroup();
      objectsInGroup.forEach((obj) => {
        Object.assign(obj, { active: false });
      });
    }
    if (activeObj) {
      activeObj.active = false;
    }
    this.vm.canvas.renderAll();
    this.vm.canvas.setZoom(1);

    const data = document.createElement('canvas');
    data.width = this.vm.canvas.lowerCanvasEl.width;
    data.height = this.vm.canvas.lowerCanvasEl.height;
    data.getContext('2d').imageSmoothingEnabled = false;
    data.getContext('2d').drawImage(this.vm.canvas.lowerCanvasEl, 0, 0);
    param.img = data;
    param.src = data.toDataURL();
    param.rc = this.vm.canvas.rotationPoint;
    param.name = this.store.state.costumeTitle;

    if (this.vm.canvas.callback) {
      this.vm.canvas.callback(param);
    }

    this.close();
  }

  close() {
    this.vm.isShowPainter = false;
    this.vm.zIndex = '';
    this.vm.canvas.clear();
    this.vm.canvas.layerManager.setBackgroundImageURL('');
    this.vm.canvas.layerManager.setBackgroundColor('transparent');
    // this.vm.canvas.renderAll();
  }

  addImage(path, x, y) {
    fabric.Image.fromURL(path, (image) => {
      image.set({
        left: x || 0,
        top: y || 0,
        angle: 0,
      }).scale(1).setCoords();
      this.vm.canvas.add(image);
      this.vm.canvas.setHeight(this.canvasWrapperEl.clientHeight);
      this.vm.canvas.setWidth(this.canvasWrapperEl.clientWidth);
      this.vm.canvas.renderAll();
    });
  }

  /**
   * Push state to undo stack
   */
  toUndoStack(event, type) {
    const currentLayer = this.vm.canvas.layerManager.currentLayer;
    currentLayer.undoStack.push({
      event,
      type,
    });
    currentLayer.redoStack = [];
  }

  undo() {
    const canvas = this.vm.canvas;
    const currentLayer = canvas.layerManager.currentLayer;
    const action = currentLayer.undoStack.pop();
    let target;
    if (action) {
      const event = action.event;
      switch (action.type) {
        case 'pathCreated':
          canvas.remove(event.path);
          break;
        case 'eraserDone':
          currentLayer.objects.splice(0);
          Array.prototype.push.apply(currentLayer.objects, event.objects);
          canvas.renderAll();
          break;
        case 'objectModified':
          switch (event.action) {
            case 'drag':
              event.target.setLeft(event.oldLeft);
              event.target.setTop(event.oldTop);
              break;
            case 'rotate':
              event.target.setAngle(event.oldAngle);
              break;
            case 'scale':
              event.target.setScaleX(event.oldScaleX);
              event.target.setScaleY(event.oldScaleY);
              event.target.setLeft(event.oldLeft);
              event.target.setTop(event.oldTop);
              break;
            case 'scaleX':
              event.target.setScaleX(event.oldScaleX);
              event.target.setLeft(event.oldLeft);
              break;
            case 'scaleY':
              event.target.setScaleY(event.oldScaleY);
              event.target.setTop(event.oldTop);
              break;
            default:
          }
          event.target.setCoords();
          canvas.renderAll();
          break;
        case 'selectedRemoved':
          if (event.group) {
            event.group.forEach((object) => {
              canvas.add(object);
            });
          } else {
            canvas.add(event.object);
          }
          break;
        case 'canvasCleared':
          event.objects.forEach((object) => {
            canvas.add(object);
          });
          break;
        case 'colorChanged':
          target = event.target;
          if (target.stroke) {
            target.stroke = event.oldColor;
          } else if (target.fill) {
            target.fill = event.oldColor;
          }
          canvas.renderAll();
          break;
        case 'opacityChanged':
          event.target.opacity = event.oldValue;
          canvas.renderAll();
          this.store.updateObject();
          break;
        case 'textChanged':
          event.target.text = event.oldValue;
          canvas.renderAll();
          break;
        case 'fontSizeChanged':
          event.target.fontSize = event.oldValue;
          this.store.updateObject();
          canvas.renderAll();
          break;
        default:
      }
      currentLayer.redoStack.push(action);
    }
  }

  redo() {
    const canvas = this.vm.canvas;
    const currentLayer = canvas.layerManager.currentLayer;
    const action = currentLayer.redoStack.pop();
    let target;
    if (action) {
      const event = action.event;
      switch (action.type) {
        case 'pathCreated':
          canvas.add(event.path);
          break;
        case 'eraserDone':
          currentLayer.objects.splice(0, Number.MAX_VALUE, event.image);
          canvas.renderAll();
          break;
        case 'objectModified':
          switch (event.action) {
            case 'drag':
              event.target.setLeft(event.newLeft);
              event.target.setTop(event.newTop);
              break;
            case 'rotate':
              event.target.setAngle(event.newAngle);
              break;
            case 'scale':
              event.target.setScaleX(event.newScaleX);
              event.target.setScaleY(event.newScaleY);
              event.target.setLeft(event.newLeft);
              event.target.setTop(event.newTop);
              break;
            case 'scaleX':
              event.target.setScaleX(event.newScaleX);
              event.target.setLeft(event.newLeft);
              break;
            case 'scaleY':
              event.target.setScaleY(event.newScaleY);
              event.target.setTop(event.newTop);
              break;
            default:
          }
          canvas.renderAll();
          break;
        case 'selectedRemoved':
          if (event.group) {
            event.group.forEach((object) => {
              canvas.remove(object);
            });
          } else {
            canvas.remove(event.object);
          }
          break;
        case 'canvasCleared':
          event.objects.forEach((object) => {
            canvas.remove(object);
          });
          break;
        case 'colorChanged':
          target = event.target;
          if (target.stroke) {
            target.stroke = event.newColor;
          } else if (target.fill) {
            target.fill = event.newColor;
          }
          canvas.renderAll();
          break;
        case 'opacityChanged':
          event.target.opacity = event.newValue;
          canvas.renderAll();
          this.store.updateObject();
          break;
        case 'textChanged':
          event.target.text = event.newValue;
          canvas.renderAll();
          break;
        case 'fontSizeChanged':
          event.target.fontSize = event.newValue;
          this.store.updateObject();
          canvas.renderAll();
          break;
        default:
      }
      currentLayer.undoStack.push(action);
    }
  }
}

window.painterObject = new Painter('painter-wrapper');
