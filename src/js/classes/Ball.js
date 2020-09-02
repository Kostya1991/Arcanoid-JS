import GameObject from "./GameObject";

export default class Ball extends GameObject {
  constructor(size, frame, dy, render, game) {
    super(320, 280, 20, 20, 3, 0);

    this.size = size;
    this.frame = frame;
    this.dy = dy;
    this.render = render;
    this.game = game;
  }

  start() {
    this.dy -= this.velocity;
    this.dx = this.random(-this.velocity, this.velocity);

    setInterval(() => {
      ++this.frame;

      if(this.frame > 3) {
        this.frame = 0;
      }
    }, 100);
  }

  move() {
    if (this.dy) {
      this.y += this.dy;
    }
    if (this.dx) {
      this.x += this.dx;
    }
  }

  collied(block) {
    const x = this.x + this.dx;
    const y = this.y + this.dy;
    
    if (
      x + this.width > block.x && 
      x < block.x + block.width &&
      y + this.height > block.y &&
      y < block.y + block.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  bumbBlock(block) {
    this.dy *= -1;
    block.active = false;
  }

  bumbPlatform(platform) {
    if (platform.dx) {
      this.x += platform.dx;
    }

    if (this.dy < 0) {
      return;
    }

    this.dy = -this.velocity;
    const touchX = this.x + this.width / 2;
    this.dx = this.velocity * platform.getTouchOffset(touchX);
  }

  colliedWorldBounds(sounds) {
    const x = this.x + this.dx;
    const y = this.y + this.dy;

    if (x < 0) {
      this.x = 0;
      this.dx = this.velocity;
      sounds.bump.play();
    } else if (x + this.width > this.render.width) {
      this.x = this.render.width - this.width;
      this.dx = -this.velocity;
      sounds.bump.play();
    } else if (y < 0) {
      this.y = 0;
      this.dy = this.velocity;
      sounds.bump.play();
    } else if (y + this.height > this.render.height) {
      this.game.running = false;
      this.game.end('Вы проиграли!');
    }
  }
}