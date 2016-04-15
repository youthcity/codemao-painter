!function () {
    'use strict';
    window.Painter = {

        init: function (width, height) {
            var $painterContent = $('.painter-content'),
                $painterCanvas = $('#painter-canvas'),
                $painterContainer = $('#painter-container'),
                myself = this;

            this.$painterContent = $painterContent;
            this.$btnPencil = $('.btn-pencil');
            this.$btnPointer = $('.btn-pointer');

            if (!width) {
                width = $painterContent.width() - $('.painter-left-buttons').width() - $('.painter-right-buttons').width() - 46;
                height = $painterContent.height() - $('.painter-properties').height() - 46;
            }
            this.width = width;
            this.height = height;
            $painterCanvas.attr('height', height);
            $painterCanvas.attr('width', width);
            var canvas = new fabric.Canvas('painter-canvas');
            Painter.canvas = canvas;

            $painterContainer.css('visibility', 'visible');
            $painterContainer.hide();

            //init vue

            this.vm = new Vue({
                el: '#painter-container',
                data: {
                    width: 10,
                    content: '添加文字后在这里修改',
                    type: 'object',
                    color: ''
                },
                watch: {
                    'content': function (value) {
                        var object = canvas.getActiveObject();
                        if (!object) return;

                        object.set('text', value).setCoords();
                        canvas.renderAll();
                    },
                    'width': function (value) {
                        var styleName = 'strokeWidth';
                        value = parseInt(value, 10);
                        if (canvas.freeDrawingBrush) {
                            canvas.freeDrawingBrush.width = value || 15;
                        }
                        var object = canvas.getActiveObject();
                        if (!object) return;

                        if(this.type === 'text') {
                            styleName = 'fontSize';
                        }
                        if (object.setSelectionStyles && object.isEditing) {
                            var style = { };
                            style[styleName] = value;
                            object.setSelectionStyles(style);
                            object.setCoords();
                        }
                        else {
                            object[styleName] = value;
                        }

                        object.setCoords();
                        canvas.renderAll();
                    },
                    'color': function () {
                        cur_color = this.color;

                        canvas.freeDrawingBrush.color = cur_color;

                        var activeObject = canvas.getActiveObject(),
                            activeGroup = canvas.getActiveGroup();

                        if (activeGroup) {
                            var objectsInGroup = activeGroup.getObjects();
                            canvas.discardActiveGroup();
                            objectsInGroup.forEach(function (activeObject) {
                                if (activeObject.stroke) {
                                    activeObject.setStroke(cur_color);
                                } else {
                                    activeObject.setColor(cur_color);
                                }
                            });
                        }
                        else if (activeObject) {
                            if (activeObject.stroke) {
                                activeObject.setStroke(cur_color);
                            } else {
                                activeObject.setColor(cur_color);
                            }
                        }
                        canvas.renderAll();
                    }
                }
                //methods: {
                //    setContent: function (event) {
                //        this.content = event.target._value;
                //    }
                //}
            });

            canvas.on('object:selected', updateScope);

            function updateScope() {
                var object = canvas.getActiveObject();
                if (!object) return;

                myself.vm.content = object['text'] || '';
                if(myself.vm.content !== '') {
                    myself.vm.type = 'text';
                    myself.vm.width = object['fontSize'];
                }else{
                    myself.vm.type = 'path';
                    if (canvas.freeDrawingBrush) {
                        myself.vm.width = object['strokeWidth'];
                    }
                }
            }


            function getActiveProp(name) {
                var object = canvas.getActiveObject();
                if (!object) return '';

                return object[name] || '';
            }

            ////init colors
            function initColors() {
                //var total = 255 * 255 * 255;
                var colors =  ['e3135c', 'cd0024', 'f1521e', 'fce932','f5a72e', '8b5430', 'bd0add',
                    '9016e8', '4b90e0', '437715', '85d036', 'bae98a', '000000', 'ffffff']
                //for (var i = 0; i < total - 100; i += total / 40) {
                //    i = parseInt(i);
                //    var color = i.toString(16);
                //    while (color.length < 6) {
                //        color = '0' + color;
                //    }
                //    $('.painter-colors-wrap').append(template('template-colors', {color: '#' + color}));
                //}
                for (var i = 0; i < colors.length; ++i){
                    $('.painter-colors-wrap').append(template('template-colors', {color: '#' + colors[i]}));
                }

            }

            var cur_color = '';
            initColors();

            $('.painter-btn').on('click', function () {
                if (!$(this).hasClass('active')) {
                    $(this).parent().find('.painter-btn').removeClass('active');
                    $(this).addClass('active');
                    if ($(this).hasClass('painter-colors')) {
                        canvas.freeDrawingBrush.color = $(this).attr('data-value');
                        cur_color = $(this).attr('data-value');
                        myself.vm.color = cur_color;

                        var activeObject = canvas.getActiveObject(),
                            activeGroup = canvas.getActiveGroup();

                        if (activeGroup) {
                            var objectsInGroup = activeGroup.getObjects();
                            canvas.discardActiveGroup();
                            objectsInGroup.forEach(function (activeObject) {
                                if (activeObject.stroke) {
                                    activeObject.setStroke(cur_color);
                                } else {
                                    activeObject.setColor(cur_color);
                                }
                            });
                        }
                        else if (activeObject) {
                            if (activeObject.stroke) {
                                activeObject.setStroke(cur_color);
                            } else {
                                activeObject.setColor(cur_color);
                            }
                        }
                        canvas.renderAll();
                    }
                }
            });
            function addLine() {
                canvas.add(new fabric.Line([ 50, 100, 200, 200], {
                    left: Math.random() * myself.width,
                    top: Math.random() * myself.height,
                    stroke: cur_color,
                    strokeWidth: myself.vm.width
                }));
            }
            function addRect(width, height, x, y) {
                var rect = new fabric.Rect({
                    top: y,
                    left: x,
                    width: width,
                    height: height,
                    fill: canvas.freeDrawingBrush.color
                });
                canvas.add(rect);
            }

            function addCircle(radius, x, y) {
                canvas.add(new fabric.Circle({
                    left: x,
                    top: y,
                    fill: canvas.freeDrawingBrush.color,
                    radius: 50
                    //opacity: 0.8
                }));
            }

            function addTriangle(width, height, x, y) {
                canvas.add(new fabric.Triangle({
                    left: x,
                    top: y,
                    fill: canvas.freeDrawingBrush.color,
                    width: width,
                    height: height
                }));
            }

            function addImage(path, x, y, scale) {
                fabric.Image.fromURL(path, function (image) {
                    image.set({
                        left: x || 0,
                        top: y || 0,
                        angle: 0
                    })
                        .scale(1)
                        .setCoords();
                    Painter.canvas.add(image);
                    Painter.canvas.renderAll();
                });
            }

            Painter.addImage = addImage;

            function addText(x, y) {
                "use strict";
                var text = '点我选中文字，在画布下方可以修改文字内容和样式哦~';

                var textSample = new fabric.Text(text, {
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
                    centerTransform: true
                });

                Painter.canvas.add(textSample);
            }

            function removeSelected() {
                var activeObject = canvas.getActiveObject(),
                    activeGroup = canvas.getActiveGroup();

                if (activeGroup) {
                    var objectsInGroup = activeGroup.getObjects();
                    canvas.discardActiveGroup();
                    objectsInGroup.forEach(function (object) {
                        canvas.remove(object);
                    });
                }
                else if (activeObject) {
                    canvas.remove(activeObject);
                }
            }

            function cancelSelected() {
                    canvas.deactivateAll();
                    canvas.renderAll();
                    //canvas.discardActiveObject();
            }

            function initEvents() {
                var $btnPencil = myself.$btnPencil,
                    $btnEraser = $('.btn-eraser'),
                    $btnRotation = $('.btn-rotation');
                $('.painter-colors:first-child').click();
                $btnPencil.on('click', function () {
                    cancelSelected();
                    canvas.setFreeDrawingBrush('pencil', {
                        width: 15,
                        color: cur_color
                    });
                    canvas.setDrawingMode(true);
                    myself.vm.width = 15;
                    //canvas.freeDrawingBrush.width=10;
                    //canvas.freeDrawingBrush.color=cur_color;
                });
                $btnEraser.on('click', function () {
                    cancelSelected();
                    canvas.setFreeDrawingBrush('eraser', {
                        width: 15,
                        color: cur_color
                    });
                    canvas.setDrawingMode(true);
                });
                $btnRotation.on('click', function () {
                    cancelSelected();
                    canvas.setDrawingMode(true);
                    canvas.setFreeDrawingBrush('rotation', {});
                });
                $('.btn-circle').on('click', function () {
                    myself.$btnPointer.click();
                    addCircle(100, 100, 100);

                });
                $('.btn-rect').on('click', function () {
                    myself.$btnPointer.click();
                    addRect(100, 100, 100, 100);
                });
                $('.btn-line').on('click', function () {
                    myself.$btnPointer.click();
                    addLine();
                });
                $('.btn-triangle').on('click', function () {
                    myself.$btnPointer.click();
                    addTriangle(100, 100, 100, 100);
                });
                $('.btn-text').on('click', function () {
                    myself.$btnPointer.click();
                    addText(0,0);
                });

                $btnPencil .click();
                $('.painter-btn-remove').on('click', removeSelected);
                myself.$btnPointer.on('click', function () {
                    canvas.setDrawingMode(false);
                });
                $('.painter-btn-close').on('click', function () {
                    canvas.setDrawingMode(false);
                    $('#painter-container').hide();
                });
                $('.painter-btn-check').on('click', function () {
                    var result, data, param = {};
                    //todo: Deal with the End
                    //canvas.contextContainer.imageSmoothingEnabled = false;
                    canvas.setDrawingMode(false);
                    //result = toBase64();
                    canvas.layerManager.combineAllLayers();
                    var activeObj = Painter.canvas.getActiveObject();
                    var activeGroup = canvas.getActiveGroup();
                    if (activeGroup) {
                        var objectsInGroup = activeGroup.getObjects();
                        canvas.discardActiveGroup();
                        objectsInGroup.forEach(function (object) {
                            object.active = false;
                        });
                    }
                    if (activeObj) {
                        activeObj.active = false;
                    }
                    canvas.renderAll();
                    canvas.setZoom(1);
                    //options.anchorOffsetX = result.rc.x;
                    //options.anchorOffsetY = result.rc.y;

                    param.img = canvas.lowerCanvasEl;
                    param.rc = canvas.rotationPoint;
                    param.name = $('.painter-name').val();

                    if(canvas.callback){
                        canvas.callback(param);
                    }

                    $('#painter-container').hide();
                });
            }

            initEvents();

            function toBase64() {
                var result;

                canvas.layerManager.combineAllLayers();
                var activeObj = Painter.canvas.getActiveObject();
                var activeGroup = canvas.getActiveGroup();
                if (activeGroup) {
                    var objectsInGroup = activeGroup.getObjects();
                    canvas.discardActiveGroup();
                    objectsInGroup.forEach(function (object) {
                        object.active = false;
                    });
                }
                if (activeObj) {
                    activeObj.active = false;
                }
                Painter.canvas.renderAll();
                Painter.canvas.setZoom(1);
                var data = canvas.toDataURL('png');
                var img = document.createElement('img');
                img.setAttribute('width', width);
                img.setAttribute('height', height);
                img.setAttribute('src', data);
                var c = document.createElement('canvas');
                c.setAttribute('width', width);
                c.setAttribute('height', height);
                var ctx = c.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.setZoom(1);

                result = trimCanvasWithPosition(c, canvas.rotationPoint);
                return result;
            }
        },

        /**
         * Open image in the canvas
         * @param img
         * @param name
         * @param options
         */
        openIn: function (img, name, options) {
            var width = 0, height = 0;
            if(options) {
                width = options.width;
                height = options.height;
                Painter.canvas.rotationPoint = {
                    x: options.rotationCenter.x + (Painter.canvas.width - width)/ 2,
                    y: options.rotationCenter.y + (Painter.canvas.height - height)/ 2
                };
                Painter.canvas.callback = options.callback;
            }
            Painter.canvas.clear();

            $('.painter-name').val(name);

            Painter.canvas.setHeight(this.height);
            Painter.canvas.setWidth(this.width);
            Painter.canvas.renderAll();
            Painter.addImage(img, (Painter.canvas.width - width)/ 2, (Painter.canvas.height - height)/ 2);

            this.$btnPencil.click();
            $('#painter-container').show();
        },

        destroy: function () {
            $('#painter-container').hide();
        }
    };
}();
