import { readInputFromFile } from '../inputReader/inputReader.js'

const rawInput = readInputFromFile('input-test', import.meta.url)
const input = rawInput
    .split('\n')
    .map(row => row.split(' '));

// Build data structure

let fileStructure = new Map();
let directoryMapping = new Map();
let currentDirectory = null;

input.forEach(line => {
    if (line[0] === '$' && line[1] === 'cd') {
        const cdParameter = line[2];
        if (cdParameter !== '..') {
            currentDirectory = cdParameter === '/' ? cdParameter : directoryMapping.get(cdParameter)[1].pop();
            fileStructure.set(currentDirectory, [[], 0]);
        }
    } else if (line[0] !== '$') {
        if (line[0] === 'dir') {
            let newValue = fileStructure.get(currentDirectory);
            newValue[0].push(getMappedDirectoryName(line[1]));
            fileStructure.set(currentDirectory, newValue);
        } else {
            let newValue = fileStructure.get(currentDirectory);
            newValue[1] += parseInt(line[0]);
            fileStructure.set(currentDirectory, newValue);
        }
    }
})

calculateFileSizeOfSubDirectories('/');

let totalSum = 0;
for (let directory of fileStructure.entries()) {
    if (directory[1][1] <= 100000) {
        totalSum += directory[1][1];
    }
}

console.log(totalSum)
// 1155352 wrong, too low; 1491614 correct

const FILESYSTEM_SPACE = 70000000;
const NEEDED_SPACE = 30000000;
const usedSpace = fileStructure.get('/')[1];
const freeSpace = FILESYSTEM_SPACE - usedSpace;
const toFreeSpace = NEEDED_SPACE - freeSpace;

let bestDirectorySpace = Infinity;

for (let directory of fileStructure.entries()) {
    const currentDirectorySpace = directory[1][1];

    if (currentDirectorySpace > toFreeSpace && currentDirectorySpace < bestDirectorySpace) {
        bestDirectorySpace = currentDirectorySpace;
    }
}

console.log(bestDirectorySpace);
// 6400111 correct


/* Functions */

function calculateFileSizeOfSubDirectories(directory) {
    const directoryValues = fileStructure.get(directory)
    const subDirectories = directoryValues[0]
    let fileSizeSum = directoryValues[1]

    if (!subDirectories.length) {
        return fileSizeSum;
    }

    for (let i = 0; i < subDirectories.length; i++) {
        fileSizeSum += calculateFileSizeOfSubDirectories(subDirectories[i])
    }
    fileStructure.set(directory, [subDirectories, fileSizeSum])

    return fileSizeSum;
}

function getMappedDirectoryName(directory) {
    if (directoryMapping.get(directory) === undefined) {
        directoryMapping.set(directory, [1, [directory + '1']]);
    } else {
        let currentOccurence = directoryMapping.get(directory)[0] + 1;
        let currentNameStack = directoryMapping.get(directory)[1];
        currentNameStack.push(`${directory}${currentOccurence}`);
        directoryMapping.set(directory, [currentOccurence, currentNameStack]);
    }
    return directory + directoryMapping.get(directory)[0];
}
