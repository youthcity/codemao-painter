import {Dispatcher} from 'flux';
import {painterStore} from "./painterStore";
import {Brush} from "./def/Brush";
import {ActionPayload} from "./def/ActionPayload";

interface ActionList {
  [action:string]:any;
}

const action_list:ActionList = {
  'set_brush_color': (payload:ActionPayload) => {
    painterStore.set_brush_color_handler(payload.color);
    painterStore.emit_change();
  },
  'set_brush': (payload:ActionPayload) => {
    painterStore.set_brush_handler(payload.brush);
    painterStore.emit_change();
  },
  'add_shape':() => {
    painterStore.set_brush_handler();
    painterStore.emit_change();
  },
  'set_brush_width':(payload:ActionPayload) => {
    painterStore.set_brush_width_handler(payload.width);
    painterStore.emit_change();
  },
};

const painter_dispatcher = new Dispatcher();

painter_dispatcher.register((payload:ActionPayload) => {
  action_list[payload.action_type](payload);
});

export {painter_dispatcher};