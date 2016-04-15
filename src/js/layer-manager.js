/**
 * Created by GreenDou on 16/4/7.
 * LayerManager Class
 */

(function(fabric){
    "use strict";

    if(!fabric){
        return;
    }

    function LayerManager(parentCanvas) {
        this.layerList = [];
        this.currentLayer = null;
        this.parentCanvas = parentCanvas;

        if(parentCanvas){
            this.currentLayer = new fabric.Layer(parentCanvas.lowerCanvasEl);
            this.currentLayer.objects = parentCanvas._objects;
            this.addLayer(this.currentLayer);
        }
    }

    LayerManager.prototype.addLayer = function (layer){
        var upperCanvasEl = this.parentCanvas.upperCanvasEl;

        if(!layer){
            var canvasEl = this.parentCanvas._createCanvasElement();
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
    };

    /**
     * Remove Layer
     * @param index
     */
    LayerManager.prototype.removeLayer = function (index) {
        if(index < this.layerList.length && this.layerList.length > 1){
            if(this.layerList[index] === this.currentLayer){
                if(index === 0){
                    this.selectLayer(1);
                }else{
                    this.selectLayer(index - 1);
                }
            }
            this.parentCanvas.wrapperEl.removeChild(this.layerList[index].canvasEl);
            this.layerList.splice(index,1);
        }
    };

    LayerManager.prototype.upLayer = function (index) {
        if(index!== this.layerList.length - 1){
            this.moveLayer(index + 1, index);
        }
    };

    /**
     * Move Layer
     * @param dest Index
     * @param src  Index
     */
    LayerManager.prototype.moveLayer = function (dest, src) {
        if(dest == src) {
            return;
        }
        if(dest === this.layerList.length - 1){
            this.parentCanvas.wrapperEl.insertBefore(this.layerList[src].canvasEl, this.parentCanvas.upperCanvasEl);
        }else{
            this.parentCanvas.wrapperEl.insertBefore(this.layerList[src].canvasEl, this.layerList[dest].canvasEl);
        }
        this.layerList.splice(dest, 0, this.layerList[src]);
        if(dest > src){
            this.layerList.splice(src,1);
        }else{
            this.layerList.splice(src + 1,1);
        }
    };

    LayerManager.prototype.downLayer = function (index){
        if(index !== 0){
            this.moveLayer(index - 1, index);
        }
    };

    LayerManager.prototype.showLayer = function (index) {
        if(index< this.layerList.length){
            this.layerList[index].canvasEl.style.display = null;
            for(var i = 0; i < this.layerList[index].objects.length; ++i){
                this.layerList[index].objects[i].visible = true;
            }
            this.layerList[index].visible = true;
            this.parentCanvas.renderAll();
        }
    };

    LayerManager.prototype.hideLayer = function (index) {
        if(index < this.layerList.length){
            this.layerList[index].canvasEl.style.display = 'none';
            for(var i = 0; i < this.layerList[index].objects.length; ++i){
                this.layerList[index].objects[i].visible = false;
            }
            this.layerList[index].visible = false;
            this.parentCanvas.renderAll();
            //todo: will cause error in trim-canvas for width is 0
        }
    };

    LayerManager.prototype.toggleLayerVisible = function (index) {
        if(this.layerList[index].visible) {
            this.hideLayer(index);
        } else {
            this.showLayer(index);
        }
    };
    /**
     * Select Layer
     * @param index
     */
    LayerManager.prototype.selectLayer = function (index) {
        if(index < this.layerList.length) {
            this.parentCanvas.deactivateAllWithDispatch();
            this.parentCanvas.renderAll();
            this.currentLayer = this.layerList[index];
            this.parentCanvas.lowerCanvasEl = this.currentLayer.canvasEl;
            this.parentCanvas.contextContainer = this.currentLayer.canvasEl.getContext('2d');
            this.parentCanvas._objects = this.currentLayer.objects;
        }
    };

    /**
     *  Reset layers
     */
    LayerManager.prototype.clearLayers = function () {
        this.selectLayer(0);
        this.showLayer(0);
        while(this.layerList.length > 1) {
            this.removeLayer(1);
        }
    };

    /**
     * Make everything into one layer and kill others
     */
    LayerManager.prototype.combineAllLayers = function () {
        this.selectLayer(0);
        while(this.layerList.length > 1) {
            this.currentLayer.objects = this.currentLayer.objects.concat(this.layerList[1].objects);
            this.parentCanvas._objects = this.currentLayer.objects;
            this.removeLayer(1);
        }
    };

    /**
     * Combine layers
     * @param layers:Array<Number> index of layers
     */
    LayerManager.prototype.combineLayers = function (layers) {
        this.selectLayer(layers[0]);
        while(layers.length > 1) {
            if(layers[1] < this.layerList.length){
                this.currentLayer.objects = this.currentLayer.objects.concat(this.layerList[layers[1]].objects);
                this.parentCanvas._objects = this.currentLayer.objects;
                this.removeLayer(layers[1]);
            }
        }
    };

    fabric.LayerManager = LayerManager;
})(fabric);
