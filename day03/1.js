import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput.split('\n');

let prioritySum = 0;
let prioritySum2 = 0;

input.forEach(rucksack => {
    const compartmentOne = rucksack.substring(0, rucksack.length / 2).split('');
    const compartmentTwo = rucksack.substring(rucksack.length / 2, rucksack.length);

    const sameItem = compartmentOne.find(item => compartmentTwo.includes(item));
    prioritySum += getPriorityCode(sameItem);
});

console.log(prioritySum);
// 8085 correct

for (let i = 0; i < input.length; i += 3) {
    const rucksack1 = input[i].split('');
    const rucksack2 = input[i + 1];
    const rucksack3 = input[i + 2];

    const sameItems1And2 = new Set(rucksack1.filter(compareItem => rucksack2.includes(compareItem)));
    const sameItemAll3 = [...sameItems1And2].find(item => rucksack3.includes(item));
    prioritySum2 += getPriorityCode(sameItemAll3);
}

console.log(prioritySum2);
// 2515 correct

function getPriorityCode(inputChar) {
    if (inputChar == inputChar.toLowerCase()) {
        return inputChar.charCodeAt(0) - 96;
    } else {
        return inputChar.charCodeAt(0) - 38;
    }
}