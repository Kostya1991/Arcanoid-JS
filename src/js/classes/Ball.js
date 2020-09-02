import GameObject from "./GameObject";

export default class Ball extends GameObject {
  constructor(size, frame, dy) {
    super(320, 280, 20, 20, 3, 0);

    this.size = size;
    this.frame = frame;
    this.dy = dy;
  }
}