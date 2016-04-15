/**
 * Created by GreenDou on 16/4/11.
 * Canvas Events Functions
 */

(function () {
    "use strict;"
    if(!fabric){
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
        if(this.isDrawingMode) {
            this.clearContext(this.contextCursor);
        }
    };
})();