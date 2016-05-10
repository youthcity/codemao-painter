//  todo: 多图层时,上下图层关系在绘制完毕后才应用,upper 处在最高层,透明度没有应用在 upper 层上
// import Vue from 'vue';
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
        currentObjectType: null,
        needRefreshThumbnails: false,
        costumeTitle: '',
        rotationCenter: {
          x: null,
          y: null,
        },
      },
      updateObject() {
        const canvas = this.painter.vm.canvas;
        if (canvas) {
          //  currentObject & currentObjectType
          this.state.currentObject = canvas.getActiveObject();
          if (this.state.currentObject) {
            if (this.state.currentObject.text !== undefined) {
              this.state.currentObjectType = 'text';
            } else if (this.state.currentObject.stroke) {
              this.state.currentObjectType = 'line';
            } else {
              this.state.currentObjectType = null;
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
          zIndex: '',
        },
        computed: {
          painterVisibility() {
            return this.isShowPainter ? '' : 'hidden';
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
    //  Global Events
    //  Listener of Resize
    this.onPainterResize = () => {
      this.vm.setCanvasSize(this.canvasWrapperEl.clientWidth, this.canvasWrapperEl.clientHeight);
    };
    window.addEventListener('resize', this.onPainterResize.bind(this));
    //
    //  Fabric Events
    //  Object selected events
    this.onObjectSelected = () => {
      this.store.updateObject();
    };
    this.vm.canvas.on('object:selected', this.onObjectSelected.bind(this));
    //
    //  Object removed events
    this.onObjectRemoved = () => {
      this.store.updateObject();
    };
    this.vm.canvas.on('object:removed', this.onObjectRemoved.bind(this));
    //
    //  Mouse up events
    this.onMouseUpFabric = () => {
      this.store.refreshThumbnails();
    };
    this.vm.canvas.on('mouse:up', this.onMouseUpFabric.bind(this));
    //
    //  Slection cleared events
    this.vm.canvas.on('selection:cleared', this.store.updateObject.bind(this.store));
  }

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
}

window.painterObject = new Painter('painter-wrapper');
