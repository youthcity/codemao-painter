class LineBrush extends fabric.PencilBrush {
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
    this.canvas.freeDrawingCursor = 'none';
    this.cursorRenderer = new fabric.CursorRenderer(this.canvas.cursorCanvasEl, this);

    this.setOptions(options);
  }

  /**
   * Inovoked on mouse move
   * @param {Object} pointer
   */
  onMouseMove(pointer) {
    this._captureDrawingPath(pointer);
    // redraw curve
    // clear top canvas
    this.canvas.clearContext(this.canvas.contextTop);
    this._render();
  }

  _addPoint(point) {
    if (this._points.length < 1) {
      this._points.push(point);
    } else {
      this._points[1] = point;
    }
  }

  /**
   * On mouseup after drawing the path on contextTop canvas
   * we use the points captured to create an new fabric path object
   * and add it to the fabric canvas.
   */
  _finalizeAndAddPath() {
    const ctx = this.canvas.contextTop;

    var pathData = this.convertPointsToSVGPath(this._points).join('');
    if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
      // do not create 0 width/height paths, as they are
      // rendered inconsistently across browsers
      // Firefox 4, for example, renders a dot,
      // whereas Chrome 10 renders nothing
      this.canvas.renderAll();
      return;
    }

    var path = this.createPath(pathData);
    
    

    this.canvas.add(path);
    path.setCoords();

    this.canvas.clearContext(this.canvas.contextTop);
    this._resetShadow();
    this.canvas.renderAll();

    // fire event 'path' created
    this.canvas.fire('path:created', { path: path });
  }
}

Object.assign(fabric, {
  LineBrush,
});
