import {Brush} from "./Brush";

export interface ActionPayload {
  action_type:string;
  color?:string;
  brush?:Brush;
  width?:number;
  text?:string;
  opacity?:number;
}