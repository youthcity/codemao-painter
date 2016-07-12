import * as React from "react";
import  '../../css/painter-tools-painting.css';

import { config } from '../../config';
import { ColorButton } from '../buttons/ColorButton';
import { PaintingButton } from '../buttons/PaintingButton';
import { PaintingActions } from "../../actions/PaintingActions";
import { fabric_canvas } from "../../fabric_canvas";
import { Brush } from "../../def/Brush";
import { Shape } from "../../def/Shape";

import { ChromePicker } from 'react-color';

interface PaintingPanelProps {
  className: string;
  current_color: string;
  current_brush: Brush;
  current_width: number;
}

export let PaintingPanel = React.createClass<PaintingPanelProps, { display_color_picker: boolean }>({
  getInitialState() {
    return {
      display_color_picker: false
    };
  },

  select_brush(brush = Brush.pointer) {
    PaintingActions.set_brush(brush);
  },

  add_shape(shape: Shape) {
    this.select_brush();
    fabric_canvas.add_shape(shape, this.props.current_width, this.props.current_color);
  },

  set_brush_width() {
    PaintingActions.set_brush_width((this.refs['brush_width_input'] as any).value);
  },

  is_current_brush(brush: Brush) {
    return this.props.current_brush === brush;
  },

  set_brush_color(color: {hex: string}) {
    PaintingActions.set_brush_color(color.hex);
    fabric_canvas.set_selected_color(color.hex);
  },

  handle_click_color () {
    this.setState({
      display_color_picker: !this.state.display_color_picker
    })
  },

  render() {
    let default_colors = config.default_colors.map((value) => {
      return <ColorButton key={value} color={value} checked={ value === this.props.current_color }/>;
    });
    let color_style = {
      background: this.props.current_color
    };
    return <div className="tools-painting">
      <div className="tools-buttons-container">
        <PaintingButton title="画笔" type="pencil" active={this.is_current_brush(Brush.pencil)}
                        onClick={this.select_brush.bind(this, Brush.pencil)}/>
        <PaintingButton title="直线" type="line" active={this.is_current_brush(Brush.line)}
                        onClick={this.select_brush.bind(this, Brush.line)}/>
        <PaintingButton title="矩形" type="rect" active={false}
                        onClick={this.add_shape.bind(this, Shape.rect)}/>
        <PaintingButton title="圆形" type="round" active={false}
                        onClick={this.add_shape.bind(this, Shape.round)}/>
        <PaintingButton title="三角形" type="triangle" active={false}
                        onClick={this.add_shape.bind(this, Shape.triangle)}/>
      </div>
      <div className="tools-buttons-container">
        <PaintingButton title="橡皮" type="eraser" active={this.is_current_brush(Brush.eraser)}
                        onClick={this.select_brush.bind(this, Brush.eraser)}/>
        <PaintingButton title="选择" type="select" active={this.is_current_brush(Brush.pointer)}
                        onClick={this.select_brush.bind(this, Brush.pointer)}/>
        <PaintingButton title="旋转中心" type="rotation" active={this.is_current_brush(Brush.rotate_center)}
                        onClick={this.select_brush.bind(this, Brush.rotate_center)}/>
        <PaintingButton title="添加文字" type="text" active={false} onClick={this.add_shape.bind(this, Shape.text)}/>
      </div>
      <div className="tools-slider-container">
        <span className="tools-container-title">粗细</span>
        <span className="input-minus">-</span>
        <input title="粗细" type="range" value={this.props.current_width} min="1" max="100" step="1"
               ref="brush_width_input" onChange={this.set_brush_width}/>
        <span className="input-plus">+</span>
      </div>
      <div className="tools-item">
        <span className="item-title">颜色</span>
        <div title="点击选取颜色" className="color" style={color_style} onClick={this.handle_click_color}></div>
        { this.state.display_color_picker? <div>
          <div className="color-picker">
            <ChromePicker color={this.props.current_color} onChange={this.set_brush_color}/>
          </div>
          <div className="color-picker-cover" onClick={this.handle_click_color}></div>
        </div> : null }
      </div>
      <div className="tools-area">
        {default_colors}
      </div>
    </div>;
  }
});
