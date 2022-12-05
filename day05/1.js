import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n\n')
    .map(row => row.split('\n'));

const stacksPartOne = getInitialStackState(input[0]);
const stacksPartTwo = getInitialStackState(input[0]);

const instructions = input[1].map(row => row
    .split(' ')
    .filter((chunk, index) => index % 2 === 1)
    .map(stringInt => parseInt(stringInt))
);

instructions.forEach(rule => {
    const amount = rule[0];
    const from = rule[1] - 1;
    const to = rule[2] - 1;
    const tempArray = [];

    for (let i = 0; i < amount; i++) {
        const currentCratePartOne = stacksPartOne[from].pop();
        stacksPartOne[to].push(currentCratePartOne);
        
        const currentCratePartTwo = stacksPartTwo[from].pop();
        tempArray.push(currentCratePartTwo);
    }

    for (let i = 0; i < amount; i++) {
        const currentCrate = tempArray.pop();
        stacksPartTwo[to].push(currentCrate);
    }
});

let message = '';
stacksPartOne.forEach(stack => message += stack[stack.length - 1]);
console.log(message);
// RLFNRTNFB correct

message = '';
stacksPartTwo.forEach(stack => message += stack[stack.length - 1]);
console.log(message);
// MHQTLJRLB correct


function getInitialStackState(input) {
    const number_of_stacks = parseInt(input[input.length - 1].trim().slice(-1));
    const stacks = [...Array(number_of_stacks)].map(() => Array());

    for (let i = input.length - 2; i >= 0; i--) {
        const row = input[i];
        let stackIndex = 0;
        for (let j = 1; j < row.length; j++) {
            const inputChar = row[j];
            if ((j - 1) % 4 === 0) {
                if (inputChar !== ' ') {
                    stacks[stackIndex].push(inputChar);
                }
                stackIndex++;
            }
        }
    }
    return stacks;
}