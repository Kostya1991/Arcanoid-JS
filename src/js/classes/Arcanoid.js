import Events from './Events';
import Preload from './Preload';
import Render from './Render';
import Ball from './Ball';
import Platform from './Platform';

export default class Arcanoid {
  constructor(ctx, running, score, blocks, sprites, sounds) {
    this.ctx = ctx;
    this.running = running;
    this.score = score;
    this.blocks = blocks;
    this.sprites = sprites;
    this.sounds = sounds;
    this.render = new Render(640, 360, 4, 8);
    this.ball = new Ball(20, 0, 0);
    this.platform = new Platform(this.ball);
  }

  init() {
    this.ctx = document.querySelector('#canvas').getContext("2d");
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px Arial";
    Events.setEvents();
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
    if (this.running) {
      window.requestAnimationFrame(() => {
        // this.update();
        this.render.render(this.ctx, this.platform, this.ball, this.sprites, this.blocks, this.score);
        // this.run();
      });
    }
  }
}