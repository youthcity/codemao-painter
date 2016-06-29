import {Dispatcher} from 'flux';
import {painterStore} from "./painterStore";
import {Brush} from "./def/Brush";

export interface Payload {
  action_type:string;
  color?:string;
  brush?:Brush;
}

interface ActionList {
  [action:string]:any;
}

const action_list:ActionList = {
  'select_color': (payload:Payload) => {
    painterStore.select_color_handler(payload.color);
    painterStore.emit_change();
  },
  'select_brush': (payload:Payload) => {
    painterStore.select_brush_handler(payload.brush);
    painterStore.emit_change();
  },
  'add_shape':() => {
    painterStore.select_brush_handler();
    painterStore.emit_change();
  }
};

const painter_dispatcher = new Dispatcher();

painter_dispatcher.register((payload:Payload) => {
  action_list[payload.action_type](payload);
});

export {painter_dispatcher};