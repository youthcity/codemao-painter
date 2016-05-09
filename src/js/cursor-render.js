(() => {
  if (!fabric) {
    return;
  }

  class CursorRenderer {
    constructor(canvas, brush, options) {
      this.canvas = canvas;
      this.brush = brush;
      this.ctx = canvas.getContext('2d');

      if (options) {
        this.width = options.width || 1;
        this.color = options.color || 'black';
      } else {
        this.width = 1;
        this.color = 'black';
      }
    }

    prepareForRender() {
      const ctx = this.ctx;
      ctx.lineWidth = this.width;
      ctx.strokeStyle = this.color;
    }
    renderCircle(x, y) {
      const ctx = this.ctx;
      const width = this.brush.width;
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(x, y, width / 2, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.fill();
    }

    renderPoint(x, y) {
      const ctx = this.ctx;
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      for (let i = 0; i < 20; i = i + 2) {
        ctx.beginPath();
        ctx.arc(x, y, 20, Math.PI * 2 * i / 20, Math.PI * 2 * (i + 1) / 20, false);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y - 1);
      ctx.lineTo(x, y + 1);
      ctx.stroke();
      ctx.moveTo(x - 1, y);
      ctx.lineTo(x + 1, y);
      ctx.stroke();
    }
  }

  Object.assign(fabric, {
    CursorRenderer,
  });
})();
