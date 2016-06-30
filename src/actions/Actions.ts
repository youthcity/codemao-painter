import { painter_dispatcher} from '../painter_dispatcher';
import {ActionPayload} from "../def/ActionPayload";

export abstract class Actions {

  protected static dispatch_action(payload: ActionPayload) {
    painter_dispatcher.dispatch(payload);
  }
}