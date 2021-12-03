import { EPIPE } from "constants";

namespace day3 {
    const input = `00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010`;
    const inputArr = input.split(`\n`).map(line => line.trim());

    function partOne() {
        let gammaStr = '';
        let epsilonStr = '';
        for (let j = 0; j < inputArr[0].length; j++) {
            const ret = getMaxMin(inputArr, j);
            gammaStr += ret.most;
            epsilonStr += ret.least;
        }
        const gamma = parseInt(gammaStr, 2);
        const epsilon = parseInt(epsilonStr, 2);
        console.log(`Part one: ${gamma * epsilon}`);
    }
    partOne();

    function partTwo() {
        let oxygen = inputArr.slice();
        let c02 = inputArr.slice();
        let index = 0;
        while (oxygen.length > 1) {
            const ret = getMaxMin(oxygen, index);
            const compare = ret.equal ? '1' : ret.most;
            oxygen = oxygen.filter(el => {
                return el[index] == compare;
            });
            index++;
        }
        index = 0;
        while (c02.length > 1) {
            const ret = getMaxMin(c02, index);
            const compare = ret.equal ? '0' : ret.least;
            c02 = c02.filter(el => {
                return el[index] == compare;
            });
            index++;
        }
        console.log(`Part two: ${parseInt(oxygen[0], 2) * parseInt(c02[0], 2)}`);
    }
    partTwo();

    function getMaxMin(input: string[], index:  number): {most: string, least: string, equal: boolean} {
        let ones = 0;
            let zeros = 0;
            for (let i = 0; i < input.length; i++) {
                let line = input[i];
                let char = line[index];
                if (char == '0') {
                    zeros++;
                } else if (char == '1') {
                    ones++;
                }
            }
            const most = ones > zeros ? '1' : '0';
            const least = ones < zeros ? '1' : '0';
            const equal = most == least;
            return {most, least, equal}
    }
}