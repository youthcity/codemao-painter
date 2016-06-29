import { Actions } from './Actions';

export class ColorButtonActions extends Actions {
  select_color(color: string) {
    Actions.dispatch_action({
      action_type: 'select_color',
      color: color,
    });
  }
}

export const colorButtonActions = new ColorButtonActions();