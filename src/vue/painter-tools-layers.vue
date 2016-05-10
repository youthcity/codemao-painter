<template>
    <div class="tools-layers">
        <div class="panel-slider-item">
            <label>
                <span class="slider-title">透明</span>
                <span>-</span>
                <input type="range" value="1" min="0" max="1" step="0.01" v-model="curLayerOpacity"/>
                <span>+</span>
                <span class="slider-value" v-text="curLayerOpacity"></span>
            </label>
        </div>
        <div class="layers-container">
            <div class="layers-item" v-for="layer in layerList" v-on:click="selectLayer($index)"
                 v-bind:id="'layer'+$index" v-bind:class="{'active': isCurrentLayer($index)}">
                <div class="layers-thumbnail">
                    <img alt="缩略图" v-bind:src="getThumbnail(layer)">
                </div>
                <div class="layers-item-right">
                    <span class="layers-name" v-text="layer.name"></span>
                    <div class="layers-buttons">
                        <div class="layers-visible" v-text="getVisibleButton(layer.visible)"
                             v-on:click.stop="toggleLayerVisible($index)"></div>
                    </div>
                    <div class="layers-delete"
                         v-on:click.stop="removeLayer($index)">
                        <svg width="18px" height="18px" viewBox="194 99 18 18" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <defs></defs>
                            <path d="M201.530628,106.530628 L198.194021,106.530628 C197.459043,106.530628 196.863961,107.127581 196.863961,107.863961 C196.863961,108.605475 197.459449,109.197294 198.194021,109.197294 L201.530628,109.197294 L201.530628,112.533902 C201.530628,113.268879 202.127581,113.863961 202.863961,113.863961 C203.605475,113.863961 204.197294,113.268473 204.197294,112.533902 L204.197294,109.197294 L207.533902,109.197294 C208.268879,109.197294 208.863961,108.600341 208.863961,107.863961 C208.863961,107.122447 208.268473,106.530628 207.533902,106.530628 L204.197294,106.530628 L204.197294,103.194021 C204.197294,102.459043 203.600341,101.863961 202.863961,101.863961 C202.122447,101.863961 201.530628,102.459449 201.530628,103.194021 L201.530628,106.530628 Z"
                                  id="layer-close-button" stroke="none" fill="#645542" fill-rule="evenodd"
                                  transform="translate(202.863961, 107.863961) rotate(-315.000000) translate(-202.863961, -107.863961) "></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="layers-tools-container">
            <div class="layers-tool" v-on:click="upLayer()">^</div>
            <div class="layers-tool" v-on:click="downLayer()">v</div>
            <div class="layers-tool" v-on:click="addLayer()">+</div>
        </div>
    </div>
</template>
<style scoped>
    .tools-layers {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        padding: 0 5%;

        background: #ECE7DD;
    }

    .panel-slider-item label {
        height: 2rem;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .panel-slider-item input {
        width: 6rem;
    }

    .panel-slider-item span {
        margin: 0 0.1rem;

        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
    }

    .panel-slider-item span.slider-title {
        margin-right: 0.5rem;
        font-size: 18px;
    }

    .panel-slider-item span.slider-value {
        font-size: 14px;

        margin-left: 0.5rem;
    }

    .layers-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: flex-end;

        padding: 0 1rem;
    }

    .layers-item {
        width: 100%;
        height: 3.5rem;

        position: relative;

        display: flex;
        align-items: center;

        margin: 0.2rem 0;
        padding: 0 0.1rem;

        /*background: #FFFFFF;*/
    }

    .layers-item.active {
        background: #FFF;
    }

    .layers-item-right {
        flex-grow: 1;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }

    .layers-thumbnail {
        width: 3.5rem;
        height: 3rem;

        margin: 0 0.2rem;

        background: #FFFFFF;
        border: 1px solid #CCCCCC;
    }

    .layers-thumbnail img {
        max-width: 100%;
        max-height: 100%;
    }

    .layers-name {
        font-family: STHeitiTC-Medium, serif;
        font-size: 14px;
        color: #645542;
    }

    .layers-tools-container {
        height: 2.5rem;

        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .layers-tool {
        height: 1.5rem;
        width: 2.5rem;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0.2rem;
        background-color: #fff;
        color: #CFBE90;

        cursor: pointer;
    }

    .layers-delete {
        display: none;
        position: absolute;
        top: 0;
        right: 0;

        cursor: pointer;
    }

    .layers-item.active .layers-delete {
        display: block;
    }

    .layers-visible {
        width:1.2rem;
        height:1.2rem;

        text-align: center;
        line-height:1.2rem;

        background: #D8D8D8;
        border: 1px solid #979797;

        font-family: STHeitiTC-Medium,serif;
        font-size: 12px;
        color: #645542;

        cursor: pointer;
    }
</style>
<script>
    export default {
        data(){
            return {
                currentLayerOpacity: 1,
                needRefresh: this.$root.painter.store.state.needRefreshThumbnails,
            };
        },
        computed: {
            canvas() {
                return this.$root.canvas;
            },
            layerList() {
                if (this.layerManager)
                    return this.layerManager.layerList;

            },
            layerManager() {
                if (this.canvas) {
                    return this.canvas.layerManager;
                }
            },
            curLayer() {
                if (this.layerManager) {
                    return this.layerManager.currentLayer;
                }
            },
            curLayerOpacity: {
                get(){
                    let opacity = this.currentLayerOpacity;
                    if (this.curLayer) {
                        opacity = this.curLayer.opacity;
                    }
                    return opacity;
                },
                set(newValue) {
                    if (this.curLayer) {
                        this.curLayer.opacity = newValue;
                    }
                    this.currentLayerOpacity = newValue;
                }
            },
            curLayerIndex() {
                return this.layerManager.getIndex(this.curLayer);
            },
            needRefreshThumbnails: {
                get(){
                    return this.$root.painter.store.state.needRefreshThumbnails;
                },
                set(newValue) {
                    this.$root.painter.store.state.needRefreshThumbnails = newValue;
                }
            },
        },
        methods: {
            toggleLayerVisible(index) {
                this.layerManager.toggleLayerVisible(index);
            },
            removeLayer(index){
                this.layerManager.removeLayer(index);
            },
            addLayer() {
                this.layerManager.addLayer();
            },
            upLayer() {
                this.layerManager.upLayer(this.curLayerIndex);
            },
            downLayer() {
                this.layerManager.downLayer(this.curLayerIndex);
            },
            selectLayer(index) {
                this.layerManager.selectLayer(index);
            },
            isCurrentLayer(index) {
                return index === this.layerManager.getIndex(this.curLayerIndex);
            },
            getThumbnail(layer) {
                if (this.needRefreshThumbnails)
                    this.needRefreshThumbnails = false;
                return layer.thumbnail;
            },
            isCurrentLayer(index) {
                return this.curLayerIndex === index;
            },
            getVisibleButton(visible) {
                return visible ? '显' : '隐';
            }
        }
    }
</script>