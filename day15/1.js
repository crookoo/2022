import { readInputFromFile } from '../inputReader/inputReader.js';
import { merge } from './merge.js';

const rawInput = readInputFromFile('input', import.meta.url);
const input = rawInput
    .split('\n')
    .map(row => row.split(': ').map((part, index) => {
        if (index % 2 === 0) {
            return part.slice(12).split(', y=').map(rawInteger => parseInt(rawInteger))
        } else {
            return part.slice(23).split(', y=').map(rawInteger => parseInt(rawInteger))
        }
    }));


/* Part one */

const ROW = 2000000;
const resultRowSensors = new Set();
const resultRowBeacons = new Set();
const resultRow = new Set();

input.forEach(signalAndBeacon => {
    const sensorX = signalAndBeacon[0][0];
    const sensorY = signalAndBeacon[0][1];
    const beaconX = signalAndBeacon[1][0];
    const beaconY = signalAndBeacon[1][1];
    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    if (sensorY - distance <= ROW && sensorY + distance >= ROW) {
        if (sensorY === ROW) resultRowSensors.add(sensorX);
        if (beaconY === ROW) resultRowBeacons.add(beaconX);

        const offset = distance - Math.abs(ROW - sensorY);
        for (let i = -offset; i <= offset; i++) {
            const currentX = sensorX + i;
            resultRow.add(currentX);
        }
    }
});

console.log(resultRow.size - resultRowSensors.size - resultRowBeacons.size);
// 5108096 correct


/* Part two */

let distressX = null;
let distressY = null;

for (let i = 0; i <= 4000000; i++) {
    const currentRow = i;

    let rangeCollection = [];

    input.forEach(signalAndBeacon => {
        const sensorX = signalAndBeacon[0][0];
        const sensorY = signalAndBeacon[0][1];
        const beaconX = signalAndBeacon[1][0];
        const beaconY = signalAndBeacon[1][1];
        const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

        if (sensorY - distance <= currentRow && sensorY + distance >= currentRow) {
            const offset = distance - Math.abs(currentRow - sensorY);
            rangeCollection.push([sensorX - offset, sensorX + offset]);
        }
    });

    rangeCollection = merge(rangeCollection);

    if (rangeCollection.length > 1) {
        distressX = rangeCollection[0][1] + 1;
        distressY = currentRow;
        break;
    };
}

const tuningFrequency = distressX * 4000000 + distressY;

console.log(tuningFrequency);
// 10553942650264 correct
