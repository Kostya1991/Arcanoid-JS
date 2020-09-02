const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

export default class Events {
  static setEvents(platform) {
    window.addEventListener("keydown", e => {
      if (e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT) {
        platform.start(e.keyCode);
      }
      if (e.keyCode === KEYS.SPACE) {
        platform.fire();
      }
    });

    window.addEventListener("keyup", e => {
      platform.stop();
    });
  }
}