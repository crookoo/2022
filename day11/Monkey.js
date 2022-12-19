export default class Monkey {

    constructor(input) {
        this.index = parseInt(input[0].slice(-2, -1));
        this.items = new Array();
        this.operation = input[2].slice(21).split(' ');
        this.testDivisor = parseInt(input[3].split(' ').pop());
        this.trueMonkey = parseInt(input[4].slice(-1));
        this.falseMonkey = parseInt(input[5].slice(-1));

        this.inspections = 0;
        this.DIVISOR = 3;
    }

    performRound(itemList, leastCommonMultiple) {
        this.inspections++;
        let itemIndex = this.items.shift();
        itemList[itemIndex] = this.performCalculation(itemList[itemIndex]);
        itemList[itemIndex] = leastCommonMultiple ?
            itemList[itemIndex] % leastCommonMultiple :
            Math.floor(itemList[itemIndex] / this.DIVISOR);
        let monkeyIndexTo = itemList[itemIndex] % this.testDivisor == 0 ? this.trueMonkey : this.falseMonkey;
        return { itemIndex, monkeyIndexTo };
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