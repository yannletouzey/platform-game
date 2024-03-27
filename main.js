import Platform from "./Platform";
import keys from "./keys";
import Player from "./Player";
import Ground from "./Ground";
import Background from "./Background";
import Hill from "./Hill";
import createImage from "./tools";
import groundImg from "/assets/img/platform.png";
import platformImg from "/assets/img/platformSmallTall.png";
import hillsImg1 from "/assets/img/hills1.png";
import hillsImg2 from "/assets/img/hills2.png";
import hillsImg3 from "/assets/img/hills3.png";
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
const gravity = .9
let distance = 0

// Objects
const player = new Player(ctx, gravity)
const background = new Background(ctx, 0, 0, createImage(backgroundImg))

const platforms = [
  new Platform(ctx, 400, 200, createImage(platformImg)),
  new Platform(ctx, 400 + createImage(platformImg).width, 200, createImage(platformImg)),
  new Platform(ctx, 800, 300, createImage(platformImg)),
  new Platform(ctx, 1200, 400, createImage(platformImg)),
  new Platform(ctx, 1600, 500, createImage(platformImg)),
  new Platform(ctx, 2000, 600, createImage(platformImg)),
]

const grounds = [
  new Ground(ctx, 0, canvas.height - createImage(groundImg).height, createImage(groundImg)),
  new Ground(ctx, createImage(groundImg).width - 1, canvas.height - createImage(groundImg).height, createImage(groundImg))
]

const hills = [
  new Hill(ctx, innerWidth - (createImage(hillsImg2).width * 1.5), innerHeight - (createImage(hillsImg2).height * 1.5), createImage(hillsImg2).width * 1.5, createImage(hillsImg2).height * 1.5, createImage(hillsImg2)),
  new Hill(ctx, 500, innerHeight - (createImage(hillsImg3).height * 1.2), createImage(hillsImg3).width * 1.2, createImage(hillsImg3).height * 1.2, createImage(hillsImg3)),
  new Hill(ctx, 50, innerHeight - createImage(hillsImg1).height, createImage(hillsImg1).width, createImage(hillsImg1).height, createImage(hillsImg1)),
]

// Animation Render
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  background.draw()
  hills.forEach((hill) => hill.draw())
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
      grounds.forEach((ground, i) => {
        ground.pos.x -= 5
      })
      background.pos.x -= 0.5
      hills[0].pos.x -= 0.5
      hills[1].pos.x -= 1
      hills[2].pos.x -= 2
    } else if (keys.left.pressed && distance >= 5 && player.position.x > 0) {
      distance -= 5
      platforms.forEach((platform) => {
        platform.pos.x += 5
      })
      grounds.forEach((ground) => {
        ground.pos.x += 5
      })
      background.pos.x += 0.5
      hills[0].pos.x += 0.5
      hills[1].pos.x += 1
      hills[2].pos.x += 2
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
  grounds.forEach((ground) => {
    ground.draw()
    if (player.position.y + player.height <= ground.pos.y && player.position.y + player.height + player.velocity.y >= ground.pos.y && player.position.x + player.width >= ground.pos.x && player.position.x <= ground.pos.x + ground.size.w) {
      player.velocity.y = 0
    }
  })
  player.update()
}
onload = () => {
  animate()
}

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