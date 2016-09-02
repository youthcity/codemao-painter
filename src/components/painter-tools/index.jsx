import React from 'react';
import cx from 'classnames';
import { SketchPicker as ColorPicker } from 'react-color';

require('./index.scss');

const PainterTools = React.createClass({
    render() {
        return (
            <section className="painter-tools">
                <div className="row">
                    <div className="tool-btn arrow" onClick={this.props.on_arrow_icon_click}>
                        <div className="icon"></div>
                    </div>
                    <div className="tool-btn pencil" onClick={this.props.on_pencil_icon_click}>
                        <div className="icon"></div>
                    </div>
                    <div className="tool-btn eraser" onClick={this.props.on_eraser_icon_click}>
                        <div className="icon"></div>
                    </div>
                    <div className="tool-btn paint-bucket"><div className="icon"></div></div>
                    <div className="tool-btn scissors"><div className="icon"></div></div>
                    <div className="tool-btn circle" onClick={this.props.on_circle_icon_click}>
                        <div className="icon"></div>
                    </div>
                    <div className="tool-btn rectangle" onClick={this.props.on_rectangle_icon_click}>
                        <div className="icon"></div>
                    </div>
                    <div className="tool-btn triangle" onClick={this.props.on_triangle_icon_click}>
                        <div className="icon"></div>
                    </div>
                    <div className="tool-btn straight-line" onClick={this.props.on_straight_line_icon_click}>
                        <div className="icon"></div>
                    </div>
                    <div className="tool-btn central-point"><div className="icon"></div></div>
                    <div className="tool-btn text"><div className="icon"></div></div>
                    <div className="tool-btn text-bubble"><div className="icon"></div></div>
                </div>
                <div className="row">
                    <div className="pencil-row">
                        <div className="cube cur-color"
                             style={{backgroundColor: this.props.palette.curColor}}
                             onClick={this.openColorPicker}>
                            <div className={cx('color-picker-wrapper', {
                                'open': this.props.showColorPicker
                            })} onClick={function (ev) {
                                ev.stopPropagation();
                            }}>
                                <ColorPicker
                                    color={this.props.palette.curColorObj}
                                    onChange={this.onColorChange}/>
                            </div>
                        </div>
                        <div className={cx('cube-x', "x1", {
                            'selected': this.props.pencil.width === 1
                        })}
                             onClick={this.change_pencil_width.bind(this, 1)}>
                            <div className="circle"></div>
                        </div>
                        <div className={cx('cube-x', "x2", {
                            'selected': this.props.pencil.width === 3
                        })}  onClick={this.change_pencil_width.bind(this, 3)}>
                            <div className="circle"></div>
                        </div>
                        <div className={cx('cube-x', "x3", {
                            'selected': this.props.pencil.width === 5
                        })}  onClick={this.change_pencil_width.bind(this, 5)}>
                            <div className="circle"></div>
                        </div>
                        <div className={cx('cube-x', "x4", {
                            'selected': this.props.pencil.width === 10
                        })}   onClick={this.change_pencil_width.bind(this, 10)}>
                            <div className="circle"></div>
                        </div>
                        <div className={cx('cube-x', "x5", {
                            'selected': this.props.pencil.width === 25
                        })}   onClick={this.change_pencil_width.bind(this, 25)}>
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="palette1">
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="palette2">
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                        <div className="cube"></div>
                    </div>
                </div>
            </section>
        )
    },
    onColorChange(color) {
        this.props.onCurColorChange(color);
    },
    openColorPicker(ev) {
        ev.stopPropagation();
        this.props.openColorPicker()
    },
    change_pencil_width(width) {
        this.props.change_pencil_width(width);
    }
});

export default PainterTools;