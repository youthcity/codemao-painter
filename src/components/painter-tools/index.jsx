import React from 'react';

require('./index.scss');

const PainterTools = React.createClass({
    render() {
        return (
            <section className="painter-tools">
                <div className="row">
                    <div className="tool-btn arrow"><div className="icon"></div></div>
                    <div className="tool-btn pencil"><div className="icon"></div></div>
                    <div className="tool-btn eraser"><div className="icon"></div></div>
                    <div className="tool-btn paint-bucket"><div className="icon"></div></div>
                    <div className="tool-btn scissors"><div className="icon"></div></div>
                    <div className="tool-btn circle"><div className="icon"></div></div>
                    <div className="tool-btn rectangle"><div className="icon"></div></div>
                    <div className="tool-btn triangle"><div className="icon"></div></div>
                    <div className="tool-btn straight-line"><div className="icon"></div></div>
                    <div className="tool-btn central-point"><div className="icon"></div></div>
                    <div className="tool-btn text"><div className="icon"></div></div>
                    <div className="tool-btn text-bubble"><div className="icon"></div></div>
                </div>
                <div className="row">
                    <div className="pencil-row">
                        <div className="cube cur-color"></div>
                        <div className="cube-x x1">
                            <div className="circle"></div>
                        </div>
                        <div className="cube-x x2">
                            <div className="circle"></div>
                        </div>
                        <div className="cube-x x3">
                            <div className="circle"></div>
                        </div>
                        <div className="cube-x x4">
                            <div className="circle"></div>
                        </div>
                        <div className="cube-x x5">
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
    }
});

export default PainterTools;