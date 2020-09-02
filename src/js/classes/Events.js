const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

export default class Events {
  static setEvents() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT) {
        // this.platform.start(e.keyCode);
      }
      if (e.keyCode === KEYS.SPACE) {
        // this.platform.fire();
      }
    });

    window.addEventListener("keyup", e => {
      // this.platform.stop();
    });
  }
}