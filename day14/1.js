import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);

let abyss = -1;
let leftCorner = Infinity;
let rightCorner = -Infinity;

const input = rawInput
    .split('\n')
    .map(path => path.split(' -> ')
        .map(coords => coords.split(',')
            .map((stringNumber, index) => {
                let intValue = parseInt(stringNumber)
                if (index === 0) {  // col
                    const shiftValue = intValue - 500;
                    if (shiftValue < leftCorner) leftCorner = shiftValue;
                    if (shiftValue > rightCorner) rightCorner = shiftValue;
                    return shiftValue;
                } else {            // row
                    if (intValue > abyss) abyss = intValue;
                    return intValue;
                }
            })
        )
    );

let rocks = new Set();

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length - 1; j++) {
        const startCol = input[i][j][0];
        const startRow = input[i][j][1];
        const endCol = input[i][j + 1][0];
        const endRow = input[i][j + 1][1];

        if (startCol === endCol) {
            const smallerValue = startRow < endRow ? startRow : endRow;
            const steps = Math.abs(endRow - startRow);
            for (let k = smallerValue; k <= smallerValue + steps; k++) {
                rocks.add(`${startCol}|${k}`);
            }
        } else if (startRow === endRow) {
            const smallerValue = startCol < endCol ? startCol : endCol;
            const steps = Math.abs(endCol - startCol);
            for (let k = smallerValue; k <= smallerValue + steps; k++) {
                rocks.add(`${k}|${startRow}`)
            }
        }

    }
}

let sandCount = 0;
let fallenDepth = 0;

while (!rocks.has('0|0')) {
    let sand = [0, 0];
    while (move(sand)) {
        if (fallenDepth === abyss) {
            console.log(sandCount);
            // 719 correct
        }
    }
}

console.log(sandCount);
// 23390 correct


function move(sandArray) {
    let col = sandArray[0];
    let row = sandArray[1];

    if (rocks.has(`${col}|${row + 1}`) || floorReached(row)) {
        if (rocks.has(`${col - 1}|${row + 1}`) || floorReached(row)) {
            if (rocks.has(`${col + 1}|${row + 1}`) || floorReached(row)) {
                rocks.add(`${col}|${row}`);
                sandCount++;
                return false;
            } else {
                sandArray[0] = col + 1;
            }
        } else {
            sandArray[0] = col - 1;
        }
    }
    sandArray[1] = row + 1;
    fallenDepth = sandArray[1] > fallenDepth ? sandArray[1] : fallenDepth;
    return true;
}

function floorReached(currentRow) {
    return currentRow + 1 === abyss + 2 ? true : false;
}