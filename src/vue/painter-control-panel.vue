<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="control-panel">
        <div class="control-buttons-container">
            <div title="清空画布" class="control-button" v-on:click="clear()">
                <img src="//o44j7l4g3.qnssl.com/program/painter/clear.png" alt="清空画布">
            </div>
        </div>
    </div>
</template>
<style>
    .control-panel {
        width: 100%;
        height: 5%;

        display: flex;
        justify-content:flex-end;
        align-items:center;

        background-color: #F8F8F8;
    }

    .control-panel .control-button {
        margin:0 1rem;

        font-family: STHeitiTC-Medium,serif;
        font-size: 18px;
        color: #645542;

        cursor: pointer;
    }
</style>
<script>
    export default {
        data() {
            return {}
        },
        computed: {
            canvas() {
                return this.$root.canvas;
            }
        },
        methods: {
            clear() {
                this.canvas.layerManager.clearLayers();
                this.canvas.clear();
            }
        }
    }
</script>