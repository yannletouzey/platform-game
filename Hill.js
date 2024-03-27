export default class Hill {
  constructor(ctx, x, y, w, h, img) {
    this.pos = { x, y };
    this.ctx = ctx;
    this.img = img;
    this.size = { w, h };
  }
  draw() {
    this.ctx.drawImage(this.img, this.pos.x - 1, this.pos.y - 1, this.size.w, this.size.h);
  }
}