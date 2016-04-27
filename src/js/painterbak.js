(() => {
  export default {

    init(w, h) {
      const $painterContent = $('.painter-content');
      const $painterCanvas = $('#painter-canvas');
      const $painterContainer = $('#painter-container');
      const canvas = new fabric.Canvas('painter-canvas');
      const myself = this;
      let width = w;
      let height = h;
      let curColor = '';

      this.$btnPencil = $('.btn-pencil');
      this.$btnPointer = $('.btn-pointer');

      //  todo: use relative width&height!
      if (!width) {
        width = $painterContent.width() - $('.painter-left-buttons').width()
          - $('.painter-right-buttons').width() - 46;
        height = $painterContent.height() - $('.painter-properties').height() - 26;
      }
      this.width = width;
      this.height = height;
      $painterCanvas.attr('height', height);
      $painterCanvas.attr('width', width);
      this.canvas = canvas;
      canvas.enableRetinaScaling = false;

      $painterContainer.css('visibility', 'visible');
      $painterContainer.hide();

      //  init vue

      this.vm = new Vue({
        el: '#painter-container',
        data: {
          width: 10,
          content: '添加文字后在这里修改',
          type: 'object',
          color: '',
        },
        watch: {
          'content'(value) {
            const object = canvas.getActiveObject();
            if (!object) return;

            object.set('text', value).setCoords();
            canvas.renderAll();
          },
          'width'(v) {
            const object = canvas.getActiveObject();
            let styleName = 'strokeWidth';
            let value = v;
            value = parseInt(value, 10);
            if (canvas.freeDrawingBrush) {
              canvas.freeDrawingBrush.width = value || 15;
            }
            if (!object) return;

            if (this.type === 'text') {
              styleName = 'fontSize';
            }
            if (object.setSelectionStyles && object.isEditing) {
              const style = {};
              style[styleName] = value;
              object.setSelectionStyles(style);
              object.setCoords();
            } else {
              object[styleName] = value;
            }

            object.setCoords();
            canvas.renderAll();
          },
          'color'() {
            curColor = this.color;

            canvas.freeDrawingBrush.color = curColor;

            const activeObject = canvas.getActiveObject();
            const activeGroup = canvas.getActiveGroup();

            if (activeGroup) {
              const objectsInGroup = activeGroup.getObjects();
              canvas.discardActiveGroup();
              objectsInGroup.forEach((object) => {
                if (object.stroke) {
                  object.setStroke(curColor);
                } else {
                  object.setColor(curColor);
                }
              });
            } else if (activeObject) {
              if (activeObject.stroke) {
                activeObject.setStroke(curColor);
              } else {
                activeObject.setColor(curColor);
              }
            }
            canvas.renderAll();
          },
        },
      });

      function updateScope() {
        const object = canvas.getActiveObject();
        if (!object) return;

        myself.vm.content = object.text || '';
        if (myself.vm.content !== '') {
          myself.vm.type = 'text';
          myself.vm.width = object.fontSize;
        } else {
          myself.vm.type = 'path';
          if (canvas.freeDrawingBrush) {
            myself.vm.width = object.strokeWidth;
          }
        }
      }

      canvas.on('object:selected', updateScope);

      //  init colors
      function initColors() {
        //  let total = 255 * 255 * 255;
        const colors = ['e3135c', 'cd0024', 'f1521e', 'fce932', 'f5a72e', '8b5430', 'bd0add',
          '9016e8', '4b90e0', '437715', '85d036', 'bae98a', '000000', 'ffffff'];
        //  for (let i = 0; i < total - 100; i += total / 40) {
        //    i = parseInt(i);
        //    let color = i.toString(16);
        //    while (color.length < 6) {
        //        color = '0' + color;
        //    }
        //    $('.painter-colors-wrap').append(template('template-colors', {color: '#' + color}));
        //  }
        for (let i = 0; i < colors.length; ++i) {
          $('.painter-colors-wrap').append(template('template-colors', { color: `#${colors[i]}` }));
        }
      }

      initColors();

      $('.painter-btn').on('click', function () {
        if (!$(this).hasClass('active')) {
          $(this).parent().find('.painter-btn').removeClass('active');
          $(this).addClass('active');
          if ($(this).hasClass('painter-colors')) {
            canvas.freeDrawingBrush.color = $(this).attr('data-value');
            curColor = $(this).attr('data-value');
            myself.vm.color = curColor;

            const activeObject = canvas.getActiveObject();
            const activeGroup = canvas.getActiveGroup();

            if (activeGroup) {
              const objectsInGroup = activeGroup.getObjects();
              canvas.discardActiveGroup();
              objectsInGroup.forEach((object) => {
                if (object.stroke) {
                  object.setStroke(curColor);
                } else {
                  activeObject.setColor(curColor);
                }
              });
            } else if (activeObject) {
              if (activeObject.stroke) {
                activeObject.setStroke(curColor);
              } else {
                activeObject.setColor(curColor);
              }
            }
            canvas.renderAll();
          }
        }
      });
      function addLine() {
        canvas.add(new fabric.Line([50, 100, 200, 200], {
          left: Math.random() * myself.width,
          top: Math.random() * myself.height,
          stroke: curColor,
          strokeWidth: myself.vm.width,
        }));
      }

      function addRect(rectWidth, rectHeight, x, y) {
        const rect = new fabric.Rect({
          top: y,
          left: x,
          width: rectWidth,
          height: rectHeight,
          fill: canvas.freeDrawingBrush.color,
        });
        canvas.add(rect);
      }

      function addCircle(radius, x, y) {
        canvas.add(new fabric.Circle({
          left: x,
          top: y,
          fill: canvas.freeDrawingBrush.color,
          radius: 50,
          //  opacity: 0.8
        }));
      }

      function addTriangle(triWidth, triHeight, x, y) {
        canvas.add(new fabric.Triangle({
          left: x,
          top: y,
          fill: canvas.freeDrawingBrush.color,
          width: triWidth,
          height: triHeight,
        }));
      }

      function addImage(path, x, y) {
        fabric.Image.fromURL(path, (image) => {
          image.set({
            left: x || 0,
            top: y || 0,
            angle: 0,
          }).scale(1).setCoords();
          this.canvas.add(image);
          this.canvas.renderAll();
        });
      }

      this.addImage = addImage;

      function addText(x, y) {
        const text = '点我选中文字，在画布下方可以修改文字内容和样式哦~';

        const textSample = new fabric.Text(text, {
          left: x || canvas.getWidth() / 2,
          top: y || canvas.getHeight() / 2,
          fontFamily: 'Microsoft YaHei',
          angle: 0,
          fill: canvas.freeDrawingBrush.color,
          scaleX: 1,
          scaleY: 1,
          fontWeight: '',
          originX: 'left',
          hasRotatingPoint: true,
          centerTransform: true,
        });

        this.canvas.add(textSample);
      }

      function removeSelected() {
        const activeObject = canvas.getActiveObject();
        const activeGroup = canvas.getActiveGroup();

        if (activeGroup) {
          const objectsInGroup = activeGroup.getObjects();
          canvas.discardActiveGroup();
          objectsInGroup.forEach((object) => {
            canvas.remove(object);
          });
        } else if (activeObject) {
          canvas.remove(activeObject);
        }
      }

      function cancelSelected() {
        canvas.deactivateAll();
        canvas.renderAll();
        // canvas.discardActiveObject();
      }

      function initEvents() {
        const $btnPencil = myself.$btnPencil;
        const $btnEraser = $('.btn-eraser');
        const $btnRotation = $('.btn-rotation');
        $('.painter-colors:first-child').click();
        $btnPencil.on('click', () => {
          cancelSelected();
          canvas.setFreeDrawingBrush('pencil', {
            width: 15,
            color: curColor,
          });
          canvas.setDrawingMode(true);
          myself.vm.width = 15;
          // canvas.freeDrawingBrush.width=10;
          // canvas.freeDrawingBrush.color=curColor;
        });
        $btnEraser.on('click', () => {
          cancelSelected();
          canvas.setFreeDrawingBrush('eraser', {
            width: 15,
            color: curColor,
          });
          canvas.setDrawingMode(true);
          myself.vm.width = 15;
        });
        $btnRotation.on('click', () => {
          cancelSelected();
          canvas.setDrawingMode(true);
          canvas.setFreeDrawingBrush('rotation', {});
        });
        $('.btn-circle').on('click', () => {
          myself.$btnPointer.click();
          addCircle(100, 100, 100);
        });
        $('.btn-rect').on('click', () => {
          myself.$btnPointer.click();
          addRect(100, 100, 100, 100);
        });
        $('.btn-line').on('click', () => {
          myself.$btnPointer.click();
          addLine();
        });
        $('.btn-triangle').on('click', () => {
          myself.$btnPointer.click();
          addTriangle(100, 100, 100, 100);
        });
        $('.btn-text').on('click', () => {
          myself.$btnPointer.click();
          addText(0, 0);
        });

        $btnPencil.click();
        $('.painter-btn-remove').on('click', removeSelected);
        myself.$btnPointer.on('click', () => {
          canvas.setDrawingMode(false);
        });
        $('.painter-btn-close').on('click', () => {
          canvas.setDrawingMode(false);
          $('#painter-container').hide();
        });
        $('.painter-btn-check').on('click', () => {
          const param = {};
          //  todo: Deal with the End
          //  canvas.contextContainer.imageSmoothingEnabled = false;
          canvas.setDrawingMode(false);
          //  result = toBase64();
          canvas.layerManager.combineAllLayers();
          const activeObj = this.canvas.getActiveObject();
          const activeGroup = canvas.getActiveGroup();
          if (activeGroup) {
            const objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach((obj) => {
              Object.assign(obj, { active: false });
            });
          }
          if (activeObj) {
            activeObj.active = false;
          }
          canvas.renderAll();
          canvas.setZoom(1);
          //  options.anchorOffsetX = result.rc.x;
          //  options.anchorOffsetY = result.rc.y;

          const data = document.createElement('canvas');
          data.width = canvas.lowerCanvasEl.width;
          data.height = canvas.lowerCanvasEl.height;
          data.getContext('2d').drawImage(canvas.lowerCanvasEl, 0, 0);
          param.img = data;
          param.src = data.toDataURL();
          param.rc = canvas.rotationPoint;
          param.name = $('.painter-name').val();

          if (canvas.callback) {
            canvas.callback(param);
          }

          $('#painter-container').hide();
        });
      }

      initEvents();

      // function toBase64() {
      //   let result;
      //
      //   canvas.layerManager.combineAllLayers();
      //   let activeObj = Painter.canvas.getActiveObject();
      //   let activeGroup = canvas.getActiveGroup();
      //   if (activeGroup) {
      //     let objectsInGroup = activeGroup.getObjects();
      //     canvas.discardActiveGroup();
      //     objectsInGroup.forEach(function (object) {
      //       object.active = false;
      //     });
      //   }
      //   if (activeObj) {
      //     activeObj.active = false;
      //   }
      //   Painter.canvas.renderAll();
      //   Painter.canvas.setZoom(1);
      //   let data = canvas.toDataURL('png');
      //   let img = document.createElement('img');
      //   img.setAttribute('width', width);
      //   img.setAttribute('height', height);
      //   img.setAttribute('src', data);
      //   let c = document.createElement('canvas');
      //   c.setAttribute('width', width);
      //   c.setAttribute('height', height);
      //   let ctx = c.getContext('2d');
      //   ctx.drawImage(img, 0, 0, width, height);
      //   canvas.setZoom(1);
      //
      //   result = trimCanvasWithPosition(c, canvas.rotationPoint);
      //   return result;
      // }
    },

    /**
     * Open image in the canvas
     * @param img
     * @param name
     * @param options
     */
    openIn(img, name, options) {
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;
      let width = 0;
      let height = 0;
      if (options) {
        width = options.width;
        height = options.height;
        this.canvas.rotationPoint = {
          x: (width > this.canvas.width) ? x : options.rotationCenter.x
          + (this.canvas.width - width) / 2,
          y: (height > this.canvas.height) ? y : options.rotationCenter.y
          + (this.canvas.height - height) / 2,
        };
        this.canvas.callback = options.callback;
      }
      this.canvas.clear();

      $('.painter-name').val(name);

      this.canvas.setHeight(this.height);
      this.canvas.setWidth(this.width);
      this.canvas.renderAll();
      this.addImage(img, (this.canvas.width - width) / 2, (this.canvas.height - height) / 2);

      this.$btnPencil.click();
      $('#painter-container').show();
    },

    destroy() {
      $('#painter-container').hide();
    },
  };
})();
