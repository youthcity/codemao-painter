import { config } from './config';
import { PainterStates } from './PainterStates';
import * as EventEmitter from 'eventemitter3';
import { fabricCanvas } from './fabricCanvas';


class PainterStore extends EventEmitter {
  private _states: PainterStates;
  get states() {
    return this._states;
  }

  constructor() {
    super();
    this._states = config.default_states;
  }

  select_color_handler(color: string) {
    this._states.current_color = color;
  }
  
  emit_select_color() {
    this.emit('select_color');
  }
  
  

  emit_change() {
    this.emit('change');
  }

  add_change_listener(callback: () => void) {
    this.on('change', callback);
  }

  remove_change_listener(callback: () => void) {
    this.removeListener('change', callback);
  }
}

export const painterStore = new PainterStore();