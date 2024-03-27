import createImage from "./tools"
import spriteStandRightImg from "/assets/img/spriteStandRight.png";
import spriteStandLeftImg from "/assets/img/spriteStandLeft.png";
import spriteRunRightImg from "/assets/img/spriteRunRight.png";
import spriteRunLeftImg from "/assets/img/spriteRunLeft.png";

export default class Player {
  constructor(ctx, gravity) {
    this.ctx = ctx
    this.gravity = gravity
    this.width = 66
    this.height = 150
    this.position = { x: 400, y: 100 }
    this.velocity = { x: 0, y: 1 }
    this.speed = 5
    this.img = createImage(spriteStandRightImg)
    this.frames = 0
    this.sprites = {
      stand: {
        left: createImage(spriteStandLeftImg),
        right: createImage(spriteStandRightImg),
        cropWidth: createImage(spriteStandRightImg).width / 60,
        size: {
          w: 66,
          h: 150
        }
      },
      run: {
        left: createImage(spriteRunLeftImg),
        right: createImage(spriteRunRightImg),
        cropWidth: createImage(spriteRunRightImg).width / 30,
        size: {
          w: 127.875,
          h: 150
        }
      }
    }
    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = this.sprites.stand.cropWidth
    this.currentSizeSprite = this.sprites.stand.size.w
  }
  draw() {
    this.ctx.drawImage(
      this.currentSprite, 
      (this.currentCropWidth * this.frames), 
      0, 
      this.currentCropWidth, 
      this.img.height, 
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height
    )
  }
  update() {
    this.frames++
    
    if (this.frames >= 60 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) this.frames = 0
    else if (this.frames >= 30 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) this.frames = 0
    
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y <= canvas.height) 
      this.velocity.y += this.gravity
  }
}