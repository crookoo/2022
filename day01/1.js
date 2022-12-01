import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n\n')
    .map(chunk => chunk.split('\n').map(rawNumber => parseInt(rawNumber)));

let mostCalories = 0;
let calorySums = [];

input.forEach(element => {
    const currentSum = element.reduce((total, current) => total + current);
    if (currentSum > mostCalories) mostCalories = currentSum;
    calorySums.push(currentSum);
});

console.log(mostCalories);
// 67450 correct

calorySums.sort((x, y) => y - x);
console.log(calorySums[0] + calorySums[1] + calorySums[2]);
// 199357 correct