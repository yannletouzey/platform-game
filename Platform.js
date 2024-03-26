
export default class Platform {
  constructor(ctx, x, y, w, h, img) {
    this.pos = { x, y };
    this.size = { w, h };
    this.ctx = ctx;
    this.img = img;
  }
  draw() {
    this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.w, this.size.h);
  //   this.ctx.fillStyle = 'green';
  //   this.ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
  }
}