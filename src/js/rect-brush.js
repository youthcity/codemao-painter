class RectBrush extends fabric.LineBrush {
  /**
   * Constructor
   * @param {fabric.Canvas} canvas
   * @param options
   * @return {fabric.PencilBrush} Instance of a pencil brush
   */
  initialize(canvas, options) {
    this.canvas = canvas;
    this._points = [];

    //  cursor
    this.canvas.freeDrawingCursor = 'crosshair';

    this.setOptions(options);
  }

  /**
   * Set brush style
   * @private
   */
  _setBrushStyles() {
    const ctx = this.canvas.contextTop;
    ctx.fillStyle = this.color;
  }

  _render() {
    const ctx = this.canvas.contextTop;
    const v = this.canvas.viewportTransform;
    let p1 = this._points[0];
    let p2 = this._points[1];

    ctx.save();
    ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
    ctx.fillRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    ctx.restore();
  }

  /**
   * On mouseup after drawing the path on contextTop canvas
   * we use the points captured to create an new fabric path object
   * and add it to the fabric canvas.
   */
  _finalizeAndAddPath() {
    const point1 = this._points[0];
    const point2 = this._points[1];
    const rect = new fabric.Rect({
      top: Math.min(point1.y, point2.y),
      left: Math.min(point1.x, point2.x),
      width: point2.x - point1.x,
      height: point2.y - point1.y,
      fill: this.color,
    });
    this.canvas.add(rect);

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderAll();

    // fire event 'path' created
    this.canvas.fire('path:created', { path: rect });
  }
}

Object.assign(fabric, {
  RectBrush,
});