<template>
  <div id="painter-container" class="v-flex" style="visibility: hidden;">
    <div class="painter-header h-flex v-center">
      <div class="painter-btn-close"></div>
      <div class="flex1 vh-center">
        <div class="input-wrap">
          <input class="painter-name" value="test"/>
        </div>
      </div>
      <div class="painter-btn-check"></div>
    </div>
    <div class="painter-content h-flex flex1">
      <div class="painter-left-buttons">
        <div class="painter-btn btn-pencil"></div>
        <div class="painter-btn btn-eraser"></div>
        <div class="painter-btn btn-pointer"></div>
        <div class="painter-btn btn-rotation"></div>

        <!--<div class="painter-btn btn-bold1"></div>-->
        <!--<div class="painter-btn btn-bold2"></div>-->
        <!--<div class="painter-btn btn-bold3"></div>-->
        <!--<div class="painter-btn btn-bold4"></div>-->
      </div>
      <div class="painter-wrapper v-flex">
        <div class="painter flex1 vh-center">
          <canvas id="painter-canvas"></canvas>
        </div>
        <div class="painter-properties h-flex vh-center">
          <span>粗细：</span>
          <span class="number-input">{{width}}</span>
          <input type="range" value min="1" max="120" step="1" v-model="width"/>
          <span>文字：</span>
          <textarea v-model="content"></textarea>
        </div>
      </div>
      <div class="painter-right-buttons">
        <div class="insert-btn btn-line"></div>
        <div class="insert-btn btn-rect"></div>
        <div class="insert-btn btn-circle"></div>
        <div class="insert-btn btn-triangle"></div>
        <div class="insert-btn btn-text"></div>
        <div class="painter-btn-remove"></div>
      </div>
    </div>
    <div class="painter-bottom-wrap h-flex vh-center">
      <div class="painter-color h-flex vh-center">
        <div></div>
        <input type="color" v-model="color"/>
      </div>
      <div class="painter-colors-wrap vh-center"></div>
    </div>
  </div>
  <script id="template-colors" type="text/html">
    <div class="painter-btn painter-colors" style="background:<#=color#>;" data-value="<#=color#>"></div>
  </script>
  <!--<script src="dist/js/painter.min.js"></script>-->
  <!--Painter-->
</template>
<style scoped>
  body {
    background-color: #ff0000;
  }
</style>
<script>
  import '../css/painter.css'
  import '../css/common.css'
  import '//o2n0qxlrf.qnssl.com/js/fabric.min.js'
  import '../js/painter.js'


  export default window.Painter
</script>