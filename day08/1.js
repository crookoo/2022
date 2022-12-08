import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(row => row.split('').map(char => parseInt(char)));

const N = input.length;
const neighborCoords = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

let sumVisibleTrees = (N - 1) * 4;
let highestSceningScore = 0;

for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
        if (checkIfTreeVisible(i, j)) {
            sumVisibleTrees++
        };

        let currentTreeSceningScore = getTreeSceningScore(i, j);
        if (currentTreeSceningScore > highestSceningScore) {
            highestSceningScore = currentTreeSceningScore;
        }
    }
}

console.log(sumVisibleTrees);
// 1703 correct

console.log(highestSceningScore);
// 496650 correct


function checkIfTreeVisible(i, j) {
    let visibleSidesAssumption = 4;

    for (let k = 0; k < neighborCoords.length; k++) {
        let iSign = neighborCoords[k][0];
        let jSign = neighborCoords[k][1];
        let viewingDistance = 1;
        let nextRowToCheck = calculateNextCoord(i, iSign, viewingDistance);
        let nextColToCheck = calculateNextCoord(j, jSign, viewingDistance);

        while (
            0 <= nextRowToCheck &&
            nextRowToCheck <= N - 1 &&
            0 <= nextColToCheck &&
            nextColToCheck <= N - 1
        ) {
            if (input[nextRowToCheck][nextColToCheck] >= input[i][j]) {
                visibleSidesAssumption--;
                break;
            }
            viewingDistance++;
            nextRowToCheck = calculateNextCoord(i, iSign, viewingDistance);
            nextColToCheck = calculateNextCoord(j, jSign, viewingDistance);
        }
    }
    return visibleSidesAssumption === 0 ? false : true;
}

function getTreeSceningScore(i, j) {
    let sceningScore = 1;
    
    for (let k = 0; k < neighborCoords.length; k++) {
        let iSign = neighborCoords[k][0];
        let jSign = neighborCoords[k][1];
        let viewingDistance = 1;
        let nextRowToCheck = calculateNextCoord(i, iSign, viewingDistance);
        let nextColToCheck = calculateNextCoord(j, jSign, viewingDistance);

        while (
            0 <= nextRowToCheck &&
            nextRowToCheck <= N - 1 &&
            0 <= nextColToCheck &&
            nextColToCheck <= N - 1
        ) {
            viewingDistance++;
            if (input[nextRowToCheck][nextColToCheck] >= input[i][j]) {
                break;
            }
            nextRowToCheck = calculateNextCoord(i, iSign, viewingDistance);
            nextColToCheck = calculateNextCoord(j, jSign, viewingDistance);
        }
        sceningScore *= (viewingDistance - 1);
    }
    return sceningScore;
}

function calculateNextCoord(startCoord, sign, multiplier) {
    return startCoord + sign * multiplier;
}