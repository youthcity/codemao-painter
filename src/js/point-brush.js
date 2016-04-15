/**
 * Created by GreenDou on 16/4/12.
 * Point Brush
 */

(function () {

    /**
     * PointBrush class
     * @class fabric.PointBrush
     * @extends fabric.BaseBrush
     */
    fabric.PointBrush = fabric.util.createClass(fabric.BaseBrush,
        /** @lends fabric.PointBrush.prototype */
        {

            /**
             * Constructor
             * @param {fabric.Canvas} canvas
             * @param {function} callback
             * @param options
             * @return {fabric.PencilBrush} Instance of a pencil brush
             */
            initialize: function (canvas, callback, options) {
                this.canvas = canvas;
                this.callback = callback;
                this.canvas.freeDrawingCursor = 'none';
                this.width = 1;

                for (var prop in options) {
                    if (options.hasOwnProperty(prop)) {
                        this[prop] = options[prop];
                    }
                }
                this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
                this.cursorRenderer.width = this.width;
            },

            /**
             * Inovoked on mouse down
             * @param {Object} pointer
             */
            onMouseDown: function (pointer) {
                this._prepareForDrawing(pointer);
                this.point = pointer;
                // capture coordinates immediately
                // this allows to draw dots (when movement never occurs)
                //this._captureDrawingPath(pointer);
                this._render(pointer);
            },

            /**
             * Inovoked on mouse move
             * @param {Object} pointer
             */
            onMouseMove: function (pointer) {
                //this._captureDrawingPath(pointer);
                // redraw curve
                // clear top canvas
                this.canvas.clearContext(this.canvas.contextTop);
                this.point = pointer;
                this._render(pointer);
            },

            /**
             * Invoked on mouse up
             */
            onMouseUp: function () {
                this._finalizeAndCallback();
            },

            /**
             * @private
             * @param {Object} pointer Actual mouse position related to the canvas.
             */
            _prepareForDrawing: function (pointer) {

                this._reset();
                this.canvas.clearContext(this.canvas.contextTop);
                this.cursorRenderer.prepareForRender();
            },

            /**
             * Clear points array and set contextTop canvas style.
             * @private
             */
            _reset: function () {
                this._setBrushStyles();
                this._setShadow();
            },

            _setBrushStyles: function () {
                "use strict";
                var ctx = this.canvas.contextTop;
                ctx.lineWidth = this.width;
                ctx.lineCap = this.strokeLineCap;
                ctx.lineJoin = this.strokeLineJoin;
                if (this.strokeDashArray && fabric.StaticCanvas.supports("setLineDash")) {
                    ctx.setLineDash(this.strokeDashArray);
                }
            },

            /**
             * Draw a smooth path on the topCanvas using quadraticCurveTo
             * @private
             */
            _render: function (pointer) {
                var ctx = this.canvas.contextTop,
                    v = this.canvas.viewportTransform,
                    x = pointer.x,
                    y = pointer.y;
                ctx.lineWidth = 1;
                ctx.save();
                ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.strokeStyle = 'rgba(0,0,0,0.5)';
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, this.canvas.height);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(this.canvas.width, y);
                ctx.stroke();
            },

            /**
             * On mouseup after drawing the path on contextTop canvas
             * we use the points captured to create an new fabric path object
             * and add it to the fabric canvas.
             */
            _finalizeAndCallback: function () {
                "use strict";
                if (this.callback) {
                    this.callback(this.point);
                }
            },

            cursorRender: function (pointer) {
                this.canvas.clearContext(this.canvas.contextCursor);
                this.cursorRenderer.renderPoint(pointer.x, pointer.y);
                //this.canvas.contextTop.drawImage(this.canvas.cursorCanvasEl,0,0);
            },

            renderPoint: function () {
                "use strict";
                this._render(this.point);
            }


        });
})();
