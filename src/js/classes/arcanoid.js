class Arcanoid {
  constructor() {
    this.ctx = null;
    this.rows = 4;
    this.cols = 8;
    this.width = 640;
    this.height = 360;
    this.running = true;
    this.score = 0;
    this.blocks = [];
    this.sprites = {
      background: null,
      ball: null,
      platform: null,
      block: null
    };
    this.sounds = {
      bump: null
    };
  }

  static start() {
    this.init();
    this.preload(() => {
      this.create();
      this.run();
    });
  }

  static init() {
    this.ctx = document.querySelector('#canvas').getContext("2d");
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px Arial";
    this.setEvents();
  }

  static setEvents() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT) {
        this.platform.start(e.keyCode);
      }
      if (e.keyCode === KEYS.SPACE) {
        this.platform.fire();
      }
    });

    window.addEventListener("keyup", e => {
      this.platform.stop();
    });
  }

  static preload(callBack) {
    let loaded = 0;
    let required = Object.keys(this.sprites).length;
    required += Object.keys(this.sounds).length;

    let onResourseLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callBack();
      }
    }

    this.preloadSprites(onResourseLoad);
    this.preloadSounds(onResourseLoad);
  }

  static preloadSprites(callBack) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `img/${key}.png`;
      this.sprites[key].addEventListener("load", callBack);
    }
  }

  static preloadSounds(callBack) {
    for (let key in this.sounds) {
      this.sounds[key] = new Audio(`sounds/${key}.mp3`);
      this.sounds[key].addEventListener("canplaythrough", callBack, {once: true});
    }
  }

  static render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.ctx.drawImage(
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
    this.ctx.fillText(`Score: ${this.score}`, 15, 340);
  }

  static renderBlocks() {
    for (let block of this.blocks) {
      if (block.active) {
        this.ctx.drawImage(this.sprites.block, block.x, block.y);
      }
    }
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