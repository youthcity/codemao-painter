(() => {
  if (!fabric) {
    return;
  }
  fabric.BaseBrush.prototype.opacity = 1;

  fabric.BaseBrush.prototype.setOptions = function setOptions(options) {
    // for (var prop in options) {
    //   if (options.hasOwnProperty(prop)) {
    //     this[prop] = options[prop];
    //   }
    // }
    Object.assign(this, options);
  };
  fabric.BaseBrush.prototype._setBrushStyles = function _setBrushStyles() {
    const ctx = this.canvas.contextTop;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.lineCap = this.strokeLineCap;
    ctx.lineJoin = this.strokeLineJoin;
    // ctx.globalAlpha = this.opacity;
    if (this.strokeDashArray && fabric.StaticCanvas.supports('setLineDash')) {
      ctx.setLineDash(this.strokeDashArray);
    }
  };
})();
