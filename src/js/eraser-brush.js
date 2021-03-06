/**
 * Created by GreenDou on 16/4/9.
 * Eraser Brush
 */

import './trim-canvas.js';

(() => {
  /**
   * EraserBrush class
   * @class fabric.EraserBrush
   * @extends fabric.BaseBrush
   */
  fabric.EraserBrush = fabric.util.createClass(
    fabric.BaseBrush, /** @lends fabric.PencilBrush.prototype */ {

      /**
       * Constructor
       * @param {fabric.Canvas} canvas
       * @param options
       * @return {fabric.PencilBrush} Instance of a pencil brush
       */
      initialize: function (canvas, options) {
        this.canvas = canvas;
        this.backupCanvasEl = this.canvas._createCanvasElement();
        this.backupContext = this.backupCanvasEl.getContext('2d');
        this.canvas._copyCanvasStyle(this.canvas.upperCanvasEl, this.backupCanvasEl);
        this.canvas._applyCanvasStyle(this.backupCanvasEl);
        this.backupContext.imageSmoothingEnabled = false;
        this.canvas.freeDrawingCursor = 'none';
        this._points = [];
        this.strokeStyle = 'rgb(255,255,255)';
        this.width = 10;
        //  init options

        //  Dynamic events
        //  this.onMouseOut = this.onMouseOut.bind(this);
        //  this.events = {
        //    mouseout: this.canvas._onMouseOut
        //  };

        for (let prop in options) {
          if (options.hasOwnProperty(prop)) {
            this[prop] = options[prop];
          }
        }

        this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
      },

      /**
       * Inovoked on mouse down
       * @param {Object} pointer
       */
      onMouseDown: function (pointer) {
        this._prepareForDrawing(pointer);
        // capture coordinates immediately
        // this allows to draw dots (when movement never occurs)
        this._captureDrawingPath(pointer);
        this._render();
      },

      /**
       * Inovoked on mouse move
       * @param {Object} pointer
       */
      onMouseMove: function (pointer) {
        this._captureDrawingPath(pointer);
        // redraw curve
        // clear top canvas
        this.canvas.clearContext(this.canvas.contextTop);
        this._render();
      },

      /**
       * Invoked on mouse up
       */
      onMouseUp: function () {
        this._finalizeAndAddPath();
      },

      onMouseOut: function (options) {
        this.canvas.clearContext(this.canvas.contextCursor);
      },

      /**
       * @private
       * @param {Object} pointer Actual mouse position related to the canvas.
       */
      _prepareForDrawing: function (pointer) {

        let p = new fabric.Point(pointer.x, pointer.y);

        this._reset();
        this._addPoint(p);

        this.canvas.clearContext(this.backupCanvasEl.getContext('2d'));
        this.backupContext.drawImage(this.canvas.lowerCanvasEl, 0, 0, this.backupCanvasEl.width, this.backupCanvasEl.height);
        this.canvas.clearContext(this.canvas.contextContainer);
        this.canvas.contextTop.moveTo(p.x, p.y);

        this.cursorRenderer.prepareForRender();
      },

      /**
       * @private
       * @param {fabric.Point} point Point to be added to points array
       */
      _addPoint: function (point) {
        this._points.push(point);
      },

      /**
       * Clear points array and set contextTop canvas style.
       * @private
       */
      _reset: function () {
        this._points.length = 0;

        this._setBrushStyles();
        this._setShadow();
      },

      _setBrushStyles: function () {
        let ctx = this.canvas.contextTop;
        ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.lineCap = this.strokeLineCap;
        ctx.lineJoin = this.strokeLineJoin;
        // ctx.globalAlpha = 1;
        if (this.strokeDashArray && fabric.StaticCanvas.supports("setLineDash")) {
          ctx.setLineDash(this.strokeDashArray);
        }
      },

      /**
       * @private
       * @param {Object} pointer Actual mouse position related to the canvas.
       */
      _captureDrawingPath: function (pointer) {
        let pointerPoint = new fabric.Point(pointer.x, pointer.y);
        this._addPoint(pointerPoint);
      },

      /**
       * Draw a smooth path on the topCanvas using quadraticCurveTo
       * @private
       */
      _render: function () {
        let ctx = this.canvas.contextTop,
          v = this.canvas.viewportTransform,
          p1 = this._points[0],
          p2 = this._points[1];

        ctx.save();
        ctx.drawImage(this.backupCanvasEl, 0, 0);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        ctx.beginPath();

        //if we only have 2 points in the path and they are the same
        //it means that the user only clicked the canvas without moving the mouse
        //then we should be drawing a dot. A path isn't drawn between two identical dots
        //that's why we set them apart a bit
        if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
          p1.x -= 0.5;
          p2.x += 0.5;
        }
        ctx.moveTo(p1.x, p1.y);

        for (let i = 1, len = this._points.length; i < len; i++) {
          // we pick the point between pi + 1 & pi + 2 as the
          // end point and p1 as our control point.
          let midPoint = p1.midPointFrom(p2);
          ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);

          p1 = this._points[i];
          p2 = this._points[i + 1];
        }
        // Draw last line as a straight line while
        // we wait for the next point to be able to calculate
        // the bezier control point
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.restore();
      },

      /**
       * Converts points to SVG path
       * @param {Array} points Array of points
       * @param {Number} minX
       * @param {Number} minY
       * @return {String} SVG path
       */
      convertPointsToSVGPath: function (points) {
        let path = [],
          p1 = new fabric.Point(points[0].x, points[0].y),
          p2 = new fabric.Point(points[1].x, points[1].y);

        path.push('M ', points[0].x, ' ', points[0].y, ' ');
        for (let i = 1, len = points.length; i < len; i++) {
          let midPoint = p1.midPointFrom(p2);
          // p1 is our bezier control point
          // midpoint is our endpoint
          // start point is p(i-1) value.
          path.push('Q ', p1.x, ' ', p1.y, ' ', midPoint.x, ' ', midPoint.y, ' ');
          p1 = new fabric.Point(points[i].x, points[i].y);
          if ((i + 1) < points.length) {
            p2 = new fabric.Point(points[i + 1].x, points[i + 1].y);
          }
        }
        path.push('L ', p1.x, ' ', p1.y, ' ');
        return path;
      },

      /**
       * Creates fabric.Path object to add on canvas
       * @param {String} pathData Path data
       * @return {fabric.Path} Path to add on canvas
       */
      createPath: function (pathData) {
        let path = new fabric.Path(pathData, {
          fill: null,
          stroke: this.color,
          strokeWidth: this.width,
          strokeLineCap: this.strokeLineCap,
          strokeLineJoin: this.strokeLineJoin,
          strokeDashArray: this.strokeDashArray,
          originX: 'center',
          originY: 'center'
        });

        if (this.shadow) {
          this.shadow.affectStroke = true;
          path.setShadow(this.shadow);
        }

        return path;
      },

      /**
       * On mouseup after drawing the path on contextTop canvas
       * we use the points captured to create an new fabric path object
       * and add it to the fabric canvas.
       */
      _finalizeAndAddPath: function () {
        let ctx = this.canvas.contextTop,
          data, trimData, layerObject,
          myself = this,
          currentLayer = this.canvas.layerManager.currentLayer;
        ctx.closePath();
        trimData = trimCanvasWithPosition(this.canvas.upperCanvasEl);
        data = trimData.canvas.toDataURL('png');

        fabric.Image.fromURL(data, (image) => {
          image.set({
              left: trimData.left,
              top: trimData.top,
              angle: 0
            })
            .scale(1)
            .setCoords();
          // this.canvas.setHeight(this.height);
          // this.canvas.setWidth(this.width);
          // this.canvas.renderAll();
          this.canvas.add(image);
          myself.canvas.contextTop.imageSmoothingEnabled = false;
          myself.canvas.clearContext(myself.canvas.contextTop);
          currentLayer.objects.splice(0, currentLayer.objects.length, image);
          myself.canvas.renderAll();
          myself.canvas.contextTop.imageSmoothingEnabled = true;
        });

      },

      cursorRender: function (pointer) {
        this.canvas.clearContext(this.canvas.contextCursor);
        this.cursorRenderer.renderCircle(pointer.x, pointer.y);
      }
    });
})();
