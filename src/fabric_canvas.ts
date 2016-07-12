// import './js/override/static-canvas';
// import './js/override/canvas.js';
// import './js/override/canvas-events.js';
// import './js/override/base-brush.js';
// import './js/override/pencil-brush.js';
import '../libs/fabric.js/dist/fabric.min.js';
import './js/layer.js';
import './js/layer-manager.js';
import './js/cursor-render.js';
import './js/eraser-brush.js';
import './js/point-brush.js';
import './js/line-brush.js';
import './js/rect-brush.js';
import './js/round-brush.js';

import {Brush} from './def/Brush';
import {Shape} from './def/Shape';
import {Point} from "./def/Point";
import { trim_canvas } from "./trim-canvas";

//  todo: use modules
const global:any = window;

class FabricCanvas {
  private _canvas:any;
  // get canvas() {
  //   return this._canvas;
  // }

  private last_shape:Shape;
  private shape_offset:number = 0;

  init(element:any, wrapper_element:any) {
    this._canvas = new global.fabric.Canvas(element);
    this.set_canvas_size(wrapper_element.clientWidth, wrapper_element.clientHeight);

    this._canvas.setFreeDrawingBrush(Brush[Brush.pencil], {
      width: 5,
      color: '#333',
      opacity: 1,
    });
    this._canvas.setDrawingMode(true);
  }

  public add_listener(event:string, listener:()=>void) {
    this._canvas.on(event, listener);
  }

  public remove_listener(event:string, listener:()=>void) {
    this._canvas.off(event, listener);
  }

  /**
   * Set size of the fabric canvas
   * @param width
   * @param height
   */
  set_canvas_size(width:number, height:number) {
    this._canvas.setWidth(width);
    this._canvas.setHeight(height);
    this._canvas.layerManager.setBackgroundImageURL();
  }

  /**
   * Select color and set fabric color.
   * @param color
   */
  set_brush_color(color:string) {
    if (this._canvas) {
      if (this._canvas.freeDrawingBrush) {
        this._canvas.freeDrawingBrush.color = color;
      }
    }
  }

  set_brush(brush = Brush.pointer, width = 7, color = '#333') {
    if (brush !== Brush.pointer) {
      this._canvas.deactivateAll();
      this._canvas.renderAll();
      this._canvas.setDrawingMode(true);
      this._canvas.setFreeDrawingBrush(Brush[brush], {
        width: width,
        color: color,
      });
      this.last_shape = undefined;
    } else {
      this._canvas.setDrawingMode(false);
    }
  }

  set_brush_width(width:number) {
    if (this._canvas.freeDrawingBrush)
    this._canvas.freeDrawingBrush.width = width;
  }

  add_shape(shape:Shape, width = 7, color = '#333') {
    let shape_object:any;
    this.set_brush();
    if (shape === this.last_shape) {
      this.shape_offset += 10;
    } else {
      this.shape_offset = 0;
    }

    switch (shape) {
      case Shape.rect:
        shape_object = new global.fabric.Rect({
          left: this._canvas.getWidth() / 2 - width * 5 + this.shape_offset,
          top: this._canvas.getHeight() / 2 - width * 5 + this.shape_offset,
          fill: color,
          width: width * 10,
          height: width * 10,
        });
        break;
      case Shape.round:
        shape_object = new global.fabric.Circle({
          left: this._canvas.getWidth() / 2 - width * 5 + this.shape_offset,
          top: this._canvas.getHeight() / 2 - width * 5 + this.shape_offset,
          fill: color,
          radius: width * 10,
        });
        break;
      case Shape.triangle:
        shape_object = new global.fabric.Triangle({
          left: this._canvas.getWidth() / 2 - width * 5 + this.shape_offset,
          top: this._canvas.getHeight() / 2 - width * 5 + this.shape_offset,
          fill: color,
          width: width * 10,
          height: width * 10,
        });
        break;
      case Shape.text:
        const text = '点我选中文字，在画布下方可以修改文字内容和样式哦~';
        shape_object = new global.fabric.Text(text, {
          left: this._canvas.getWidth() / 2 + this.shape_offset,
          top: this._canvas.getHeight() / 2 + this.shape_offset,
          fontFamily: 'Microsoft YaHei',
          angle: 0,
          fill: color,
          scaleX: 1,
          scaleY: 1,
          fontWeight: '',
          originX: 'center',
          originY: 'center',
          hasRotatingPoint: true,
          centerTransform: true,
        });
        break;
      default:
        throw(new Error('Shape not found!'));
    }
    this._canvas.add(shape_object);
    this._canvas.setActiveObject(shape_object);
    this._canvas.fire('path:created', {path: shape_object});

    this.last_shape = shape;
  }

