export default class Game {
  constructor(score, running) {
    this.score = score;
    this.running = running;
  }

  end(message) {
    document.querySelector('#game-over').style.display = 'block';
    document.querySelector('#game-over #game-over-title h3').innerHTML = message;
    document.querySelector('#refresh-game').onclick = () => {
      location.reload();
    }
  }

  addScore(blocks) {
    ++this.score;
    if (this.score >= blocks.length) {
      this.running = false;
      this.end('Вы выиграли!');
    }
  }
}