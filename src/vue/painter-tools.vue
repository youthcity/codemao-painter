<template>
    <div class="painter-tools">
        <div class="painter-tools-tabs">
            <div class="tab-button tabs-painting" v-on:click="switchTool(0)" v-bind:class="{'active':isCurrentTool(0)}">
                画图
            </div>
            <div class="tab-button tabs-background" v-on:click="switchTool(1)"
                 v-bind:class="{'active':isCurrentTool(1)}">背景
            </div>
            <div class="tab-button tabs-layers" v-on:click="switchTool(2)" v-bind:class="{'active':isCurrentTool(2)}">
                图层
            </div>
        </div>
        <div class="painter-tools-container">
            <!--<components :is="currentTool"></components>-->
            <painter-tools-painting v-show="isShowPanel('painter-tools-painting')"></painter-tools-painting>
            <painter-tools-background v-show="isShowPanel('painter-tools-background')"></painter-tools-background>
            <painter-tools-layers v-show="isShowPanel('painter-tools-layers')"></painter-tools-layers>
        </div>
        <div class="painter-tools-buttons">
            <painter-tools-costume></painter-tools-costume>
        </div>
    </div>
</template>
<style scoped>
    .painter-tools {
        width: 20%;
        height: 100%;
        background: #ECE7DD;
    }

    .painter-tools-tabs {
        width: 100%;
        height: 6%;

        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .painter-tools-container {
        width: 100%;
        height: 84%;
    }

    .painter-tools-buttons {
        width: 100%;
        height: 10%;
    }

    .painter-tools .tab-button {
        height: 90%;
        flex-grow: 1;

        display: flex;
        align-items: center;
        justify-content: center;
        font-family: STHeitiTC-Light, serif;
        font-size: 18px;
        color: #FFFFFF;

        cursor: pointer;
    }

    .painter-tools .tab-button.active {
        height: 100%;
    }

    .painter-tools .tabs-painting {
        background: #F2524C;
    }

    .painter-tools .tabs-background {
        background: #EEB000;
    }

    .painter-tools .tabs-layers {
        background: #44BFD2;
    }
</style>
<script>
    import painterToolsPainting from './painter-tools-painting.vue';
    import painterToolsLayers from './painter-tools-layers.vue';
    import painterToolsBackground from './painter-tools-background.vue';
    import painterToolsCostume from './painter-tools-costume.vue';
    export default {
        props: ['canvas'],
        components: {
            painterToolsPainting,
            painterToolsLayers,
            painterToolsBackground,
            painterToolsCostume,
        },
        data() {
            return {
                currentToolIndex: 0,
                toolList: ['painting', 'background', 'layers'],
            }
        },
        computed: {
            currentTool() {
                return `painter-tools-${this.toolList[this.currentToolIndex]}`;
            },
        },
        methods: {
            switchTool(index) {
                let i = index;
                if (i === undefined) {
                    i = this.currentToolIndex + 1;
                }
                this.currentToolIndex = i % this.toolList.length;
            },
            isShowPanel(panel) {
                return panel === this.currentTool;
            },
            isCurrentTool(index) {
                return index === this.currentToolIndex;
            }
        }
    }
</script>