import React from 'react';
import cx from 'classnames';

require('./index.scss');

import PainterTools from '../painter-tools/';

const tool_panel = {
    DRAWING_TOOLS: 0,
    LAYER: 1
};

const Painter = React.createClass({
    getInitialState() {
        return {
            selectedPanel: tool_panel.DRAWING_TOOLS
        }
    },
    render() {
        let innerWrapper = null;
        if (this.state.selectedPanel === tool_panel.DRAWING_TOOLS) {
            innerWrapper = (
                <PainterTools/>
            )
        }
        return (
            <article className="painter">
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
                                'selected': this.state.selectedPanel === tool_panel.LAYER
                            })} onClick={this.toggleToolPanel.bind(this,tool_panel.LAYER)}>图层</div>
                        </div>
                        <div className="inner-wrapper">
                            {innerWrapper}
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="drawing-area">
                            <div className="drawing-board">
                                <div className="corner-top-left"></div>
                                <div className="corner-top-right"></div>
                                <div className="corner-bottom-left"></div>
                                <div className="corner-bottom-right"></div>
                            </div>
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
    toggleToolPanel(which) {
        if (which === tool_panel.DRAWING_TOOLS) {
            if (this.state.selectedPanel !== which) {
                this.setState({
                    selectedPanel: which
                })
            }
        } else if (which === tool_panel.LAYER) {
            if (this.state.selectedPanel !== which) {
                this.setState({
                    selectedPanel: which
                })
            }
        }
    }
});

export default Painter;