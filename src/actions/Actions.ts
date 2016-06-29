import { painter_dispatcher, Payload } from '../painter_dispatcher';

export abstract class Actions {

  protected static dispatch_action(payload: Payload) {
    painter_dispatcher.dispatch(payload);
  }
}