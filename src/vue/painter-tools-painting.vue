<template>
    <div class="tools-painting">
        <div class="tools-buttons-container">
            <!--<span>笔触</span>-->
            <div title="画笔" class="tools-button tools-pencil" v-on:click="selectBrush('pencil')"
                 v-bind:class="{'active': isCurrentTool('pencil')}">
                <img class="button-img" src="/assets/pencil.png" alt="笔">
                <img class="button-img-on" src="/assets/pencil-on.png" alt="笔">
            </div>
            <div title="直线" class="tools-button tools-line" v-on:click="selectBrush('line')"
                 v-bind:class="{'active': isCurrentTool('line')}">
                <img class="button-img" src="/assets/line.png" alt="线">
                <img class="button-img-on" src="/assets/line-on.png" alt="线">
            </div>
            <div title="矩形" class="tools-button tools-rect" v-on:click="selectBrush('rect')"
                 v-bind:class="{'active': isCurrentTool('rect')}">
                <img class="button-img" src="/assets/rect.png" alt="方">
                <img class="button-img-on" src="/assets/rect-on.png" alt="方">
            </div>
            <div title="圆形" class="tools-button tools-round" v-on:click="selectBrush('round')"
                 v-bind:class="{'active': isCurrentTool('round')}">
                <img class="button-img" src="/assets/round.png" alt="圆">
                <img class="button-img-on" src="/assets/round-on.png" alt="圆">
            </div>
        </div>
        <div class="tools-buttons-container">
            <div title="橡皮" class="tools-button tools-eraser" v-on:click="selectBrush('eraser')"
                 v-bind:class="{'active': isCurrentTool('eraser')}">
                <img class="button-img" src="/assets/eraser.png" alt="橡">
                <img class="button-img-on" src="/assets/eraser-on.png" alt="橡">
            </div>
            <div title="选择" class="tools-button tools-select" v-on:click="selectBrush()"
                 v-bind:class="{'active': isCurrentTool()}">
                <img class="button-img" src="/assets/select.png" alt="选">
                <img class="button-img-on" src="/assets/select-on.png" alt="选">
            </div>
            <div title="文字" class="tools-button tools-text" v-on:click="addShape('text')">
                <img class="button-img" src="/assets/text.png" alt="字">
            </div>
            <div title="旋转中心" class="tools-button tools-select" v-on:click="selectBrush('rotation')"
                 v-bind:class="{'active': isCurrentTool('rotation')}">
                <img class="button-img" src="/assets/rotation.png" alt="中">
                <img class="button-img-on" src="/assets/rotation-on.png" alt="中">
            </div>
        </div>
        <div class="tools-slider-container">
            <span class="tools-container-title">粗细</span>
            <span class="input-minus">-</span>
            <input title="粗细" type="range" value="7" min="1" max="100" step="1" v-model="curStrokeWidth"/>
            <span class="input-plus">+</span>
            <span class="number-input" v-text="curStrokeWidth"></span>
        </div>
        <div class="tools-slider-container">
            <span class="tools-container-title">透明</span>
            <span class="input-minus">-</span>
            <input title="透明度" type="range" value="1" min="0" max="1" step="0.01" v-model="curObjectOpacity"/>
            <span class="input-plus">+</span>
            <span class="number-input" v-text="curObjectOpacity"></span>
        </div>
        <div class="tools-item">
            <span class="item-title">颜色</span>
            <input title="颜色" type="color" class="color" v-model="curColor"
                   v-bind:style="{backgroundColor: curColor, color: pickerTextColor}"/>
        </div>
        <div class="tools-area">
            <div class="tools-default-color" v-for="color in defaultColors"
                 v-bind:style="{backgroundColor: color}" v-on:click="selectColor(color)">
            </div>
        </div>
    </div>
</template>
<style>
    .tools-painting {
        width: 100%;
        height: calc(100% - 2rem);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        padding: 1rem 0;

        background-color: #e6e0d8;
    }

    .tools-buttons-container {
        width: 90%;
        height: 2.8rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        margin: 2% 0;

        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        background: #E2D7BE;;
    }

    .tools-button {
        height: 2.5rem;
        width: 2.5rem;

        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0 0.1rem;
        /*color: #333;*/

        /*border: solid;*/
    }

    .tools-button img {
        max-height: 100%;
        max-width: 100%;
    }

    .tools-button.active .button-img {
        display: none;
    }

    .tools-button.active .button-img-on {
        display: block;
    }

    .tools-button .button-img-on {
        display: none;
    }

    .tools-slider-container {
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0.5rem 0;

        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
    }

    .tools-slider-container .tools-container-title {
        margin-right: 8%;

        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
    }

    .tools-slider-container input {
        width: 40%;

        flex-grow: 1;
    }

    .tools-slider-container span {
        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
    }

    .tools-slider-container .number-input {
        width: 2rem;

        margin-left: 4%;

        font-family: STHeitiTC-Medium, serif;
        font-size: 14px;
        color: #645542;
    }

    .input-plus {
        margin-bottom: -3%;
    }

    .input-minus {
        margin-bottom: -1%;
    }

    .tools-item {
        width: 90%;
        display: flex;
        align-items: center;
    }

    .item-title {
        margin-right: 8%;

        font-family: STHeitiTC-Medium, serif;
        font-size: 18px;
        color: #645542;
    }

    .tools-item input.color {
        width: 60%;

        background: #8B572A;
        border: 4px solid #FFFFFF;
        border: 2px solid #AA9278;
        box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.30);
        border-radius: 4px;

        cursor: pointer;
    }

    .tools-item input:focus {
        outline: none;
    }

    .tools-area {
        width: calc(90% - 0.2rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        margin: 1rem 0;
        padding: 1rem 0.1rem;

        background: #E1D6BE;
        border-radius: 8px;
    }

    .tools-default-color {
        height: 2rem;
        width: 2rem;

        margin: 0.2rem;

        border: 1px solid rgba(0, 0, 0, 0.37);
        border-radius: 1.1rem;
        box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.50);

    }

</style>
<script src="../js/painter-tools-painting.js"></script>