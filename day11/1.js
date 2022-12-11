import { readInputFromFile } from '../inputReader/inputReader.js';
import Game from './Game.js';

const rawInput = readInputFromFile('input', import.meta.url);

let game = new Game(rawInput);
game.play(20);

console.log(game.getMonkeyBusiness());
// 107822 correct