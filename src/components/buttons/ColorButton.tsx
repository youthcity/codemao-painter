import * as React from "react";
import '../../css/ControlButton.css';

interface ColorButtonConfig {
  color: string;
  checked: boolean;
  onClick: () => void;
}

export class ColorButton extends React.Component<ColorButtonConfig, {}> {
  render() {
    let style = {
      backgroundColor: this.props.color
    };
    return <div className="tools-default-color" style={ style }></div>;
  }
}