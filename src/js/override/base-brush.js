/**
 * Created by greendou on 16/4/11.
 * BaseBrush Override
 */

(function() {
    "use strict";
    if(!fabric){
        return;
    }

    fabric.BaseBrush.prototype.setOptions = function (options) {
        for (var prop in options) {
            if(options.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }
    }

})();