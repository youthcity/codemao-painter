import * as React from "react";
import '../../css/ControlButton.css';

export interface ControlButtonConfig {
  title: string;
  action: string;
  className: string[];
}

export class ControlButton extends React.Component<{ control_button: ControlButtonConfig }, {}> {
  render() {
    let className = this.props.control_button.className.join(' ') + ' control-button';
    return <div className={className}></div>;
  }
}