import {Actions} from './Actions';
import {Brush} from "../def/Brush";

export class PaintingActions extends Actions {
  static set_brush(brush:Brush = Brush.pointer) {
    Actions.dispatch_action({
      action_type: 'set_brush',
      brush: brush,
    });
  }

  static add_shape() {
    Actions.dispatch_action({
      action_type: 'add_shape'
    })
  }
  
  static set_brush_width(width:number) {
    Actions.dispatch_action({
      action_type: 'set_brush_width',
      width: width
    })
  }
  
  static set_brush_color(color:string) {
    Actions.dispatch_action({
      action_type: 'set_brush_color',
      color: color
    });
  }
}