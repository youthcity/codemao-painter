import React from 'react';
import cx from 'classnames';

require('./index.scss');

const LayerManager = React.createClass({
    componentDidMount() {
        Ps.initialize(this.refs.layerList);
    },
    render() {
        return (
            <section className="layer-manager">
                <div className="row">
                    <p className="text-row">
                        <span className="transparent-text">透明度</span>
                        <span className="percentage">{`${this.props.selectedLayer.transparent}%`}</span>
                    </p>
                    <div className="range-wrapper">
                        <input type="range" min={0} max={100}
                               onChange={this.onLayerTransparentChange}
                               value={this.props.selectedLayer.transparent}/>
                    </div>
                </div>
                <ul className="layer-list" ref="layerList">
                    {
                        this.props.layerList.map((item) => {
                            return (
                                <li className={cx('layer-item', {
                                    selected: item.selected
                                })} key={item.id} onClick={this.selectLayer.bind(this, item.id)}>
                                    <div className="left">
                                        <div className="preview"></div>
                                    </div>
                                    <div className="right">
                                        <div className="name-row">
                                            <input type="text" className="name-input"/>
                                        </div>
                                        <div className="tool-row"></div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        )
    },
    selectLayer(which) {
        this.props.selectLayer(which);
    },
    onLayerTransparentChange(ev) {
        this.props.onLayerTransparentChange(ev.target.value)
    }
});

export default LayerManager;