import { readInputFromFile } from '../inputReader/inputReader.js';
import Game from './Game.js';

const rawInput = readInputFromFile('input', import.meta.url);

let game1 = new Game(rawInput);
game1.play(20, true);
console.log(game1.getMonkeyBusiness());
// 107822 correct

let game2 = new Game(rawInput);
game2.play(10000, false);
console.log(game2.getMonkeyBusiness());
// 27267163742 correct