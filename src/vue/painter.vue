<template>
    <div class="painter">
        <painter-tools></painter-tools>
        <div class="right-panel">
            <div class="paint-panel">
                <painter-canvas-wrapper></painter-canvas-wrapper>
                <painter-object-panel></painter-object-panel>
            </div>
            <div class="painter-control-wrapper">
                <painter-control-panel></painter-control-panel>
            </div>
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
        width: 75%;
        height: calc(100% - 4rem);
        /*height: 100%;*/

        display: flex;
        flex-direction: row;
        flex-grow: 1;

        padding: 2rem 0 2rem 5%;

        background-color: rgb(248, 248, 248);
    }

    .paint-panel {
        height: 100%;
        width:70%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        flex-grow: 1;
        flex-shrink: 1;

        background-color: #F8F8F8;
    }
    .painter-control-wrapper {
        width:10%;
        max-width: 6rem;
        height:100%;

        flex-shrink: 0;
    }

</style>
<script src="../js/painter.js"></script>