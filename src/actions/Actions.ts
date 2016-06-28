import { painterDispatcher, Payload } from '../painterDispatcher';

export abstract class Actions {
  protected dispatch_action(payload: Payload) {
    painterDispatcher.dispatch(payload);
  }
}