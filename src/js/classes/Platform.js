import GameObject from "./GameObject";

const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

export default class Platform extends GameObject {
  constructor(ball, render) {
    super(280, 300, 100, 14, 6, 0);

    this.ball = ball;
    this.render = render;
  }

  move() {
    if (this.dx) {
      this.x += this.dx;
      if (this.ball) {
        this.ball.x += this.dx;
      }
    }
  }

  start(direction) {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  }
  
  stop() {
    this.dx = 0;
  }
  
  fire() {
    if (this.ball) {
      this.ball.start();
      this.ball = null;
    }
  }

  getTouchOffset(x) {
    const diff = (this.x + this.width) - x;
    const offset = this.width - diff;
    const result = offset * 2 / this.width;
    return result - 1;
  }

  colliedWorldPlatform() {
    const x = this.x + this.dx;
    
    if (x < 0 || x + this.width > this.render.width) {
      this.dx = 0;
    }
  }
}