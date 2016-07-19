import * as React from "react";
import  '../../../css/ObjectPanel.css';
import { fabric_canvas } from "../../../fabric_canvas";
import { ObjectActions } from "./ObjectActions";

export interface ObjectPanelProps {
  is_show:boolean;
  text:string;
  opacity:number;
}

let remove_png = require('../../../../assets/remove.png');

export class ObjectPanel extends React.Component<ObjectPanelProps, {}> {
  private set_selected_text() {
    ObjectActions.set_selected_text((this.refs['selected_text'] as any).value);
  }

  private set_selected_opacity() {
    ObjectActions.set_selected_opacity((this.refs['selected_opacity'] as any).value);
  }

  public render() {
    let style = this.props.is_show ? null : {
      visibility: 'hidden'
    };

    return <div className="painter-object-panel" style={ style }>
      <label className="object-opacity"> 透明度 -
        <input ref="selected_opacity" title=" 透明度" type="range" min="0" max="1" step="0.01" value={this.props.opacity}
               onChange={this.set_selected_opacity.bind(this)}/>+
        <span>{this.props.opacity}</span>
      </label>
      { this.props.text ?  <textarea ref="selected_text" className="object-text" title="文字内容" value={this.props.text}
                                     onChange={this.set_selected_text.bind(this)}/> : null}
      <div title="删除对象" className="remove-button" onClick={fabric_canvas.remove_selected.bind(fabric_canvas)}>
        <img src={remove_png} alt="删除对象"/>
      </div>
    </div>;
  }
}
// <input title="字号" type="number" className="font-size" value={this.props.font_size}/>
//      
//   <input title="颜色" className="color object-color"/>
