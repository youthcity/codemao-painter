export default{
  data() {
    return {
      lineWidth: {
        pencil: 5,
        eraser: 15,
        line: 5,
        pointer: 10,
      },
      brushColor: {
        pencil: '#333333',
        eraser: '#fff',
        line: '#333',
        rect: '#333',
        round: '#333',
        pointer: '#333',
      },
      objectOpacity: {
        pencil: 1,
        eraser: 1,
        line: 1,
        rect: 1,
        round: 1,
      },
      currentBrush: 'pencil',
      isDrawingMode: true,
      currentColor: '#333333',
      currentColorObject: new Colors({
        color: this.currentColor,
        allMixDetails: true,
      }), //  Use colors.js
      pickerTextColor: '#ddd',
      currentStrokeWidth: 7,
      currentOpacity: 1,
      defaultColors: [
        '#D0021B', '#F5A623', '#8B572A', '#7ED321', '#417505',
        '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986',
        '#000', '#4A4A4A', '#9B9B9B', '#D3D3D3', '#FFF',
      ],
      shapeOffset: 0,
      lastShape: null,
    };
  },
  computed: {
    canvas() {
      return this.$root.canvas;
    },
    curObject() {
      let object = null;
      if (this.canvas) {
        object = this.canvas.getActiveObject();
      }
      return object;
    },
    curStrokeWidth: {
      get() {
        let width;
        if (this.currentBrush) {
          width = this.lineWidth[this.currentBrush];
        // } else if (this.curObject) {
        //   width = this.curObject.strokeWidth;
        } else {
          width = this.currentStrokeWidth;
        }
        return width;
      },
      set(newValue) {
        if (this.canvas) {
          if (this.currentBrush) {
            this.lineWidth[this.currentBrush] = newValue;
            this.canvas.freeDrawingBrush.width = newValue;
          // } else if (this.curObject) {
          //   this.curObject.strokeWidth = newValue;
          //   this.canvas.renderAll();
          }
          this.currentStrokeWidth = newValue;
        }
      },
    },
    curObjectOpacity: {
      get() {
        let opacity = this.currentOpacity;
        if (this.currentBrush) {
          opacity = this.objectOpacity[this.currentBrush];
        } else if (this.curObject) {
          opacity = this.curObject.opacity;
        }
        return opacity;
      },
      set(newValue) {
        if (this.canvas) {
          if (this.currentBrush) {
            this.objectOpacity[this.currentBrush] = newValue;
            this.canvas.freeDrawingBrush.opacity = newValue;
          } else if (this.curObject) {
            this.curObject.opacity = newValue;
            this.canvas.renderAll();
          }
        }
        this.currentOpacity = newValue;
      },
    },
    curColor: {
      get() {
        const colors = this.currentColorObject.colors;
        const RGB = colors.RND.rgb;
        const RGBInnerText = `${RGB.r}, ${RGB.g}, ${RGB.b}`;
        let color = `rgba(${RGBInnerText}, ${this.currentColorObject.colors.alpha})`;
        if (this.currentBrush) {
          color = this.brushColor[this.currentBrush];
        } else {
          color = this.currentColor;
        }
        return color;
      },
      set(newValue) {
        if (this.canvas) {
          if (this.currentBrush) {
            this.brushColor[this.currentBrush] = newValue;
            this.canvas.freeDrawingBrush.color = newValue;
          }
        }
        this.currentColor = newValue;
        this.currentColorObject.setColor(newValue);
        this.pickerTextColor = this.currentColorObject.colors.rgbaMixBGMixWhite.luminance
        > 0.22 ? '#222' : '#ddd';
      },
    },
  },
  methods: {
    selectBrush(brush) {
      if (brush) {
        this.canvas.deactivateAll();
        this.canvas.renderAll();
        this.canvas.setFreeDrawingBrush(brush, {
          width: this.lineWidth[brush],
          color: this.brushColor[brush],
          opacity: this.objectOpacity[brush],
        });
        this.canvas.setDrawingMode(true);
        this.isDrawingMode = true;
        this.lastShape = null;
      } else {
        this.canvas.setDrawingMode(false);
        this.isDrawingMode = false;
      }
      this.currentBrush = brush;
    },
    selectColor(color) {
      this.curColor = color;
    },
    addShape(shape) {
      this.selectBrush();
      if (shape === this.lastShape) {
        this.shapeOffset += 10;
      } else {
        this.shapeOffset = 0;
      }
      switch (shape) {
        case 'text':
          this.addText();
          break;
        case 'round':
          this.addCircle();
          break;
        case 'rect':
          this.addRect();
          break;
        case 'triangle':
          this.addTriangle();
          break;
        default:
      }
      this.lastShape = shape;
    },
    isCurrentTool(tool) {
      let isCurrent = !this.isDrawingMode;
      if (tool) {
        isCurrent = tool === this.currentBrush;
      }
      return isCurrent;
    },
    addRect() {

      const rect = new fabric.Rect({
        left: this.canvas.getWidth() / 2 - this.currentStrokeWidth * 5 + this.shapeOffset,
        top: this.canvas.getHeight() / 2 - this.currentStrokeWidth * 5 + this.shapeOffset,
        fill: this.currentColor,
        width: this.currentStrokeWidth * 10,
        height: this.currentStrokeWidth * 10,
      });
      this.canvas.add(rect);
      this.canvas.setActiveObject(rect);
      this.canvas.fire('path:created', { path: rect });
    },
    addCircle() {
      const circle = new fabric.Circle({
        left: this.canvas.getWidth() / 2 - this.currentStrokeWidth * 5 + this.shapeOffset,
        top: this.canvas.getHeight() / 2 - this.currentStrokeWidth * 5 + this.shapeOffset,
        fill: this.currentColor,
        radius: this.currentStrokeWidth * 10,
      });
      this.canvas.add(circle);
      this.canvas.setActiveObject(circle);
      this.canvas.fire('path:created', { path: circle });
    },
    addTriangle() {
      const triangle = new fabric.Triangle({
        left: this.canvas.getWidth() / 2 - this.currentStrokeWidth * 5 + this.shapeOffset,
        top: this.canvas.getHeight() / 2 - this.currentStrokeWidth * 5 + this.shapeOffset,
        fill: this.currentColor,
        width: this.currentStrokeWidth * 10,
        height: this.currentStrokeWidth * 10,
      });
      this.canvas.add(triangle);
      this.canvas.setActiveObject(triangle);
      this.canvas.fire('path:created', { path: triangle });
    },
    addText() {
      const text = '点我选中文字，在画布下方可以修改文字内容和样式哦~';
      const object = new fabric.Text(text, {
        left: this.canvas.getWidth() / 2 + this.shapeOffset,
        top: this.canvas.getHeight() / 2 + this.shapeOffset,
        fontFamily: 'Microsoft YaHei',
        angle: 0,
        fill: this.currentColor,
        scaleX: 1,
        scaleY: 1,
        fontWeight: '',
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: true,
        centerTransform: true,
      });
      this.canvas.add(object);
      this.canvas.setActiveObject(object);
      // fire event 'path' created
      this.canvas.fire('path:created', { path: object });
    },
  },
};
