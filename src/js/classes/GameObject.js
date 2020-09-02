export default class GameObject {
  constructor(x, y, width, height, velocity, dx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.dx = dx;
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}