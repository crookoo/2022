import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(row => row.split(' ').map(char => isNaN(char) ? char : parseInt(char)));

const moveMap = new Map([
    ['U', [-1, 0]],
    ['D', [1, 0]],
    ['R', [0, 1]],
    ['L', [0, -1]]
]);

let headPosition = [0, 0];
let tailPositions = new Array(9).fill([0, 0]);

let visitedPositionsPartOne = new Map();
let visitedPositionsPartTwo = new Map();

input.forEach(rule => {
    const directionsCode = moveMap.get(rule[0]);
    const steps = rule[1];

    for (let i = 1; i <= steps; i++) {
        const newHeadRow = headPosition[0] + directionsCode[0];
        const newHeadCol = headPosition[1] + directionsCode[1];
        headPosition = [newHeadRow, newHeadCol];

        let lastPosition = headPosition;
        for (let j = 0; j < tailPositions.length; j++) {
            tailPositions[j] = calculateTailPosition(lastPosition, tailPositions[j]);

            if (j === 0) visitedPositionsPartOne.set(tailPositions[j].toString());
            if (j === 8) visitedPositionsPartTwo.set(tailPositions[j].toString());

            lastPosition = tailPositions[j];
        }
    }
});

console.log(visitedPositionsPartOne.size);
// 6090 correct

console.log(visitedPositionsPartTwo.size);
// 2566 correct


function calculateTailPosition(headPosition, tailPosition) {
    const headRow = headPosition[0];
    const headCol = headPosition[1];
    let tailRow = tailPosition[0];
    let tailCol = tailPosition[1];

    let rowDistance = Math.abs(headRow - tailRow);
    let colDistance = Math.abs(headCol - tailCol);

    if (rowDistance == 2 && colDistance == 2) {
        tailRow = headRow - tailRow > 0 ? tailRow + 1 : tailRow - 1;
        tailCol = headCol - tailCol > 0 ? tailCol + 1 : tailCol - 1;
    } else if (rowDistance == 2) {
        tailRow = headRow - tailRow > 0 ? tailRow + 1 : tailRow - 1;
        tailCol = headCol;
    } else if (colDistance == 2) {
        tailRow = headRow;
        tailCol = headCol - tailCol > 0 ? tailCol + 1 : tailCol - 1;
    }

    return [tailRow, tailCol];
}