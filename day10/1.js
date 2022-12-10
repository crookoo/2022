import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(row => row.split(' ').map(char => isNaN(char) ? char : parseInt(char)));


console.log(getSolutionPartOne(input));
// 13220 correct

console.log(getSolutionPartTwo(input));
// RUAKHBEK correct


function getSolutionPartOne(programInput) {
    let sumSignalStrength = 0;
    let X = 1;
    let cycles = 0;

    for (let i = 0; i < programInput.length; i++) {
        cycles++; // Start
        sumSignalStrength += getSignalStrength(cycles, X);

        if (programInput[i][0] === 'addx') {
            cycles++; // During
            sumSignalStrength += getSignalStrength(cycles, X);
            X += programInput[i][1]; // After
        }
    }

    return sumSignalStrength;
}

function getSignalStrength(cycle, currentXValue) {
    return ((cycle - 20) % 40) === 0 ? currentXValue * cycle : 0;
}

function getSolutionPartTwo(programInput) {
    let resultString = '';
    let X = 1;
    let cycles = 0;

    for (let i = 0; i < programInput.length; i++) {
        let colIndex = cycles % 40;
        cycles++;
        resultString += getPixel(colIndex, X);

        if (programInput[i][0] === 'addx') {
            colIndex = cycles % 40;
            cycles++;
            resultString += getPixel(colIndex, X);
            X += programInput[i][1];
        }
    }

    return resultString;
}

function getPixel(colIndex, currentXValue) {
    let pixelString = colIndex >= currentXValue - 1 && colIndex <= currentXValue + 1 ? '#' : '.'
    if (colIndex == 39) pixelString += '\n';
    return pixelString;
}
