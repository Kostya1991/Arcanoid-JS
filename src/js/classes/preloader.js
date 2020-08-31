import Sprites from './sprites';

export default class Preloader extends Sprites {
  constructor () {
    super();
  }

  static preload(callBack) {
    let loaded = 0;
    const required = Object.keys(this.sprites).length + Object.keys(this.sounds).length;

    const onResourseLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callBack();
      }
    }

    this.preloadSprites(onResourseLoad);
    this.preloadSounds(onResourseLoad);
  }

  static preloadSprites(callBack) {
    for (const key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `assets/img/${key}.png`;
      this.sprites[key].addEventListener("load", callBack);
    }
  }

  static preloadSounds(callBack) {
    for (const key in this.sounds) {
      this.sounds[key] = new Audio(`assets/sounds/${key}.mp3`);
      this.sounds[key].addEventListener("canplaythrough", callBack, {once: true});
    }
  }
}