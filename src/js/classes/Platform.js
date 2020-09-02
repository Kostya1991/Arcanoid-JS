import GameObject from "./GameObject";

export default class Platform extends GameObject {
  constructor(ball) {
    super(280, 300, 100, 14, 6, 0);

    this.ball = ball;
  }
}