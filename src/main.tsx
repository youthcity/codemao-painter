import * as React from "react";
import * as ReactDOM from "react-dom";

import {Painter} from "./components/Painter";

ReactDOM.render(
  <Painter compiler="TypeScript" framework="React"/>,
  document.getElementById("painter")
);
