import * as React from "react";
import  '../../css/painter-tools-layer.css';

export class LayerPanel extends React.Component<{ className: string }, {}> {
  render() {
    return <div className="tools-layers">
      <div className="panel-slider-item">
        <label>
          <span className="slider-title">透明</span>
          <span>-</span>
          <input type="range" value="1" min="0" max="1" step="0.01"/>
          <span>+</span>
          <span className="slider-value">Span</span>
        </label>
      </div>
      <div className="layers-container">
        <div className="layers-item">
          <div className="layers-thumbnail">
            <img alt="缩略图" />
          </div>
          <div className="layers-item-right">
            <span className="layers-name">Span 2</span>
            <div className="layers-buttons">
              <div className="layers-visible">
              </div>
            </div>
            <div className="layers-delete">
              <svg width="18px" height="18px" viewBox="194 99 18 18" version="1.1"
                   xmlns="http://www.w3.org/2000/svg">
              <path
                d="M201.530628,106.530628 L198.194021,106.530628 C197.459043,106.530628 196.863961,107.127581 196.863961,107.863961 C196.863961,108.605475 197.459449,109.197294 198.194021,109.197294 L201.530628,109.197294 L201.530628,112.533902 C201.530628,113.268879 202.127581,113.863961 202.863961,113.863961 C203.605475,113.863961 204.197294,113.268473 204.197294,112.533902 L204.197294,109.197294 L207.533902,109.197294 C208.268879,109.197294 208.863961,108.600341 208.863961,107.863961 C208.863961,107.122447 208.268473,106.530628 207.533902,106.530628 L204.197294,106.530628 L204.197294,103.194021 C204.197294,102.459043 203.600341,101.863961 202.863961,101.863961 C202.122447,101.863961 201.530628,102.459449 201.530628,103.194021 L201.530628,106.530628 Z"
                id="layer-close-button" stroke="none" fill="#645542" fill-rule="evenodd"
                transform="translate(202.863961, 107.863961) rotate(-315.000000) translate(-202.863961, -107.863961) "/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="layers-tools-container">
        <div className="layers-tool">^</div>
        <div className="layers-tool">v</div>
        <div className="layers-tool">+</div>
      </div>
    </div>;
  }
}