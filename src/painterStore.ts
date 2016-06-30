import {config} from './config';
import {PainterStates} from './PainterStates';
import * as EventEmitter from 'eventemitter3';
import {Brush} from "./def/Brush";
import {fabric_canvas} from "./fabric_canvas";


class PainterStore extends EventEmitter {
  private _states:PainterStates;
  get states() {
    return this._states;
  }

  constructor() {
    super();
    this._states = config.default_states;
  }

  set_brush_color_handler(color:string) {
    fabric_canvas.set_brush_color(color);
    this._states.current_color = color;
  }

  set_brush_handler(brush:Brush = Brush.pointer) {
    this._states.line_width[Brush[this._states.current_brush]] = this._states.current_width;
    this._states.brush_color[Brush[this._states.current_brush]] = this._states.current_color;

    fabric_canvas.set_brush(brush);
    this._states.current_brush = brush;

    this._states.current_width = this._states.line_width[Brush[brush]];
    fabric_canvas.set_brush_width(this._states.current_width);

    this._states.current_color = this._states.brush_color[Brush[brush]];
    fabric_canvas.set_brush_color(this._states.current_color)
  }
  
  set_brush_width_handler(width:number) {
    this._states.current_width = width;
    fabric_canvas.set_brush_width(width);
  }

  // emit_select_color() {
  //   this.emit('set_brush_color');
  // }


  emit_change() {
    this.emit('change');
  }

  add_change_listener(callback:() => void) {
    this.on('change', callback);
  }

  remove_change_listener(callback:() => void) {
    this.removeListener('change', callback);
  }
}

export const painterStore = new PainterStore();