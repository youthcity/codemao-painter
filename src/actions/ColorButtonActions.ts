import { Actions } from './Actions';

class ColorButtonActions extends Actions {
  select_color(color: string) {
    this.dispatch_action({
      action_type: 'select_color',
      color: color,
    });
  }
}

export const colorButtonActions = new ColorButtonActions();