import { readInputFromFile } from '../inputReader/inputReader.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n\n')
    .map(pair => pair.split('\n').map(packet => JSON.parse(packet)));

let rightOrderPairs = [];
input.forEach((pair, index) => {
    if (checkOrder(pair[0], pair[1]) === -1) {
        rightOrderPairs.push(index + 1);
    }
});

console.log(rightOrderPairs.reduce((previous, current) => previous + current));
// 5003 correct

const input2 = rawInput.split('\n\n').join('\n').split('\n').map(packet => JSON.parse(packet));
input2.push([[2]]);
input2.push([[6]]);

input2.sort((a, b) => checkOrder(a, b));

let index2 = input2.findIndex(packet => packet.toString() == [[2]].toString()) + 1;
let index6 = input2.findIndex(packet => packet.toString() == [[6]].toString()) + 1;

console.log(index2 * index6);
// 20280 correct


function checkOrder(left, right) {
    const length = left.length > right.length ? left.length : right.length;

    for (let i = 0; i < length; i++) {
        if (left[i] === undefined && right[i] !== undefined) {
            return -1;
        } else if (left[i] !== undefined && right[i] === undefined) {
            return 1;
        } else {
            if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
                if (left[i] < right[i]) {
                    return -1;
                } else if (left[i] > right[i]) {
                    return 1;
                }
            } else {
                let result = null;

                if (Array.isArray(left[i]) && Array.isArray(right[i])) {
                    result = checkOrder(left[i], right[i]);

                } else if (Number.isInteger(left[i]) && Array.isArray(right[i])) {
                    result = checkOrder([left[i]], right[i]);

                } else if (Array.isArray(left[i]) && Number.isInteger(right[i])) {
                    result = checkOrder(left[i], [right[i]]);
                }

                if (result !== 0) return result; // else: continue loop
            }
        }
    }
    return 0;
}
