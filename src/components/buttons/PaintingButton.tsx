import * as React from "react";
import '../../css/painting_button.css';

interface PaintingButtonConfig {
  title:string;
  type:string;
  active:boolean;
  onClick:any;
}

export class PaintingButton extends React.Component<PaintingButtonConfig, {}> {
  active_style() {
    return this.props.active ? 'active' : '';
  }

  render() {
    return <div title={this.props.title} className={`painting-button tools-${this.props.type} ${this.active_style()}`}
                onClick={this.props.onClick}>
      <img className="button-img" src={`//o44j7l4g3.qnssl.com/program/painter/${this.props.type}.png`}
           alt={this.props.title}/>
      <img className="button-img-on" src={`//o44j7l4g3.qnssl.com/program/painter/${this.props.type}-on.png`}
           alt={this.props.title}/>
    </div>;
  }
}