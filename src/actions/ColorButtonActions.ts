import { Actions } from './Actions';

export class ColorButtonActions extends Actions {
  set_brush_color(color: string) {
    Actions.dispatch_action({
      action_type: 'set_brush_color',
      color: color,
    });
  }
}

export const colorButtonActions = new ColorButtonActions();