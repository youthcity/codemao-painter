/**
 * Created by greendou on 16/4/25.
 * Main.js
 */
import Vue from 'vue';
import '../css/common.css';
import painter from '../vue/painter.vue';

class Painter {
  constructor(el) {
    this.vm = new Vue(
      {
        el: '#painter-wrapper',
        components: { painter },
        data: {
          canvas: null,
        },
        methods: {
          setCanvasSize(width, height) {
            this.canvas.setWidth(width);
            this.canvas.setHeight(height);
          },
        },
      }
    );

    /**
     * Init DOM Element
     * @type {Element}
     */
    this.painterEl = document.querySelector(`#${el}`);
    this.canvasWrapperEl = this.painterEl.querySelector('.painter-canvas-wrapper');
    this.canvasEl = this.canvasWrapperEl.querySelector('.painter-canvas');
    this.vm.canvas = new fabric.Canvas(this.canvasEl);
    this.vm.setCanvasSize(this.canvasWrapperEl.clientWidth, this.canvasWrapperEl.clientHeight);

    /**
     * Listener of Resize
     */
    this.onPainterResize = () => {
      this.vm.setCanvasSize(this.canvasWrapperEl.clientWidth, this.canvasWrapperEl.clientHeight);
    };
    window.addEventListener('resize', this.onPainterResize);
  }
}

window.painterObject = new Painter('painter-wrapper');
