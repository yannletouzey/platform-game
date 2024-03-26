import Platform from "./Platform";
import keys from "./keys";
import Player from "./Player";
import Ground from "./Ground";
import createImage from "./tools";
import groundImg from "/assets/img/platform.png";
import platformImg from "/assets/img/platformSmallTall.png";
import hillsImg from "/assets/img/background.png";
import backgroundImg from "/assets/img/background.png";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
})
addEventListener('dblclick', ()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

// Variables
const sizeGame = 2000
const gravity = 1
let distance = 0

// Textures
const hillsTexture = createImage(hillsImg)
const backgroundTexture = createImage(backgroundImg)

// Objects
const player = new Player(ctx, gravity)
const platforms = [
  new Platform(ctx, 400, 200, createImage(platformImg)),
  new Platform(ctx, 400 + createImage(platformImg).width - 3, 200, createImage(platformImg)),
  new Platform(ctx, 800, 300, createImage(platformImg)),
  new Platform(ctx, 1200, 400, createImage(platformImg)),
  new Platform(ctx, 1600, 500, createImage(platformImg)),
  new Platform(ctx, 2000, 600, createImage(platformImg)),
]
const ground = new Ground(ctx, 0, canvas.height - createImage(groundImg).height, createImage(groundImg))

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  if (keys.right.pressed && player.position.x < (canvas.width / 2) - player.width) {
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0
    if (keys.right.pressed && distance < sizeGame) {
      distance += 5
      platforms.forEach((platform, i) => {
        platform.pos.x -= 5
      })
      ground.pos.x -= 5
    } else if (keys.left.pressed && distance >= 5 && player.position.x > 0) {
      distance -= 5
      platforms.forEach((platform) => {
        platform.pos.x += 5
      })
      ground.pos.x += 5
    }
  }
  // collision detection player and platforms
  platforms.forEach((platform) => {
    platform.draw()
    if (player.position.y + player.height <= platform.pos.y && player.position.y + player.height + player.velocity.y >= platform.pos.y && player.position.x + player.width >= platform.pos.x && player.position.x <= platform.pos.x + platform.size.w) {
      player.velocity.y = 0
    }
  })

  // collision detection player and ground
  ground.draw()
  if (player.position.y + player.height <= ground.pos.y && player.position.y + player.height + player.velocity.y >= ground.pos.y && player.position.x + player.width >= ground.pos.x && player.position.x <= ground.pos.x + ground.size.w) {
    player.velocity.y = 0
  }
  player.update()
}
animate()

// keyboard controller
addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 37: case 65: // left
      keys.left.pressed = true
      break;
    case 39: case 68: // right
      keys.right.pressed = true
      break;
    case 38: case 87: // up
      player.velocity.y -= 20
      break;
    case 40: case 83: // down
      player.velocity.y += 20
      break;
    default:
      break;
  }
})

addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 37: case 65: // left
      keys.left.pressed = false
      break;
    case 39: case 68: // right 
      keys.right.pressed = false
      break;
    case 38: case 87: // up
      player.velocity.y = 0
      break;
    case 40: case 83: // down
      player.velocity.y = 0
      break;
    default:
      break;
  }
})