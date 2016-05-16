((fabric) => {
  if (!fabric) {
    return;
  }
  function isBrushType(brush, type) {
    return brush.constructor === type.constructor;
  }

  fabric.Canvas.prototype.initialize = function (el, options) {
    options || (options = {});

    this._initStatic(el, options);
    this._initInteractive();
    this._createCacheCanvas();

    this.layerManager = new fabric.LayerManager(this);
  };

  fabric.Canvas.prototype._initInteractive = function () {
    this._currentTransform = null;
    this._groupSelector = null;
    this._initWrapperElement();
    this._createUpperCanvas();
    this._initEventListeners();

    //todo: fix it for iPad
    //this._initRetinaScaling();

    this._createCursorCanvas();

    this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this);

    this.calcOffset();
  };

  fabric.Canvas.prototype.renderAll = function () {
    var canvasToDrawOn = this.contextContainer, objsToRender;

    if (this.contextTop && this.selection && !this._groupSelector) {
      this.clearContext(this.contextTop);
    }

    this.clearContext(canvasToDrawOn);

    this.fire('before:render');

    if (this.clipTo) {
      fabric.util.clipContext(this, canvasToDrawOn);
    }
    this._renderBackground(canvasToDrawOn);

    canvasToDrawOn.save();
    objsToRender = this._chooseObjectsToRender();
    //apply viewport transform once for all rendering process
    canvasToDrawOn.transform.apply(canvasToDrawOn, this.viewportTransform);
    this._renderObjects(canvasToDrawOn, objsToRender);
    this.preserveObjectStacking || this._renderObjects(canvasToDrawOn, [this.getActiveGroup()]);
    canvasToDrawOn.restore();

    if (!this.controlsAboveOverlay && this.interactive) {
      this.drawControls(canvasToDrawOn);
    }
    if (this.clipTo) {
      canvasToDrawOn.restore();
    }
    this._renderOverlay(canvasToDrawOn);
    if (this.controlsAboveOverlay && this.interactive) {
      this.drawControls(canvasToDrawOn);
    }

    this.fire('after:render');
    return this;
  };

  fabric.Canvas.prototype.clear = function () {
    const objects = this._objects.slice();
    if (this.layerManager) {
      this.layerManager.clearLayers();
    }
    this._objects.length = 0;
    if (this.discardActiveGroup) {
      this.discardActiveGroup();
    }
    if (this.discardActiveObject) {
      this.discardActiveObject();
    }
    this.clearContext(this.contextContainer);
    if (this.contextTop) {
      this.clearContext(this.contextTop);
    }
    this.fire('canvas:cleared', { objects });
    this.renderAll();
    return this;
  };

  fabric.Canvas.prototype._createCursorCanvas = function () {
    this.cursorCanvasEl = this._createCanvasElement();
    //this.cursorCanvasEl.setAttribute('width', this.width);
    //this.cursorCanvasEl.setAttribute('height', this.height);

    this.wrapperEl.appendChild(this.cursorCanvasEl);

    this._copyCanvasStyle(this.lowerCanvasEl, this.cursorCanvasEl);
    this._applyCanvasStyle(this.cursorCanvasEl);
    this.cursorCanvasEl.style.pointerEvents = 'none';

    this.contextCursor = this.cursorCanvasEl.getContext('2d');
  };

  fabric.Canvas.prototype._onMouseMoveInDrawingMode = function (e) {
    var ivt = fabric.util.invertTransform(this.viewportTransform),
      pointer = fabric.util.transformPoint(this.getPointer(e, true), ivt);
    if (this._isCurrentlyDrawing) {
      this.freeDrawingBrush.onMouseMove(pointer);
    }
    if (this.freeDrawingBrush.cursorRenderer) {
      this.freeDrawingBrush.cursorRender(pointer);
    }

    this.setCursor(this.freeDrawingCursor);
    this.fire('mouse:move', { e: e });

    var target = this.findTarget(e);
    if (typeof target !== 'undefined') {
      target.fire('mousemove', { e: e, target: target });
    }
  };

  fabric.Canvas.prototype.setFreeDrawingBrush = function (brush, options) {
    var myself = this;
    this.clearContext(this.contextTop);
    switch (brush) {
      case 'round':
        if (this.freeDrawingBrush && isBrushType(this.freeDrawingBrush, fabric.RoundBrush)) {
          this.freeDrawingBrush.setOptions(options);
        } else {
          this.freeDrawingBrush = new fabric.RoundBrush(this, options);
        }
        break;
      case 'line':
        if (this.freeDrawingBrush && isBrushType(this.freeDrawingBrush, fabric.LineBrush)) {
          this.freeDrawingBrush.setOptions(options);
        } else {
          this.freeDrawingBrush = new fabric.LineBrush(this, options);
        }
        break;
      case 'rect':
        if (this.freeDrawingBrush && isBrushType(this.freeDrawingBrush, fabric.RectBrush)) {
          this.freeDrawingBrush.setOptions(options);
        } else {
          this.freeDrawingBrush = new fabric.RectBrush(this, options);
        }
        break;
      case 'eraser':
        if (this.freeDrawingBrush
          && this.freeDrawingBrush instanceof fabric.EraserBrush) {
          this.freeDrawingBrush.setOptions(options);
        } else {
          this.freeDrawingBrush = new fabric.EraserBrush(this, options);
        }
        break;
      case 'rotation':
        if (this.rotationPoint) {
          options.point = {
            x: this.rotationPoint.x,
            y: this.rotationPoint.y
          };
        }
        if (this.freeDrawingBrush
          && this.freeDrawingBrush instanceof fabric.PointBrush) {
          this.freeDrawingBrush.setOptions(options);
        } else {
          this.freeDrawingBrush = new fabric.PointBrush(this, function (point) {
            myself.rotationPoint = {
              x: point.x,
              y: point.y
            }
          }, options);
        }
        if (this.rotationPoint) {
          this.freeDrawingBrush.renderPoint();
        }
        break;
      case 'pencil':
      default :
        if (!(this.freeDrawingBrush
          && isBrushType(this.freeDrawingBrush, fabric.PencilBrush))) {
          this.freeDrawingBrush = new fabric.PencilBrush(myself);
        }
        for (var prop in options) {
          if (options.hasOwnProperty(prop)) {
            this.freeDrawingBrush[prop] = options[prop];
          }
        }
    }
  };

  fabric.Canvas.prototype.setDrawingMode = function (flag) {
    if (!this.freeDrawingBrush || this.isDrawingMode === flag) {
      return;
    }

    this.clearContext(this.contextTop);
    if (flag) {
      this.isDrawingMode = true;
      this.upperCanvasEl.addEventListener('mouseout', this._onMouseOut);
    } else {
      this.isDrawingMode = false;
      this.upperCanvasEl.removeEventListener('mouseout', this._onMouseOut);
    }
  };

  /**
   * @private
   * @param {Event} e Event object
   * @param {fabric.Object} target
   */
  fabric.Canvas.prototype._setupCurrentTransform = function (e, target) {
    if (!target) {
      return;
    }

    var pointer = this.getPointer(e),
      corner = target._findTargetCorner(this.getPointer(e, true)),
      action = this._getActionFromCorner(target, corner, e),
      origin = this._getOriginFromCorner(target, corner);

    this._currentTransform = {
      target: target,
      action: action,
      corner: corner,
      scaleX: target.scaleX,
      scaleY: target.scaleY,
      skewX: target.skewX,
      skewY: target.skewY,
      offsetX: pointer.x - target.left,
      offsetY: pointer.y - target.top,
      originX: origin.x,
      originY: origin.y,
      ex: pointer.x,
      ey: pointer.y,
      lastX: pointer.x,
      lastY: pointer.y,
      left: target.left,
      top: target.top,
      theta: fabric.util.radiansToDegrees(target.angle),
      width: target.width * target.scaleX,
      mouseXSign: 1,
      mouseYSign: 1,
      shiftKey: e.shiftKey,
      altKey: e.altKey
    };

    this._currentTransform.original = {
      angle: target.angle,
      left: target.left,
      top: target.top,
      scaleX: target.scaleX,
      scaleY: target.scaleY,
      skewX: target.skewX,
      skewY: target.skewY,
      originX: origin.x,
      originY: origin.y,
    };

    this._resetCurrentTransform();
  };


})(fabric);
