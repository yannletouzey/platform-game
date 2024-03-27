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
const startButton = document.getElementById('start');
const blur = document.querySelector('.blur');

canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
})

// Variables
let sizeGame = 2000
let gravity = .9
let distance = 0

// Objects
let player = new Player(ctx, gravity)
let background = new Background(ctx, 0, 0, createImage(backgroundImg))
let platforms = []
let grounds = []
let hills = []

function init() {
  // Variables
  sizeGame = 2000
  gravity = .9
  distance = 0

  // Objects
  player = new Player(ctx, gravity)
  background = new Background(ctx, 0, 0, createImage(backgroundImg))

  platforms = [
    new Platform(ctx, 400, 200, createImage(platformImg)),
    new Platform(ctx, 400 + createImage(platformImg).width, 200, createImage(platformImg)),
    new Platform(ctx, 800, 300, createImage(platformImg)),
    new Platform(ctx, 1200, 400, createImage(platformImg)),
    new Platform(ctx, 1600, 500, createImage(platformImg)),
    new Platform(ctx, 2000, 600, createImage(platformImg)),
  ]

  grounds = [
    new Ground(ctx, 0, canvas.height - createImage(groundImg).height, createImage(groundImg)),
    new Ground(ctx, createImage(groundImg).width - 1, canvas.height - createImage(groundImg).height, createImage(groundImg))
  ]

  hills = [
    new Hill(ctx, innerWidth - (createImage(hillsImg2).width * 1.5), innerHeight - (createImage(hillsImg2).height * 1.5), createImage(hillsImg2).width * 1.5, createImage(hillsImg2).height * 1.5, createImage(hillsImg2)),
    new Hill(ctx, 500, innerHeight - (createImage(hillsImg3).height * 1.2), createImage(hillsImg3).width * 1.2, createImage(hillsImg3).height * 1.2, createImage(hillsImg3)),
    new Hill(ctx, 50, innerHeight - createImage(hillsImg1).height, createImage(hillsImg1).width, createImage(hillsImg1).height, createImage(hillsImg1)),
  ]
}

// Animation Render
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  background.draw()
  hills.forEach((hill) => hill.draw())
  if (keys.right.pressed && player.position.x < (canvas.width / 2) - player.width) {
    player.velocity.x = player.speed
  } else if ((keys.left.pressed && player.position.x > 200) || (keys.left.pressed && distance === 0 && player.position.x > 0)) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0
    if (keys.right.pressed && distance < sizeGame) {
      distance += player.speed
      platforms.forEach((platform) => {
        platform.pos.x -= player.speed
      })
      grounds.forEach((ground) => {
        ground.pos.x -= player.speed
      })
      background.pos.x -= player.speed / 10
      hills[0].pos.x -= player.speed / 10
      hills[1].pos.x -= player.speed / 3
      hills[2].pos.x -= player.speed / 2
    } else if (keys.left.pressed && distance >= 5) {
      distance -= 5
      platforms.forEach((platform) => {
        platform.pos.x += player.speed
      })
      grounds.forEach((ground) => {
        ground.pos.x += player.speed
      })
      background.pos.x += player.speed / 10
      hills[0].pos.x += player.speed / 10
      hills[1].pos.x += player.speed / 3
      hills[2].pos.x += player.speed / 2
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
  if (player.position.y > canvas.height) {
    setTimeout
    blur.style.display = 'block'
    startButton.style.display = 'block'
    player.velocity.y = 0
  } else {
    blur.style.display = 'none'
    startButton.style.display = 'none'
  }
  player.update()
}
startButton.addEventListener('click', () => {
  blur.style.display = 'none'
  startButton.style.display = 'none'
  init()
})
init()
animate()


// keyboard controller
addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 37: case 65: // left
      keys.left.pressed = true
      player.currentSprite = player.sprites.run.left
      player.currentCropWidth = player.sprites.run.cropWidth
      player.width = player.sprites.run.size.w
      break;
    case 39: case 68: // right
      keys.right.pressed = true
      player.currentSprite = player.sprites.run.right
      player.currentCropWidth = player.sprites.run.cropWidth
      player.width = player.sprites.run.size.w
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
      player.currentSprite = player.sprites.stand.left
      player.currentCropWidth = player.sprites.stand.cropWidth
      player.width = player.sprites.stand.size.w
      break;
    case 39: case 68: // right 
      keys.right.pressed = false
      player.currentSprite = player.sprites.stand.right
      player.currentCropWidth = player.sprites.stand.cropWidth
      player.width = player.sprites.stand.size.w
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