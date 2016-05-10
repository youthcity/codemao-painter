<template>
    <div class="painter-tools">
        <div class="painter-tools-tabs">
            <div class="tab-button tabs-painting" v-on:click="switchTool(0)" v-bind:class="{'active':isCurrentTool(0)}">
                画图
                <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <polygon id="rect-tab-painting" stroke="none" fill="#F2524C" fill-rule="evenodd"
                             transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
                             points="57 48 65 55 49 55"></polygon>
                </svg>
            </div>
            <div class="tab-button tabs-background" v-on:click="switchTool(1)"
                 v-bind:class="{'active':isCurrentTool(1)}">
                背景
                <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <polygon id="rect-tab-background" stroke="none" fill="#EEB000" fill-rule="evenodd"
                             transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
                             points="57 48 65 55 49 55"></polygon>
                </svg>
            </div>
            <div class="tab-button tabs-layers" v-on:click="switchTool(2)" v-bind:class="{'active':isCurrentTool(2)}">
                图层
                <svg width="16px" height="7px" viewBox="49 48 16 7" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <polygon id="rect-tab-layers" stroke="none" fill="#44BFD2" fill-rule="evenodd"
                             transform="translate(57.000000, 51.500000) scale(1, -1) translate(-57.000000, -51.500000) "
                             points="57 48 65 55 49 55"></polygon>
                </svg>
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

        display: flex;
        flex-direction: column;
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
        height: calc(94% - 6rem);
    }

    .painter-tools-buttons {
        width: 100%;
        height: 6rem;
    }

    .painter-tools .tab-button {
        height: calc(85% - 0.3rem);
        flex-grow: 1;

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
        font-family: STHeitiTC-Light, serif;
        font-size: 18px;
        color: #FFFFFF;

        margin-top: 0.3rem;

        cursor: pointer;
    }

    .painter-tools .tab-button svg {
        display: none;
        width: 100%;
        position: absolute;
        top: calc(100% - 0.1rem);
        left: 0;
    }

    .painter-tools .tab-button.active{
        height: 85%;
        margin-top:0;
    }

    .painter-tools .tab-button.active svg{
        display: block;
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