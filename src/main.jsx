import React from "react";
import ReactDOM from "react-dom";

// import {fabric_canvas} from "./fabric_canvas";
require('./main.scss');
import Painter from './components/painter/index.jsx';

function init() {
  ReactDOM.render(
    <Painter/>,
    document.getElementById("painter")
  );
}

init();

// const global = window;
//
// global.codemao_fabric = codemao_fabric;
//
// let codemao_fabric = {
//   Painter: Painter,
//   fabric_canvas: fabric_canvas,
//   init: init
// };
//
// codemao_fabric.init();
//
// export default codemao_fabric;
