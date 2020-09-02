export default class Render {

  constructor(width, height, rows, cols) {
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
  }

  render(ctx, platform, ball, sprites, blocks, score) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(sprites.background, 0, 0);
    ctx.drawImage(sprites.platform, platform.x, platform.y);
    ctx.drawImage(
      sprites.ball, 
      ball.frame * ball.width,
      0,
      ball.size,
      ball.size,
      ball.x,
      ball.y,
      ball.size,
      ball.size
    );
    this.renderBlocks(ctx, sprites, blocks);
    ctx.fillText(`Score: ${score}`, 15, 340);
  }

  renderBlocks(ctx, sprites, blocks) {
    for (let block of blocks) {
      if (block.active) {
        ctx.drawImage(sprites.block, block.x, block.y);
      }
    }
  }

  create(blocks) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        blocks.push({
          x: 64 * col + 65,
          y: 24 * row,
          width: 60,
          height: 20,
          active: true
        });
      }
    }

    return blocks;
  }
}