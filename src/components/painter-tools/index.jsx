import React from 'react';

require('./index.scss');

const PainterTools = React.createClass({
    render() {
        return (
            <section className="painter-tools">
                <div className="row">
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                    <div className="tool-btn"></div>
                </div>
                <div className="row">
                    <div className="pencil">
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