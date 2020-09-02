import Events from './Events';
import Preload from './Preload';
import Render from './Render';
import Ball from './Ball';
import Platform from './Platform';
import Game from './Game';

export default class Arcanoid {
  constructor(ctx, blocks, sprites, sounds) {
    this.ctx = ctx;
    this.blocks = blocks;
    this.sprites = sprites;
    this.sounds = sounds;
    this.game = new Game(0, true);
    this.render = new Render(640, 360, 4, 8);
    this.ball = new Ball(20, 0, 0, this.render, this.game);
    this.platform = new Platform(this.ball, this.render);
  }

  init() {
    this.ctx = document.querySelector('#canvas').getContext("2d");
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px Arial";
    Events.setEvents(this.platform);
  }

  start() {
    this.init();
    Preload.preload(this.sprites, this.sounds, () => {
      this.sprites = Preload.getSprites();
      this.sounds = Preload.getSounds();
      this.blocks = this.render.create(this.blocks);
      this.run();
    });
  }

  run() {
    if (this.game.running) {
      window.requestAnimationFrame(() => {
        this.update();
        this.render.render(this.ctx, this.platform, this.ball, this.sprites, this.blocks, this.game.score);
        this.run();
      });
    }
  }

  update() {
    this.colliedBlocks();
    this.colliedPlatform();
    this.ball.colliedWorldBounds(this.sounds);
    this.platform.colliedWorldPlatform();
    this.platform.move();
    this.ball.move();
  }

  colliedBlocks() {
    for (let block of this.blocks) {
      if (block.active && this.ball.collied(block)) {
        this.ball.bumbBlock(block);
        this.game.addScore(this.blocks);
        this.sounds.bump.play();
      }
    }
  }

  colliedPlatform() {
    if (this.ball.collied(this.platform)) {
      this.ball.bumbPlatform(this.platform);
      this.sounds.bump.play();
    }
  }
}