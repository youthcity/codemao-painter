(function () {
    window.trim_canvas = function (c) {
        // open new window with trimmed image:
        return getCanvas(c).canvas;
    };

    /**
     * Trim with Position Info
     * @param c Canvas Context
     * @param {{x:number,y:number}} rc Rotation Center
     * @returns {{canvas: *, left: null, top: null, rc: *}}
     */
    window.trimCanvasWithPosition = function (c, rc) {
        "use strict";
        var result = getCanvas(c, rc);
        if(rc) {
            rc.x = rc.x - result.bound.left;
            rc.y = rc.y - result.bound.top;
        }

        // open new window with trimmed image:
        return {
            canvas: result.canvas,
            left: result.bound.left,
            top: result.bound.top,
            rc: rc
        };
    };

    function detectBounds(c, rc) {
        var ctx = c.getContext('2d'),
            pixels = ctx.getImageData(0, 0, c.width, c.height),
            l = pixels.data.length,
            i,
            bound = {
                top: null,
                left: null,
                right: null,
                bottom: null
            },
            x, y;

        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
                x = (i / 4) % c.width;
                y = ~~((i / 4) / c.width);

                if (bound.top === null) {
                    bound.top = y;
                }

                if (bound.left === null) {
                    bound.left = x;
                } else if (x < bound.left) {
                    bound.left = x;
                }

                if (bound.right === null) {
                    bound.right = x;
                } else if (bound.right < x) {
                    bound.right = x;
                }

                if (bound.bottom === null) {
                    bound.bottom = y;
                } else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }

        if(rc){
            if (bound.top > rc.y) {
                bound.top = rc.y;
            }
            if (bound.bottom < rc.y) {
                bound.bottom = rc.y;
            }
            if (bound.left > rc.x) {
                bound.left = rc.x;
            }
            if (bound.right < rc.x) {
                bound.right = rc.x;
            }
        }

        return bound;
    }

    function getCanvas (c, rc) {
        "use strict";
        var copy = document.createElement('canvas').getContext('2d');
        var bound = detectBounds(c, rc);
        var trimHeight = bound.bottom - bound.top + 3,
            trimWidth = bound.right - bound.left + 3;

        copy.canvas.width = trimWidth;
        copy.canvas.height = trimHeight;
        copy.drawImage(c, bound.left, bound.top, trimWidth, trimHeight,
            0, 0, trimWidth, trimHeight);
        return {
            canvas: copy.canvas,
            bound: bound
        };
    }

})();
