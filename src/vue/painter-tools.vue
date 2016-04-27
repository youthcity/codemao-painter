<template>
    <div class="painter-tools">
        <div class="painter-tools-tabs" v-on:click="switchTool()">this is painter tabs</div>
        <components :is="currentTool"></components>
    </div>
</template>
<style scoped>
    .painter-tools {
        width: 20%;
        height: 100%;
        background-color: darkred;
    }

    .painter-tools-tabs {
        width:100%;
        height:10%;
    }
</style>
<script>
    import painterToolsPainting from './painter-tools-painting.vue';
    import painterToolsLayers from './painter-tools-layers.vue';
    export default {
        components: {
            painterToolsPainting,
            painterToolsLayers,
        },
        data() {
            return {
                currentToolIndex: 0,
                toolList: ['painting', 'layers'],
            }
        },
        computed: {
            currentTool() {
                return `painter-tools-${this.toolList[this.currentToolIndex]}`;
            }
        },
        methods: {
            switchTool(index) {
                let i = index;
                if(!i) {
                    i = this.currentToolIndex + 1;
                }
                this.currentToolIndex = i%this.toolList.length;
            }
        }
    }
</script>