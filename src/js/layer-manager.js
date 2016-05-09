((fabric) => {
  if (!fabric) {
    return;
  }

  class LayerManager {
    constructor(parentCanvas) {
      this.layerList = [];
      this.currentLayer = null;
      this.parentCanvas = parentCanvas;

      if (parentCanvas) {
        this.currentLayer = new fabric.Layer(parentCanvas.lowerCanvasEl);
        this.currentLayer.objects = parentCanvas._objects;
        this.addLayer(this.currentLayer);
      }
    }

    /**
     * Add a new layer into fabric-canvas and layer-manager
     * @param lyr layer to add (if have one)
     */
    addLayer(lyr) {
      const upperCanvasEl = this.parentCanvas.upperCanvasEl;
      let layer = lyr;
      if (!layer) {
        const canvasEl = this.parentCanvas._createCanvasElement();
        layer = new fabric.Layer(canvasEl);
      } else if (!layer.canvasEl) {
        layer.canvasEl = new this.parentCanvas._createCanvasElement();
      }
      this.layerList.push(layer);
      layer.parent = this;
      this.parentCanvas.wrapperEl.insertBefore(layer.canvasEl, upperCanvasEl);

      this.parentCanvas._copyCanvasStyle(upperCanvasEl, layer.canvasEl);
      this.parentCanvas._applyCanvasStyle(layer.canvasEl);

      this.selectLayer(this.layerList.length - 1);
    }

    /**
     * Remove a layer
     * @param index :layer's index
     */
    removeLayer(index) {
      if (index < this.layerList.length && this.layerList.length > 1) {
        if (this.layerList[index] === this.currentLayer) {
          if (index === 0) {
            this.selectLayer(1);
          } else {
            this.selectLayer(index - 1);
          }
        }
        this.parentCanvas.wrapperEl.removeChild(this.layerList[index].canvasEl);
        this.layerList.splice(index, 1);
      }
    }

    /**
     * Up a layer's order in layer manager
     * @param index
     */
    upLayer(index) {
      if (index !== this.layerList.length - 1) {
        this.moveLayer(index + 1, index);
      }
    }

    /**
     * Move a layer to dest position in layer manager
     * @param dest
     * @param src
     */
    moveLayer(dest, src) {
      if (dest === src) {
        return;
      }
      if (dest === this.layerList.length - 1) {
        this.parentCanvas.wrapperEl.insertBefore(this.layerList[src].canvasEl,
          this.parentCanvas.upperCanvasEl);
      } else {
        this.parentCanvas.wrapperEl.insertBefore(this.layerList[src].canvasEl,
          this.layerList[dest].canvasEl);
      }
      if (dest > src) {
        this.layerList.splice(dest + 1, 0, this.layerList[src]);
        this.layerList.splice(src, 1);
      } else {
        this.layerList.splice(dest, 0, this.layerList[src]);
        this.layerList.splice(src + 1, 1);
      }
    }

    /**
     * Down a layer in layer manager
     * @param index
     */
    downLayer(index) {
      if (index !== 0) {
        this.moveLayer(index - 1, index);
      }
    }

    /**
     * Show a layer
     * @param index
     */
    showLayer(index) {
      if (index < this.layerList.length) {
        this.layerList[index].canvasEl.style.display = null;
        for (let i = 0; i < this.layerList[index].objects.length; ++i) {
          this.layerList[index].objects[i].visible = true;
        }
        this.layerList[index].visible = true;
        this.parentCanvas.renderAll();
      }
    }

    /**
     * Hide a layer
     * @param index
     */
    hideLayer(index) {
      if (index < this.layerList.length) {
        this.layerList[index].canvasEl.style.display = 'none';
        for (let i = 0; i < this.layerList[index].objects.length; ++i) {
          this.layerList[index].objects[i].visible = false;
        }
        this.layerList[index].visible = false;
        this.parentCanvas.renderAll();
        //  todo: will cause error in trim-canvas for width is 0
      }
    }

    /**
     * Toggle a layer's visibility
     * @param index
     */
    toggleLayerVisible(index) {
      if (this.layerList[index].visible) {
        this.hideLayer(index);
      } else {
        this.showLayer(index);
      }
    }

    /**
     * Select Layer
     * @param index
     */
    selectLayer(index) {
      if (index < this.layerList.length) {
        this.parentCanvas.deactivateAllWithDispatch();
        this.parentCanvas.renderAll();
        this.currentLayer = this.layerList[index];
        this.parentCanvas.lowerCanvasEl = this.currentLayer.canvasEl;
        this.parentCanvas.contextContainer = this.currentLayer.canvasEl.getContext('2d');
        this.parentCanvas._objects = this.currentLayer.objects;
        this.setBackgroundColor();
        this.setBackgroundImageURL();
      }
    }

    /**
     * Get the position of the layer in layer manager
     * @param layer
     * @returns {number|Number}
     */
    getIndex(layer) {
      return this.layerList.indexOf(layer);
    }

    /**
     *  Reset layers
     */
    clearLayers() {
      this.selectLayer(0);
      this.showLayer(0);
      while (this.layerList.length > 1) {
        this.removeLayer(1);
      }
    }

    /**
     * Make everything into one layer and kill others
     */
    combineAllLayers() {
      this.selectLayer(0);
      while (this.layerList.length > 1) {
        this.currentLayer.objects = this.currentLayer.objects.concat(this.layerList[1].objects);
        this.parentCanvas._objects = this.currentLayer.objects;
        this.removeLayer(1);
      }
    }

    /**
     * Combine layers
     * @param layers:Array<Number> index of layers
     */
    combineLayers(layers) {
      this.selectLayer(layers[0]);
      while (layers.length > 1) {
        if (layers[1] < this.layerList.length) {
          this.currentLayer.objects =
            this.currentLayer.objects.concat(this.layerList[layers[1]].objects);
          this.parentCanvas._objects = this.currentLayer.objects;
          this.removeLayer(layers[1]);
        }
      }
    }

    setBackgroundColor(color) {
      if (color) {
        this.currentLayer.backgroundColor = color;
      }
      this.parentCanvas.setBackgroundColor(this.currentLayer.backgroundColor,
        this.parentCanvas.renderAll.bind(this.parentCanvas));
    }

    setBackgroundImageURL(url) {
      if (url !== undefined) {
        this.currentLayer.backgroundImageURL = url;
      }
      if (this.currentLayer.backgroundImageURL) {
        this.parentCanvas.setBackgroundImage(this.currentLayer.backgroundImageURL,
          this.parentCanvas.renderAll.bind(this.parentCanvas),
          {
            left: this.parentCanvas.width / 2,
            top: this.parentCanvas.height / 2,
            originX: 'center',
            originY: 'center',
            crossOrigin: 'anonymous',
          }
        );
      } else {
        this.parentCanvas.backgroundImage = null;
        this.parentCanvas.renderAll();
      }
    }
  }
  Object.assign(fabric, {
    LayerManager,
  });
})(fabric);
