<template>
    <div class="tools-panel">
        <div class="background-container">
            <div class="background-item" v-for="bg in backgroundImageList">
                <img v-bind:title="bg.title" v-bind:src="bg.url" v-on:click="setBackgroundImage(bg.url)"/>
            </div>
        </div>
        <label class="custom-color">自定义
            <input class="color" v-model="bgColor" v-bind:style="{backgroundColor: bgColor}">
        </label>
        <div class="clear-button" v-on:click="setBackgroundImage(null)">清除背景</div>
    </div>
</template>
<style scoped>
    .tools-panel {
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        margin: 0 5%;

        background: #ECE7DD;
    }

    .tools-panel .background-container {
        display: flex;
        justify-content: center;

        width: 100%;
        flex-grow: 1;

        overflow-y: auto;
    }

    .tools-panel .background-item {
        width: 3.5rem;
        height: 3.5rem;

        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0.3rem;

        border: 1px solid #CCCCCC;
        border-radius: 4px;
    }

    .background-item img {
        max-width: 100%;
        max-height: 100%;
    }

    .custom-color {
        width: 100%;
        height: 3rem;

        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px dashed #DDD0C3;

        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
    }

    .custom-color input {
        width: 7rem;
        height: 1.5rem;

        margin: 0 0.5rem;

        background: transparent;
        border: 4px solid #FFFFFF;
        border: 2px solid #AA9278;
        box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);
        border-radius: 4px;

        cursor: pointer;
    }

    .custom-color input:focus {
        outline: none;
    }

    .clear-button {
        height: 2rem;
        width: 11rem;

        margin: 0.5rem 0.5rem;
        border: 2px solid #645542;
        border-radius: 4px;

        /* 清除背景: */
        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
        text-align: center;
        line-height: 2rem;

        cursor: pointer;
    }
</style>
<script>
    export default {
        data(){
            return {
                backgroundColor: null,
                backgroundImageList: [
                    {
                        title: '纯白的开始',
                        url: 'http://7xpw4q.com1.z0.glb.clouddn.com/0/%E7%BA%AF%E7%99%BD%E7%9A%84%E5%BC%80%E5%A7%8B',
                    },
                    {
                        title: '绿荫之森',
                        url: 'http://7xpw4q.com1.z0.glb.clouddn.com/0/%E7%BB%BF%E8%90%8C%E4%B9%8B%E6%A3%AE',
                    },
                ],
            }
        },
        computed: {
            canvas() {
                return this.$root.canvas;
            },
            bgColor: {
                get() {
                    let color = this.backgroundColor;
                    if (this.canvas) {
                        color = this.canvas.layerManager.currentLayer.backgroundColor;
                    }
                    return color;
                },
                set(newValue) {
                    if (this.canvas) {
                        this.canvas.layerManager.setBackgroundColor(newValue);
//                        if (this.backgroundColor !== newValue) {
//                            this.canvas.fire('background:changed',
//                                    {
//                                        target: this.canvas.layerManager.currentLayer,
//                                        type: 'color',
//                                        oldValue: this.backgroundColor,
//                                        newValue,
//                                    });
//                        }
                    }
                    this.backgroundColor = newValue;
                }
            }
        },
        methods: {
            setBackgroundImage(url) {
                this.canvas.layerManager.setBackgroundImageURL(url);
//                if (url) {
//                    this.canvas.fire('background:changed');
//                } else {
                this.canvas.layerManager.setBackgroundColor('transparent');
//                    this.canvas.fire('background:changed');
//                }
            }
        },
    }
</script>