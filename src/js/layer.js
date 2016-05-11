((fabric) => {
  if (!fabric) {
    return;
  }

  class Layer {
    constructor(canvasEl, name) {
      this.canvasEl = canvasEl;
      this.context = canvasEl.getContext('2d');
      this.name = name || `新建图层${Layer.count++}`;
      this.parent = null;
      this.objects = [];
      //  Use show&hideLayer to set this value,otherwise it won't work
      this.visible = true;
      // this.opacity = 1;
      this.backgroundColor = null;
      this.backgroundImageURL = null;
      // this.thumbnail = null;
      this.undoStack = [];
      this.redoStack = [];
    }

    static resetCount() {
      Layer.count = 1;
    }

    set opacity(newValue) {
      this.context.globalAlpha = newValue;
      this.parent.parentCanvas.contextTop.globalAlpha = newValue;
      this.parent.parentCanvas.renderAll();
    }

    get opacity() {
      return this.context.globalAlpha;
    }

    get thumbnail() {
      return this.canvasEl.toDataURL();
    }
  }
  Layer.count = 1; // Static prop
  Object.assign(fabric, {
    Layer,
  });
  // fabric.Layer = Layer;
})(fabric);
