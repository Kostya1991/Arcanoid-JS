import '../scss/style.scss';

import Arcanoid from './classes/arcanoid';

import background from '../assets/img/background.png';
import ball from '../assets/img/ball.png';
import block from '../assets/img/block.png';
import platform from '../assets/img/platform.png';
import bump from '../assets/sounds/bump.mp3';

//********************** переменные ************************/

const images = {
  background,
  ball,
  block,
  platform
};

const sounds = {
  bump
};

const arcanoid = new Arcanoid(null, true, 0, [], images, sounds);

//************************* старт игры ***********************/

window.addEventListener("load", () => {
  arcanoid.start();
});