  add_image(url:string, x:number, y:number) {
    let image = global.fabric.Image.fromURL(url, (image:any) => {
      image.set({
        left: x || 0,
        top: y || 0,
        angle: 0,
      }).scale(1).setCoords();
      this._canvas.add(image);
      this._canvas.renderAll();
    },{crossOrigin:'*'});
  }

  set_rotate_center(point:Point) {
    this._canvas.rotationPoint = point;
  }

  get_rotate_center():Point {
    return this._canvas.rotationPoint;
  }

  clear() {
    this._canvas.clear();
  }

  get_canvas_width() {
    return this._canvas.width;
  }

  get_canvas_height() {
    return this._canvas.height;
  }

  get_data_url():string {
    const param = {};
    this._canvas.setDrawingMode(false);
    this._canvas.layerManager.combineAllLayers();
    const activeObj = this._canvas.getActiveObject();
    const activeGroup = this._canvas.getActiveGroup();
    if (activeGroup) {
      const objectsInGroup = activeGroup.getObjects();
      this._canvas.discardActiveGroup();
      objectsInGroup.forEach((obj:any) => {
        obj.active = false;
      });
    }
    if (activeObj) {
      activeObj.active = false;
    }
    this._canvas.renderAll();
    this._canvas.setZoom(1);

    const data = document.createElement('canvas');
    data.width = this._canvas.lowerCanvasEl.width;
    data.height = this._canvas.lowerCanvasEl.height;
    (data.getContext('2d') as any).imageSmoothingEnabled = false;
    data.getContext('2d').drawImage(this._canvas.lowerCanvasEl, 0, 0);
    return data.toDataURL();
  }

  get_trimed_data_url():string {
    const param = {};
    this._canvas.setDrawingMode(false);
    this._canvas.layerManager.combineAllLayers();
    const activeObj = this._canvas.getActiveObject();
    const activeGroup = this._canvas.getActiveGroup();
    if (activeGroup) {
      const objectsInGroup = activeGroup.getObjects();
      this._canvas.discardActiveGroup();
      objectsInGroup.forEach((obj:any) => {
        obj.active = false;
      });
    }
    if (activeObj) {
      activeObj.active = false;
    }
    this._canvas.renderAll();
    this._canvas.setZoom(1);

    return trim_canvas(this._canvas.lowerCanvasEl).toDataURL();
  }

  public remove_selected() {
    const activeObject = this._canvas.getActiveObject();
    const activeGroup = this._canvas.getActiveGroup();
    if (activeGroup) {
      const objectsInGroup = activeGroup.getObjects();
      this._canvas.discardActiveGroup();
      objectsInGroup.forEach((object:any) => {
        this._canvas.remove(object);
      });
    } else if (activeObject) {
      this._canvas.remove(activeObject);
    }
  }
  
  // public get_selected_object() {
  //   return this._canvas.getActiveObject();
  // }
  public is_selected() {
    const activeObj = this._canvas.getActiveObject();
    const activeGroup = this._canvas.getActiveGroup();
    return (activeObj || activeGroup)? true : false;
  }
  
  public get_selected_color() {
    const cur_object = this._canvas.getActiveObject();
    if (cur_object) {
      return cur_object.fill || cur_object.stroke;
    }
  }
  
  public set_selected_color(color:string) {
    const cur_object = this._canvas.getActiveObject();
    if (!cur_object) {
      return;
    }
    if (cur_object.fill) {
      cur_object.fill = color;
    } else {
      cur_object.stroke = color;
    }
    this._canvas.renderAll();
  }

  public get_selected_text() {
    const selected_object = this._canvas.getActiveObject();
    if (selected_object) {
      return selected_object.text;
    }
  }

  public set_selected_text(text:string) {
    const selected_object = this._canvas.getActiveObject();
    if (selected_object) {
      selected_object.set('text', text).setCoords();
      this._canvas.renderAll();
    }
  }
  
  public get_selected_opacity() {
    const selected_object = this._canvas.getActiveObject();
    if (selected_object) {
      return selected_object.getOpacity();
    }
  }

  public set_selected_opacity(opacity:number) {
    const selected_object = this._canvas.getActiveObject();
    const selected_group = this._canvas.getActiveGroup();
    if (selected_group) {
      selected_group.getObjects().forEach((object:any) => {
        object.setOpacity(opacity);
      });
      this._canvas.renderAll();
    } else if (selected_object) {
      selected_object.setOpacity(opacity);
      this._canvas.renderAll();
    }
  }
}

export let fabric_canvas = new FabricCanvas();
