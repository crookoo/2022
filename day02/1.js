import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(round => round.split(' '));

let totalScorePartOne = 0;
let totalScorePartTwo = 0;

input.forEach((round) => {
    switch (round[0]) {
        case 'A':               // Rock
            switch (round[1]) {
                case 'X':       // Rock | lose: Scissors
                    totalScorePartOne += 3 + 1;
                    totalScorePartTwo += 0 + 3;
                    break;
                case 'Y':       // Paper | draw: Rock
                    totalScorePartOne += 6 + 2;
                    totalScorePartTwo += 3 + 1;
                    break;
                case 'Z':       // Scissors | win: Paper
                    totalScorePartOne += 0 + 3;
                    totalScorePartTwo += 6 + 2;
            }
            break;
        case 'B':               // Paper
            switch (round[1]) {
                case 'X':       // Rock | lose: Rock
                    totalScorePartOne += 0 + 1;
                    totalScorePartTwo += 0 + 1;
                    break;
                case 'Y':       // Paper | draw: Paper
                    totalScorePartOne += 3 + 2;
                    totalScorePartTwo += 3 + 2;
                    break;
                case 'Z':       // Scissors | win: Scissors
                    totalScorePartOne += 6 + 3;
                    totalScorePartTwo += 6 + 3;
            }
            break;
        case 'C':               // Scissors
            switch (round[1]) {
                case 'X':       // Rock | lose: Paper
                    totalScorePartOne += 6 + 1;
                    totalScorePartTwo += 0 + 2;
                    break;
                case 'Y':       // Paper | draw: Scissors
                    totalScorePartOne += 0 + 2;
                    totalScorePartTwo += 3 + 3;
                    break;
                case 'Z':       // Scissors | win: Rock
                    totalScorePartOne += 3 + 3;
                    totalScorePartTwo += 6 + 1;
            }
    }
});

console.log(totalScorePartOne);
// 9177 correct

console.log(totalScorePartTwo);
// 12111 correct