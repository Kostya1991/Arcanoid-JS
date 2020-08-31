import Events from './events';
import Preloader from './preloader';
import Sprites from './sprites';

export default class Arcanoid extends Sprites {
  constructor() {
    super();
    this.ctx = null;
    this.rows = 4;
    this.cols = 8;
    this.running = true;
    this.score = 0;
  }

  static init() {
    this.ctx = document.querySelector('#canvas').getContext("2d");
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px Arial";
    Events.setEvents();
  }

  static start() {
    this.init();
    Preloader.preload(() => {
      this.create();
      this.run();
    });
  }

  static create() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 64 * col + 65,
          y: 24 * row,
          width: 60,
          height: 20,
          active: true
        });
      }
    }
  }

  static update() {
    this.colliedBlocks();
    this.colliedPlatform();
    this.ball.colliedWorldBounds();
    this.platform.colliedWorldPlatform();
    this.platform.move();
    this.ball.move();
  }

  static colliedBlocks() {
    for (let block of this.blocks) {
      if (block.active && this.ball.collied(block)) {
        this.ball.bumbBlock(block);
        this.addScore();
        this.sounds.bump.play();
      }
    }
  }

  static addScore() {
    ++this.score;
    if (this.score >= this.blocks.length) {
      game.running = false;
      this.end('Вы выиграли!');
    }
  }

  static colliedPlatform() {
    if (this.ball.collied(this.platform)) {
      this.ball.bumbPlatform(this.platform);
      this.sounds.bump.play();
    }
  }

  static run() {
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.update();
        this.render();
        this.run();
      });
    }
  }

  static end(message) {
    document.querySelector('#game-over').style.display = 'block';
    document.querySelector('#game-over #game-over-title h3').innerHTML = message;
    document.querySelector('#refresh-game').onclick = () => {
      location.reload();
    }
  }

  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}