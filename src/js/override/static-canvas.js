(() => {
  if (!fabric) {
    return;
  }

  fabric.StaticCanvas.prototype._setBackstoreDimension =
    function _setBackstoreDimension(prop, value) {
      this.lowerCanvasEl[prop] = value;

      if (this.upperCanvasEl) {
        this.upperCanvasEl[prop] = value;
      }
      if (this.cursorCanvasEl) {
        this.cursorCanvasEl[prop] = value;
      }
      if (this.cacheCanvasEl) {
        this.cacheCanvasEl[prop] = value;
      }

      this[prop] = value;

      return this;
    };

  fabric.StaticCanvas.prototype._setCssDimension = function _setCssDimension(prop, value) {
    this.lowerCanvasEl.style[prop] = value;

    if (this.upperCanvasEl) {
      this.upperCanvasEl.style[prop] = value;
    }

    if (this.cursorCanvasEl) {
      this.cursorCanvasEl.style[prop] = value;
    }

    if (this.wrapperEl) {
      this.wrapperEl.style[prop] = value;
    }

    return this;
  };
})();
