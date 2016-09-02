import React from 'react';
import cx from 'classnames';
import _ from 'lodash/object';

require('./index.scss');

import PainterTools from '../painter-tools/';
import LayerManager from '../layer-manager';

const tool_panel = {
    DRAWING_TOOLS: 0,
    LAYER_MANAGER: 1
};

const Painter = React.createClass({
    getInitialState() {
        return {
            selectedPanel: tool_panel.DRAWING_TOOLS,
            layerList: [
                {
                    id: 1,
                    selected: true,
                    transparent: 10,
                    visible: true
                },
                {
                    id: 2,
                    selected: false,
                    transparent: 20,
                    visible: true
                },
                {
                    id: 3,
                    selected: false,
                    transparent: 30,
                    visible: true
                },
                {
                    id: 4,
                    selected: false,
                    transparent: 40,
                    visible: false
                },
                {
                    id: 5,
                    selected: false,
                    transparent: 50,
                    visible: false
                },
                {
                    id: 6,
                    selected: false,
                    transparent: 60,
                    visible: false
                },
                {
                    id: 7,
                    selected: false,
                    transparent: 70,
                    visible: true
                },
                {
                    id: 8,
                    selected: false,
                    transparent: 80,
                    visible: true
                },
                {
                    id: 9,
                    selected: false,
                    transparent: 90,
                    visible: true
                },
                {
                    id: 10,
                    selected: false,
                    transparent: 100,
                    visible: false
                }
            ],
            showColorPicker: true,
            palette: {
                curColor: 'hsl(330, 91%, 59%)',
                curColorObj: {
                    a: 1,
                    h: 330,
                    s: '91%',
                    l: '59%'
                }
            }
        }
    },
    render() {
        let innerWrapper = null;
        if (this.state.selectedPanel === tool_panel.DRAWING_TOOLS) {
            innerWrapper = (
                <PainterTools
                    palette={this.state.palette}
                    onCurColorChange={this.onCurColorChange}
                    openColorPicker={this.openColorPicker}
                    showColorPicker={this.state.showColorPicker}/>
            )
        } else if (this.state.selectedPanel === tool_panel.LAYER_MANAGER) {
            innerWrapper = (
                <LayerManager
                    toggleLayerVisibility={this.toggleLayerVisibility}
                    onLayerTransparentChange={this.onLayerTransparentChange}
                    selectedLayer={this._getSelectedLayer()}
                    selectLayer={this.selectLayer}
                    layerList={this.state.layerList}/>
            )
        }
        return (
            <article className="painter" onClick={this.closeColorPicker}>
                <header className="header">
                    <div className="import-stuff-btn">
                        <span className="icon"></span>
                        <span className="text">导入素材</span>
                    </div>
                    <div className="split-bar"></div>
                    <div className="drawing-name-input-wrapper">
                        <input type="text" className="input"/>
                    </div>
                    <div className="save-btn-wrapper">
                        <div className="save-btn">保存</div>
                    </div>
                    <div className="close-btn"></div>
                </header>
                <div className="wrapper">
                    <div className="tool-panel">
                        <div className="btns-wrapper">
                            <div className={cx('btn', {
                                'selected': this.state.selectedPanel === tool_panel.DRAWING_TOOLS
                            })} onClick={this.toggleToolPanel.bind(this,tool_panel.DRAWING_TOOLS)}>画图</div>
                            <div className={cx('btn', {
                                'selected': this.state.selectedPanel === tool_panel.LAYER_MANAGER
                            })} onClick={this.toggleToolPanel.bind(this,tool_panel.LAYER_MANAGER)}>图层</div>
                        </div>
                        <div className="inner-wrapper">
                            {innerWrapper}
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="drawing-area">
                            {/*<div className="drawing-board">*/}
                                {/*<div className="corner-top-left"></div>*/}
                                {/*<div className="corner-top-right"></div>*/}
                                {/*<div className="corner-bottom-left"></div>*/}
                                {/*<div className="corner-bottom-right"></div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="player-row">
                            <div className="player-btn"></div>
                        </div>
                        <div className="btn-wrapper">
                            <div className="btn undo-btn"></div>
                            <div className="btn scale-btn"></div>
                            <div className="btn clear-btn"></div>
                        </div>
                    </div>
                </div>
            </article>
        )
    },
    closeColorPicker() {
        this.setState({
            showColorPicker: false
        });
    },
    openColorPicker() {
        this.setState({
            showColorPicker: 1
        });
    },
    onCurColorChange(color) {
        let h = parseInt(color.hsl.h);
        let l = parseInt(color.hsl.l * 100);
        let s = parseInt(color.hsl.s * 100);
        let hsla = `hsla(${h},${s + '%'},${l + '%'},${color.hsl.a})`;
        this.setState({
            palette: _.assign(this.state.palette, {
                curColorObj: color.hsl,
                curColor: hsla
            })
        });
        console.log(color.hsl);
        console.log(hsla);
    },
    toggleToolPanel(which) {
        if (which === tool_panel.DRAWING_TOOLS) {
            if (this.state.selectedPanel !== which) {
                this.setState({
                    selectedPanel: which
                })
            }
        } else if (which === tool_panel.LAYER_MANAGER) {
            if (this.state.selectedPanel !== which) {
                this.setState({
                    selectedPanel: which
                })
            }
        }
    },
    selectLayer(which) {
        let list = _.assign([], this.state.layerList);
        list.forEach((item) => {
            if (item.id === which) {
                item.selected = true;
            } else {
                item.selected = false;
            }
        });
        this.setState({
            layerList: list
        });
    },
    toggleLayerVisibility(which) {
        let list = _.assign([], this.state.layerList);
        for (let i = 0, len = list.length; i < len; i++) {
            if (list[i].id === which) {
                if (list[i].visible) {
                    list[i].visible = false;
                } else {
                    list[i].visible = true;
                }
            }
        }
        this.setState({
            layerList: list
        });
    },
    _getSelectedLayer() {
        let cur = null;
        for (let i = 0, len = this.state.layerList.length; i < len; i++) {
            if (this.state.layerList[i].selected) {
                cur = this.state.layerList[i];
            }
        }
        return cur;
    },
    onLayerTransparentChange(val) {
        let list = _.assign([], this.state.layerList);
        list.forEach((item) => {
            if (item.selected) {
                item.transparent = val;
            }
        });
        this.setState({
            layerList: list
        });
    }
});

export default Painter;