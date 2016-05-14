<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="control-panel">
        <!--<div class="control-buttons-container">-->
        <div v-for="button in controlButtons" v-bind:title="button.title" class="control-button"
             v-on:click="button.action()"
             v-bind:class="button.class">
            <!--<img v-bind:src="button.image" alt="button.title">-->
        </div>
        <!--</div>-->
    </div>
</template>
<style>
    .control-panel {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        background-color: #F8F8F8;
    }

    /*.control-buttons-container {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*}*/

    .control-panel .control-button {
        width: 60%;
        padding-bottom: 60%;

        margin: 10%;

        background-repeat: no-repeat;
        background-size: contain;

        cursor: pointer;
    }

    /*.control-panel .control-button img {*/
    /*max-height:100%;*/
    /*max-width: 100%;*/
    /*}*/

    .clear {
        background-image: url('//o44j7l4g3.qnssl.com/program/painter/clear.png');
    }

    .clear:hover {
        background-image: url('//o44j7l4g3.qnssl.com/program/painter/clear-hover.png');
    }

    .undo {
        background-image: url('//o44j7l4g3.qnssl.com/program/painter/undo.png');
    }

    .undo:hover {
        background-image: url('//o44j7l4g3.qnssl.com/program/painter/undo-hover.png ');
    }
    
    .redo {
        background-image: url('//o44j7l4g3.qnssl.com/program/painter/redo.png');
    }

    .redo:hover {
        background-image: url('//o44j7l4g3.qnssl.com/program/painter/redo-hover.png ');
    }
</style>
<script>
    export default {
        data() {
            return {
                controlButtons: [
                    {
                        title: '撤销',
                        action: this.undo,
                        class: ['undo'],
                    },
                    {
                        title: '重做',
                        action: this.redo,
                        class: ['redo'],
                    },
                    {
                        title: '清空画布',
                        action: this.clear,
                        class: ['clear'],
                    },
                ]
            }
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
            },
            undo() {
                this.$root.painter.undo();
            },
            redo() {
                this.$root.painter.redo();
            },
        }
    }
</script>