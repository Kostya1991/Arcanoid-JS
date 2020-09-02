export default class Preload {
  constructor() {
    this.sprites = null;
    this.sounds - null;
  }

  static preload(sprites, sounds, callback) {
    let loaded = 0;
    let required = Object.keys(sprites).length;
    required += Object.keys(sounds).length;

    let onResourseLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callback();
      }
    }

    this.preloadSprites(sprites,onResourseLoad);
    this.preloadSounds(sounds, onResourseLoad);
  }

  static preloadSprites(sprites, callBack) {
    const spritesImg = Object.assign({}, sprites);
    for (let key in sprites) {
      sprites[key] = new Image();
      sprites[key].src = spritesImg[key];
      sprites[key].addEventListener("load", callBack);
    }
    this.sprites = sprites;
  }

  static preloadSounds(sounds, callBack) {
    for (let key in sounds) {
      sounds[key] = new Audio(sounds[key]);
      sounds[key].addEventListener("canplaythrough", callBack, {once: true});
    }
    this.sounds = sounds;
  }

  static getSprites() {
    return this.sprites;
  }

  static getSounds() {
    return this.sounds;
  }
}