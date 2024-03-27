export default class Player {
  constructor(ctx, grv) {
    this.ctx = ctx
    this.grv = grv
    this.width = 30
    this.height = 30
    this.position = {
      x: 400,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 1
    }
    this.speed = 5
  }
  draw() {
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += this.grv
    }
  }
}