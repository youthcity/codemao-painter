/**
 * Created by GreenDou on 16/4/11.
 * Canvas Events Functions
 */

(function () {
  "use strict;"
  if (!fabric) {
    return;
  }

  fabric.Canvas.prototype._bindEvents = function () {
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onGesture = this._onGesture.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this._onShake = this._onShake.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._onOrientationChange = this._onOrientationChange.bind(this);
    this._onMouseWheel = this._onMouseWheel.bind(this);
  };

  fabric.Canvas.prototype._onMouseOut = function (e) {
    if (this.isDrawingMode) {
      this.clearContext(this.contextCursor);
    }
  };

  fabric.Canvas.prototype._finalizeCurrentTransform = function () {
    const transform = this._currentTransform;
    const target = transform.target;
    // const oldTop = target.top;
    // const oldLeft = target.left;

    if (target._scaling) {
      target._scaling = false;
    }

    target.setCoords();

    // only fire :modified event if target coordinates were changed during mousedown-mouseup
    if (this.stateful && target.hasStateChanged()) {
      this.fire('object:modified', {
        target,
        newTop: target.top,
        newLeft: target.left,
        newAngle: target.angle,
        newScaleX: target.scaleX,
        newScaleY: target.scaleY,
        oldTop: transform.original.top,
        oldLeft: transform.original.left,
        oldAngle: transform.original.angle,
        oldScaleX: transform.original.scaleX,
        oldScaleY: transform.original.scaleY,
        action: transform.action,
      });
      target.fire('modified');
    }

    this._restoreOriginXY(target);
  };
})();