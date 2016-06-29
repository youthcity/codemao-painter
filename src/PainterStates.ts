import {Brush} from "./def/Brush";

export interface PainterStates {
  [prop_name:string]:any;
  panel_type:string;
  current_brush:Brush;
  current_color:string;
  current_width:number;
  line_width:{};
  brush_color:{};
}
