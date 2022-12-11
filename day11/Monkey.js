export default class Monkey {

    constructor(rawInput) {
        const input = rawInput.split('\n').map(row => row.trim());

        this.index = parseInt(input[0].slice(-2, -1));
        this.items = input[1].slice(16).split(', ').map(string => parseInt(string));
        this.operation = input[2].slice(21).split(' ');
        this.testDivisor = parseInt(input[3].split(' ').pop());
        this.trueMonkey = parseInt(input[4].slice(-1));
        this.falseMonkey = parseInt(input[5].slice(-1));

        this.inspections = 0;
        this.DIVISOR = 3;
    }

    performRound() {
        this.inspections++;
        let item = this.items.shift();
        item = this.performCalculation(item);
        item = Math.floor(item / this.DIVISOR);
        let monkeyIndexTo = item % this.testDivisor === 0 ? this.trueMonkey : this.falseMonkey;
        return { item, monkeyIndexTo };
    }

    performCalculation(item) {
        if (isNaN(this.operation[1])) {
            return item * item;
        } else {
            if (this.operation[0] === '+') {
                return item + parseInt(this.operation[1]);
            } else {
                return item * parseInt(this.operation[1]);
            }
        }
    }
}