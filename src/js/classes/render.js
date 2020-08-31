import Sprites from './sprites';

export default class Render extends Sprites {
  constructor() {
    super();
    this.width = 640;
    this.height = 360;
  }

  static render(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(this.sprites.background, 0, 0);
    ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    ctx.drawImage(
      this.sprites.ball, 
      this.ball.frame * this.ball.width,
      0,
      this.ball.size,
      this.ball.size,
      this.ball.x,
      this.ball.y,
      this.ball.size,
      this.ball.size
    );
    this.renderBlocks();
    ctx.fillText(`Score: ${this.score}`, 15, 340);
  }

  static renderBlocks() {
    for (const block of this.blocks) {
      if (block.active) {
        this.ctx.drawImage(this.sprites.block, block.x, block.y);
      }
    }
  }
}