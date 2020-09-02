import Events from './Events';
import Preload from './Preload';

export default class Arcanoid {
  constructor(ctx, running, score, blocks, sprites, sounds) {
    this.ctx = ctx;
    this.running = running;
    this.score = score;
    this.blocks = blocks;
    this.sprites = sprites;
    this.sounds = sounds;
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
      // this.create();
      // this.run();
    });
  }
}