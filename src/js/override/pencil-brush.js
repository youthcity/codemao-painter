(() => {
  if (!fabric) {
    return;
  }

  fabric.PencilBrush.prototype.initialize = function initialize(canvas) {
    this.canvas = canvas;
    this._points = [];

    //  cursor
    this.canvas.freeDrawingCursor = 'none';
    this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);
  };

  fabric.PencilBrush.prototype._prepareForDrawing = function _prepareForDrawing(pointer) {
    const p = new fabric.Point(pointer.x, pointer.y);

    this._reset();
    this._addPoint(p);

    this.canvas.contextTop.moveTo(p.x, p.y);

    if (this.cursorRenderer) {
      this.cursorRenderer.prepareForRender();
    }
  };

  fabric.PencilBrush.prototype.cursorRender = function cursorRender(pointer) {
    this.canvas.clearContext(this.canvas.contextCursor);
    this.cursorRenderer.renderCircle(pointer.x, pointer.y);
  };

  /**
   * Creates fabric.Path object to add on canvas
   * @param {String} pathData Path data
   * @return {fabric.Path} Path to add on canvas
   */
  fabric.PencilBrush.prototype.createPath = function createPath(pathData) {
    const path = new fabric.Path(pathData, {
      fill: null,
      stroke: this.color,
      strokeWidth: this.width,
      strokeLineCap: this.strokeLineCap,
      strokeLineJoin: this.strokeLineJoin,
      strokeDashArray: this.strokeDashArray,
      originX: 'center',
      originY: 'center',
      // opacity: this.opacity,
    });

    if (this.shadow) {
      this.shadow.affectStroke = true;
      path.setShadow(this.shadow);
    }

    return path;
  };
})();
