import { Dispatcher } from 'flux';
import { painterStore } from "./painterStore";

export interface Payload {
  action_type: string;
  color?: string;
}

interface ActionList {
  [action: string]: any;
}

const action_list: ActionList = {
  'select_color': (payload: Payload) => {
    painterStore.select_color_handler(payload.color);
    painterStore.emit_change();
  }
};

const painterDispatcher = new Dispatcher();

painterDispatcher.register((payload: Payload) => {
  action_list[payload.action_type](payload);
});

export { painterDispatcher };