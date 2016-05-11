class RoundBrush extends fabric.RectBrush {
  _render() {
    const ctx = this.canvas.contextTop;
    const v = this.canvas.viewportTransform;
    const p1 = this._points[0];
    const p2 = this._points[1];
    ctx.save();
    ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
    ctx.beginPath();
    ctx.arc(
      (p2.x + p1.x) / 2,
      (p2.y + p1.y) / 2,
      Math.min(Math.max(p2.x - p1.x, p1.x - p2.x), Math.max(p2.y - p1.y, p1.y - p2.y)) / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.restore();
  }

  /**
   * On mouseup after drawing the path on contextTop canvas
   * we use the points captured to create an new fabric path object
   * and add it to the fabric canvas.
   */
  _finalizeAndAddPath() {
    const p1 = this._points[0];
    const p2 = this._points[1];
    const round = new fabric.Circle({
      top: (p2.y + p1.y) / 2,
      left: (p2.x + p1.x) / 2,
      originX: 'center',
      originY: 'center',
      fill: this.color,
      radius: Math.min(
        Math.max(p1.x - p2.x, p2.x - p1.x),
        Math.max(p1.y - p2.y, p2.y - p1.y)
      ) / 2,
    });
    this.canvas.add(round);

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderAll();

    // fire event 'path' created
    this.canvas.fire('path:created', { path: round });
  }
}

Object.assign(fabric, {
  RoundBrush,
});
