export default class Events {
  constructor() {

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

    window.addEventListener("keyup", () => {
      this.platform.stop();
    });
  }
}