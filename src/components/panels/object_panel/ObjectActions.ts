import { painter_dispatcher } from "../../../painter_dispatcher";

export class ObjectActions {
  // static set_font_size(font_size:number) {
  //   Actions.dispatch_action({
  //     action_type: 'set_font_size',
  //     object_props: {
  //       font_size
  //     },
  //   });
  // }

  static set_selected_text(text:string) {
    painter_dispatcher.dispatch({
      action_type: 'set_selected_text',
      text
    });
  }
  
  static set_selected_opacity(opacity:number) {
    painter_dispatcher.dispatch({
      action_type: 'set_selected_opacity',
      opacity
    });
  } 
}