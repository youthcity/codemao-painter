import {Brush} from "./def/Brush";

export interface PainterStates {
  [prop_name:string]:any;
  panel_type:string;
  current_brush:Brush;
  current_color:string;
  current_width:number;
  line_width:{
    [prop_name:string]:any
  };
  brush_color:{
    [prop_name:string]:any
  };
}
