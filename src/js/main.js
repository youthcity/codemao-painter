/**
 * Created by greendou on 16/4/25.
 * Main.js
 */
import Vue from 'vue';
import Painter from '../vue/painter.vue';

const rootVm = new Vue(
  {
    el: 'body',
    components: { app: Painter.vm },
  }
);
