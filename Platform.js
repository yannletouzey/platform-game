export default class Platform {
  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @param {number} x 
   * @param {number} y 
   * @param {HTMLImageElement} img 
   */
  constructor(ctx, x, y, img) {
    this.pos = { x, y };
    this.ctx = ctx;
    this.img = img;
    this.size = { w: this.img.width, h: this.img.height };
  }
  draw() {
    this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.size.w, this.size.h);
  }
}