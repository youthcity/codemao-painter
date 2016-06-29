import * as React from "react";
import '../../css/ControlButton.css';
import {colorButtonActions} from '../../actions/ColorButtonActions';
import {fabric_canvas} from "../../fabric_canvas";

interface ColorButtonConfig {
  color: string;
  checked: boolean;
  // onClick: (event:any) => void;
}

export class ColorButton extends React.Component<ColorButtonConfig, {}> {
  on_click_color() {
    fabric_canvas.select_color(this.props.color);
    colorButtonActions.select_color(this.props.color);
  }
  render() {
    let style = {
      backgroundColor: this.props.color
    };
    return <div className="tools-default-color" style={ style } onClick={this.on_click_color.bind(this)}></div>;
  }
}