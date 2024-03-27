export default class Background {
  constructor(ctx, x, y, img) {
    this.pos = { x, y };
    this.ctx = ctx;
    this.img = img;
    this.size = { w: this.img.width, h: window.innerHeight + 1 };
  }
  draw() {
    this.ctx.drawImage(this.img, this.pos.x - 1, this.pos.y - 1, this.size.w, this.size.h);
  }
}