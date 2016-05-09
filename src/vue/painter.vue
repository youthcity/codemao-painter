<template>
    <div class="painter">
        <painter-tools></painter-tools>
        <div class="right-panel">
            <div class="paint-panel">
                <painter-canvas-wrapper></painter-canvas-wrapper>
                <painter-object-panel></painter-object-panel>
            </div>
            <painter-control-panel></painter-control-panel>
        </div>
    </div>
</template>
<style>
    .painter {
        width: 100%;
        height: 100%;
        display: flex;

        background-color: #fdb336;
    }

    .right-panel {
        width: 80%;
        height: 100%;
        background-color: blueviolet;
    }

    .paint-panel {
        width: 100%;
        height: 95%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        background-color: #F8F8F8;
    }


</style>
<script src="../js/painter.js"></script>