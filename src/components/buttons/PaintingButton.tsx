import * as React from "react";
import '../../css/painting_button.css';

interface ButtonIcon {
  img:any;
  img_hover:any;
}

interface PaintingButtonConfig {
  title:string;
  type:string;
  active:boolean;
  onClick:any;
  icon:ButtonIcon;
}

export class PaintingButton extends React.Component<PaintingButtonConfig, {}> {
  active_style() {
    return this.props.active ? 'active' : '';
  }

  render() {
    return <div title={this.props.title} className={`painting-button tools-${this.props.type} ${this.active_style()}`}
                onClick={this.props.onClick}>
      <img className="button-img" src={this.props.icon.img}
           alt={this.props.title}/>
      <img className="button-img-on" src={this.props.icon.img_hover}
           alt={this.props.title}/>
    </div>;
  }
}
