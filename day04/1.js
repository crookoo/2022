import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(pair => pair.split(',').map(range => range.split('-').map(limit => parseInt(limit))));

let fullOverlaps = 0;
let notOverlapping = 0;

input.forEach(pair => {
    const elveOneStart = pair[0][0];
    const elveOneEnd = pair[0][1];
    const elveTwoStart = pair[1][0];
    const elveTwoEnd = pair[1][1];

    if ((elveOneStart <= elveTwoStart && elveOneEnd >= elveTwoEnd) ||
        (elveTwoStart <= elveOneStart && elveTwoEnd >= elveOneEnd)) {
        fullOverlaps++;
    }

    if (elveOneEnd < elveTwoStart || elveTwoEnd < elveOneStart) {
        notOverlapping++;
    }
});

console.log(fullOverlaps);
// 500 correct

console.log(input.length - notOverlapping);
// 815 correct