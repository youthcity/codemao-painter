<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="painter-object-panel">
        <input title="颜色" class="color object-color" v-show="curObject&&!isImage"
               v-bind:style="{backgroundColor: curColor}"
               v-model="curColor">
        <label class="object-opacity" v-show="curObject&&isImage"> 透明度 -
            <input title=" 透明度" type="range" min="0" max="1" step="0.01"
                   v-model="curOpacity"  @mouseup="fireOpacityChanged">+
            <span v-text="curOpacity"></span>
        </label>
        <input title="字号" type="number" class="font-size" v-show="curObject&&showText"
               v-model="curFontSize">
        <textArea class="object-text" title="文字内容" v-model="curText" v-show="curObject&&showText"></textArea>
        <div title="删除对象" class="remove-button" v-show="curObject||curGroup" v-on:click="removeSelected()">
            <img src="//o44j7l4g3.qnssl.com/program/painter/delete.png" alt="删除对象">
        </div>
    </div>
</template>
<style>
    .painter-object-panel {
        width: 85%;
        height: calc(10% - 1rem);
        padding: 0.5rem;
        background-color: #F8F8F8;

        display: flex;
        align-items: center;
    }

    .painter-object-panel .object-color {
        width: 2rem;
        height: 1.5rem;
        color: transparent;

        background: #8B572A;
        border: 4px solid #FFFFFF;
        border: 2px solid #DDD0C3;
        box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.30);
        border-radius: 4px;

        cursor: pointer;
    }

    .painter-object-panel .object-opacity {
        /*width: 14rem;*/
        margin: 0 0.5rem;

        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
    }

    .painter-object-panel .object-opacity input {
        width: 6.25rem;
    }

    .painter-object-panel .object-opacity span {
        display: inline-block;

        width: 2.2rem;
        margin-left: 0.5rem;
        text-align: center;
    }

    .painter-object-panel .font-size {
        width: 3.2rem;
        height: 1.5rem;

        margin: 0 0.5rem;

        background: #FFFFFF;
        border: 4px solid #FFFFFF;
        border: 2px solid #DDD0C3;
        border-radius: 4px;

        font-family: STHeitiTC-Medium,serif;
        font-size: 18px;
        color: #645542;

        text-align: center;
    }

    .painter-object-panel .font-size:focus {
        outline: none;
    }

    .painter-object-panel .object-text {
        width: 15rem;
        height: 3rem;
        max-width: 20rem;
        max-height: 3.5rem;

        margin: 0 0.5rem;
    }

    .painter-object-panel .remove-button {
        float: right;

        font-family: STHeitiTC-Medium,serif;
        font-size: 18px;
        color: #645542;

        cursor: pointer;
    }
</style>
<script src="../js/painter-object-panel.js"></script>