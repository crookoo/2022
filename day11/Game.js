import Monkey from './Monkey.js';

export default class Game {

    constructor(rawInput) {
        const input = rawInput.split('\n\n');

        this.monkeyList = new Map();
        input.forEach((monkeyInput, index) => this.monkeyList.set(index, new Monkey(monkeyInput)));
    }

    play(rounds, worryLevelDivision) {
        for (let i = 0; i < rounds; i++) {
            this.monkeyList.forEach(monkey => {
                while (monkey.items.length > 0) {
                    let { item, monkeyIndexTo } = monkey.performRound(worryLevelDivision);
                    this.monkeyList.get(monkeyIndexTo).items.push(item);
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
        monkeyInspections.sort((a,b) => b - a);
        return monkeyInspections[0] * monkeyInspections[1];
    }

}