<template>
    <div class="painter-canvas-wrapper">
        <canvas class="painter-canvas"></canvas>
        <div class="stage-size"></div>
        <!--<img src="//o44j7l4g3.qnssl.com/program/painter/stage-size.png">-->
    </div>
</template>
<style scoped>
    .painter-canvas-wrapper {
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        background-image: url("//o44j7l4g3.qnssl.com/program/painter/grid.png");

        border: 4px solid rgba(198, 177, 155, 0.60);
        border-radius: 4px;
    }

    .stage-size {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -150px;
        margin-top: -225px;
        width: 310px;
        height: 450px;
        background-image: url('//o44j7l4g3.qnssl.com/program/painter/stage-size.png');
        opacity:0.5;
        pointer-events: none;
    }

    /*img {*/
        /*position: absolute;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*margin-left: -150px;*/
        /*margin-top: -225px;*/
        /*opacity: 0.5;*/
        /*pointer-events: none;*/
    /*}*/
</style>
<script>
    export default{}
</script>