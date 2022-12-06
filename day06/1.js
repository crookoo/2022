import { readInputFromFile } from '../inputReader/inputReader.js';

const input = readInputFromFile('input', import.meta.url);

let startOfPackEndLetterIndex = 0;

for (let i = 0; i < input.length; i++) {
    if ((input[i] !== input[i + 1]) && (input[i] !== input[i + 2]) && (input[i] !== input[i + 3]) &&
        (input[i + 1] !== input[i + 2]) && (input[i + 1] !== input[i + 3]) &&
        (input[i + 2] !== input[i + 3])) {
        startOfPackEndLetterIndex = i + 3 + 1;
        break;
    }
}

console.log(startOfPackEndLetterIndex);
// 1034 correct

const SLIDING_WINDOW_PART_TWO = 14;
let startOfMessageEndLetterIndex = 0;

for (let i = 0; i < input.length; i++) {
    const slidingWindowPartTwo = input.slice(i, i + SLIDING_WINDOW_PART_TWO);
    const comparisonSetPartTwo = new Set([...slidingWindowPartTwo]);
    if (comparisonSetPartTwo.size === SLIDING_WINDOW_PART_TWO) {
        startOfMessageEndLetterIndex = i + SLIDING_WINDOW_PART_TWO;
        break;
    }
}

console.log(startOfMessageEndLetterIndex);
// 2472 correct