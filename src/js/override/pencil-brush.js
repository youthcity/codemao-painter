/**
 * Created by GreenDou on 16/4/14.
 * Pencil Brush Override
 */
(function() {
    "use strict";
    if(!fabric){
        return;
    }

    fabric.PencilBrush.prototype.initialize = function (canvas) {
        this.canvas = canvas;
        this._points = [ ];

        //cursor
        this.canvas.freeDrawingCursor = 'none';
        this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
    };

    fabric.PencilBrush.prototype._prepareForDrawing = function(pointer) {

        var p = new fabric.Point(pointer.x, pointer.y);

        this._reset();
        this._addPoint(p);

        this.canvas.contextTop.moveTo(p.x, p.y);
        this.cursorRenderer.prepareForRender();
    };

    fabric.PencilBrush.prototype.cursorRender = function (pointer) {
        this.canvas.clearContext(this.canvas.contextCursor);
        this.cursorRenderer.renderCircle(pointer.x, pointer.y);
    };

})();
