import { readInputFromFile } from '../inputReader/inputReader.js';
import Graph from 'node-dijkstra';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(row => row.split('').map(singleChar => getHeightCode(singleChar)));

const neighborCoords = [[-1, 0], [0, 1], [1, 0], [0, -1],];
let S = null;
let E = null;
let startingPointCandidates = [];

const route = new Graph();

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        const currentNodeValue = input[i][j];
        let neighbors = {};

        neighborCoords.forEach(neighbor => {
            let rowToCheck = i + neighbor[0];
            let colToCheck = j + neighbor[1];
            if (0 <= rowToCheck && rowToCheck < input.length &&
                0 <= colToCheck && colToCheck < input[i].length) {
                const neighborCandidate = input[rowToCheck][colToCheck];
                if (neighborCandidate - currentNodeValue <= 1) {
                    neighbors[`${rowToCheck}-${colToCheck}`] = 1;
                }
            }
        });

        route.addNode(`${i}-${j}`, neighbors);

        if (currentNodeValue === 0) S = `${i}-${j}`;
        if (currentNodeValue === 27) E = `${i}-${j}`;
        if (currentNodeValue === 0 || currentNodeValue === 1) startingPointCandidates.push(`${i}-${j}`);
    }
}

console.log(route.path(S, E).length - 1);
// 394 correct

let shortestPath = Infinity;

startingPointCandidates.forEach(startingPointCandidate => {
    let path = route.path(startingPointCandidate, E);
    if (path) {
        let pathLength = path.length - 1;
        if (pathLength < shortestPath) shortestPath = pathLength;
    }
});

console.log(shortestPath);
// 388 correct


/* Helper function */

function getHeightCode(inputChar) {
    if (inputChar == inputChar.toLowerCase()) {
        return inputChar.charCodeAt(0) - 96;
    } else {
        return inputChar === 'S' ? 0 : 27;
    }
}