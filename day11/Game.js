import Monkey from './Monkey.js';

export default class Game {

    constructor(rawInput) {
        const input = rawInput.split('\n\n').map(block => block.split('\n').map(row => row.trim()));

        this.monkeyList = new Map();
        input.forEach((monkeyInput, index) => this.monkeyList.set(index, new Monkey(monkeyInput)));

        // first attempt to optimize runtime in part 2: 
        // let items stay in the same array and work with pointers
        this.itemList = new Array();
        input.forEach((monkeyInput, index) => {
            let items = monkeyInput[1].slice(16).split(', ').map(string => parseInt(string));
            items.forEach(item => {
                let itemIndex = this.itemList.length;
                this.itemList.push(item);
                this.monkeyList.get(index).items.push(itemIndex);
            });
        });

        // second attempt: use least common multiple of test divisors
        this.leastCommonMultiple = 1;
        this.monkeyList.forEach(monkey => this.leastCommonMultiple *= monkey.testDivisor);
    }

    play(rounds, relief) {
        for (let i = 0; i < rounds; i++) {
            this.monkeyList.forEach(monkey => {
                while (monkey.items.length > 0) {
                    let { itemIndex, monkeyIndexTo } = relief ?
                        monkey.performRound(this.itemList) :
                        monkey.performRound(this.itemList, this.leastCommonMultiple);
                    this.monkeyList.get(monkeyIndexTo).items.push(itemIndex);
                }
            });
        }
    }

    printItems() {
        this.monkeyList.forEach(monkey => console.log(monkey.items));
    }

    printInspections() {
        this.monkeyList.forEach(monkey => console.log(monkey.inspections));
    }

    getMonkeyBusiness() {
        let monkeyInspections = new Array();
        this.monkeyList.forEach(monkey => {
            monkeyInspections.push(monkey.inspections);
        });
        monkeyInspections.sort((a, b) => b - a);
        return monkeyInspections[0] * monkeyInspections[1];
    }

}