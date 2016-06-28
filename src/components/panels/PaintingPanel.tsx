import * as React from "react";
import  '../../css/painter-tools-painting.css';

import { config } from '../../config';
import { ColorButton } from '../buttons/ColorButton';

interface PaintingPanelProps {
  className: string;
  current_color: string;
}

export class PaintingPanel extends React.Component<PaintingPanelProps, {}> {
  render() {
    let default_colors = config.default_colors.map((value) => {
      return <ColorButton key={value} color={value} checked={ value === this.props.current_color }
                          onClick={this.select_color}/>;
    });
    return <div className="tools-painting">
      <div className="tools-buttons-container">
        <div title="画笔" className="tools-button tools-pencil">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/pencil.png" alt="笔"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/pencil-on.png" alt="笔"/>
        </div>
        <div title="直线" className="tools-button tools-line">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/line.png" alt="线"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/line-on.png" alt="线"/>
        </div>
        <div title="矩形" className="tools-button tools-rect">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/rect.png" alt="方"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/rect-on.png" alt="方"/>
        </div>
        <div title="圆形" className="tools-button tools-round">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/round.png" alt="圆"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/round-on.png" alt="圆"/>
        </div>
        <div title="三角" className="tools-button tools-triangle">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/triangle-off.png" alt="角"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/triangle-on.png" alt="圆"/>
        </div>
      </div>
      <div className="tools-buttons-container">
        <div title="橡皮" className="tools-button tools-eraser">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/eraser.png" alt="橡"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/eraser-on.png" alt="橡"/>
        </div>
        <div title="选择" className="tools-button tools-select">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/select.png" alt="选"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/select-on.png" alt="选"/>
        </div>
        <div title="文字" className="tools-button tools-text">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/text.png" alt="字"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/text-on.png" alt="字"/>
        </div>
        <div title="旋转中心" className="tools-button tools-select">
          <img className="button-img" src="//o44j7l4g3.qnssl.com/program/painter/rotation.png" alt="中"/>
          <img className="button-img-on" src="//o44j7l4g3.qnssl.com/program/painter/rotation-on.png" alt="中"/>
        </div>
      </div>
      <div className="tools-slider-container">
        <span className="tools-container-title">粗细</span>
        <span className="input-minus">-</span>
        <input title="粗细" type="range" value="7" min="1" max="100" step="1"/>
        <span className="input-plus">+</span>
      </div>
      <div className="tools-item">
        <span className="item-title">颜色</span>
        <input title="颜色" type="color" className="color"/>
      </div>
      <div className="tools-area">
        <div className="tools-default-color">
        </div>
        {default_colors}
      </div>
    </div>;
  }
}