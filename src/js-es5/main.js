'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _painter = require('../vue/painter.vue');

var _painter2 = _interopRequireDefault(_painter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by greendou on 16/4/25.
 * Main.js
 */

var rootVm = new _vue2.default({
  el: 'body',
  components: { app: _painter2.default.vm }
});

//# sourceMappingURL=main.js.map