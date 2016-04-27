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
<style src="../css/painter.css"></style>
<script src="../js/painter.js"></script>