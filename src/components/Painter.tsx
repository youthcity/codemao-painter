import * as React from 'react';
import '../css/painter.css';

import '../js/color/colors.js';
import '../js/color/colorPicker.data.js';
import '../js/color/colorPicker.js';
import '../js/color/jsColor.js';

import { config } from '../config';
import { fabric_canvas } from '../fabric_canvas';
import { PaintingPanel } from './panels/PaintingPanel';
import { BackgroundPanel } from './panels/BackgroundPanel';
import { LayerPanel } from './panels/LayerPanel';
import { ObjectPanel } from './panels/ObjectPanel';
import { ControlButton } from './buttons/ControlButton';
import { painterStore } from '../painterStore';
import { PainterStates } from '../PainterStates';
import { colorButtonActions } from "../actions/ColorButtonActions";
import ComponentSpec = __React.ComponentSpec;

export interface PainterProps {
  compiler: string;
  framework: string;
}

// class Painter extends React.Component<PainterProps, { panel_type: number }>
const global: any = window;
let Painter = React.createClass <PainterProps, PainterStates>(({
  getInitialState() {
    return painterStore.states;
  },
  componentDidMount() {
    fabric_canvas.init(this.canvas_element, this.canvas_wrapper_element);
    painterStore.add_change_listener(this.onChange);
  },
  componentWillUnmount() {
    painterStore.remove_change_listener(this.onChange);
  },
  onChange() {
    this.setState(painterStore.states);
    console.log(this.state);
  },
  /**
   * Select tool panel
   * @param event
   */
  selectPanel(event: any) {
    this.setState({panel_type: event.target.value});
  },
  render() {
    //  todo: will use these buttons soon
    // let control_buttons = config.control_buttons.map((value) => {
    //   return <ControlButton key={ value.title } control_button={ value } />;
    // });
    let panel_element: JSX.Element;
    switch (this.state.panel_type) {
      //  todo: will use these panels soon
      // case 'background':
      //   panel_element = <BackgroundPanel className="painter-tools-background"/>;
      //   break;
      // case 'layer':
      //   panel_element = <LayerPanel className="painter-tools-layer"/>;
      //   break;
      default:
      case 'painting':
        panel_element = <PaintingPanel className="painter-tools-painting" current_color={this.state.current_color}/>;
    }
    return <div className="painter">
      <div className="painter-tools">
        <div className="painter-tools-tabs">
          <button value="painting" className="tab-button tabs-painting" onClick={this.selectPanel}>
            画图
            <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
              <polygon id="rect-tab-painting" stroke="none" fill="#F2524C" fill-rule="evenodd"
                       transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
                       points="57 48 65 55 49 55"/>
            </svg>
          </button>
        </div>
        <div className="painter-tools-container">
          {panel_element}
        </div>
        <div className="painter-tools-buttons">
          <div className="tools-costume">
            <input title="造型名称" className="painter-title" placeholder="请输入造型名称"/>
            <div className="costume-buttons">
              <div className="save-button">
                <img src="//o44j7l4g3.qnssl.com/program/painter/save.png" alt="保存"/>
              </div>
              <div className="cancel-button">
                <img src="//o44j7l4g3.qnssl.com/program/painter/cancel.png" alt="取消"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="paint-panel">
          <div className="painter-canvas-wrapper"
               ref={(canvas_wrapper) => this.canvas_wrapper_element = canvas_wrapper}>
            <canvas ref={(canvas) => this.canvas_element = canvas} className="painter-canvas"/>
            <div className="stage-size"></div>
          </div>
          <ObjectPanel/>
        </div>
        <div className="painter-control-wrapper">
          <div className="control-panel">
          </div>
        </div>
      </div>
    </div>;
    // return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
  }
} as ComponentSpec<PainterProps, PainterStates>));

//  todo: will use these buttons soon
// <button value="background" className="tab-button tabs-background" onClick={this.selectPanel}>
//             背景
//             <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1"
//                  xmlns="http://www.w3.org/2000/svg">
//               <polygon id="rect-tab-background" stroke="none" fill="#EEB000" fill-rule="evenodd"
//                        transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
//                        points="57 48 65 55 49 55"/>
//             </svg>
//           </button>
//           <button value="layer" className="tab-button tabs-layers" onClick={this.selectPanel}>
//             图层
//             <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1"
//                  xmlns="http://www.w3.org/2000/svg">
//               <polygon id="rect-tab-layers" stroke="none" fill="#44BFD2" fill-rule="evenodd"
//                        transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
//                        points="57 48 65 55 49 55"/>
//             </svg>
//           </button>

export { Painter };

global.Painter = Painter;
