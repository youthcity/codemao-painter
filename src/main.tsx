import * as React from "react";
import * as ReactDOM from "react-dom";

import {Painter} from "./components/Painter";
import {fabric_canvas} from "./fabric_canvas";

export function init() {
  ReactDOM.render(
    <Painter compiler="TypeScript" framework="React"/>,
    document.getElementById("painter")
  );
}

export let codemao_fabric = {
  Painter: Painter,
  fabric_canvas: fabric_canvas,
  init: init
};

const global = (window as any);

global.codemao_fabric = codemao_fabric;
