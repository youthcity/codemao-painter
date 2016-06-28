export interface PainterStates {
  [prop_name: string]: any;
  panel_type: string;
  current_color: string;
}
//
// export class PainterStates implements PainterStatesValue {
//   [prop_name: string]: any;
//   /**
//    * Type of the tool panel. (painting, background, layer)
//    */
//   private _panel_type: string;
//   get panel_type() {
//     return this._panel_type;
//   }
//
//   set panel_type(newValue: string) {
//     this._panel_type = newValue;
//   }
//
//   /**
//    * Current color of fabric.js, use for painting.
//    */
//   _current_color: string;
//   get current_color() {
//     return this._current_color;
//   }
//
//   set current_color(newValue: string) {
//     this._current_color = newValue;
//   }
//
//   constructor(states: PainterStatesValue) {
//     this.setStates(states);
//   }
//
//   setStates(states: PainterStatesValue) {
//     let keys: string[] = Object.keys(states);
//     keys.forEach((key: string) => {
//       if (this.hasOwnProperty(key)) {
//         this[key] = states[key];
//       }
//     });
//   }
//  
//   exportStates() {
//     let states = Object.assign({}, this);
//     return 
//   }
// }