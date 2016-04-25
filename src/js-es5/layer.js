"use strict";

/**
 * Created by GreenDou on 16/4/7.
 * Layer Class
 */

(function (fabric) {
    "use strict";

    if (!fabric) {
        return;
    }

    function Layer(canvasEl, name) {
        this.canvasEl = canvasEl;
        this.name = name || '新建图层' + Layer.prototype.count++;
        this.parent = null;
        this.objects = [];
        //Use show&hideLayer to set this value,otherwise it won't work
        this.visible = true;
    }

    Layer.prototype.count = 1;

    Layer.prototype.resetCount = function () {
        this.prototype.count = 1;
    };

    fabric.Layer = Layer;
})(fabric);
//# sourceMappingURL=layer.js.map