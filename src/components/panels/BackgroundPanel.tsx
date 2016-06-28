import * as React from "react";
import  '../../css/painter-tools-background.css';

export class BackgroundPanel extends React.Component<{ className: string }, {}> {
  render() {
    return <div className="tools-panel">
      <div className="background-container">
        <div className="background-item">
        </div>
      </div>
      <label className="custom-color">自定义
        <input className="color" />
      </label>
      <div className="clear-button" >清除背景</div>
    </div>;
  }
}