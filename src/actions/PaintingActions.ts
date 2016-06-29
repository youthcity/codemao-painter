import {Actions} from './Actions';
import {Brush} from "../def/Brush";

export class PaintingActions extends Actions {
  static select_brush(brush:Brush) {
    Actions.dispatch_action({
      action_type: 'select_brush',
      brush: brush,
    });
  }

  static add_shape() {
    Actions.dispatch_action({
      action_type: 'add_shape'
    })
  }
}