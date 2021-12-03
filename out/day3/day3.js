"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day3;
(function (day3) {
    var input = "00100\n    11110\n    10110\n    10111\n    10101\n    01111\n    00111\n    11100\n    10000\n    11001\n    00010\n    01010";
    var inputArr = input.split("\n").map(function (line) { return line.trim(); });
    function partOne() {
        var gammaStr = '';
        var epsilonStr = '';
        for (var j = 0; j < 5; j++) {
            var ret = getMaxMin(inputArr, j);
            gammaStr += ret.common;
            epsilonStr += ret.least;
        }
        var gamma = parseInt(gammaStr, 2);
        var epsilon = parseInt(epsilonStr, 2);
        console.log("Part one: ".concat(gamma * epsilon));
    }
    partOne();
    function partTwo() {
        var oxygen = inputArr.slice();
        var c02 = inputArr.slice();
        var index = 0;
        var _loop_1 = function () {
            var ret = getMaxMin(oxygen, index);
            var compare = ret.equal ? '1' : ret.common;
            oxygen = oxygen.filter(function (el) {
                return el[index] == compare;
            });
            index++;
        };
        while (oxygen.length > 1) {
            _loop_1();
        }
        index = 0;
        var _loop_2 = function () {
            var ret = getMaxMin(c02, index);
            var compare = ret.equal ? '0' : ret.least;
            c02 = c02.filter(function (el) {
                return el[index] == compare;
            });
            index++;
        };
        while (c02.length > 1) {
            _loop_2();
        }
        console.log("Part two: ".concat(parseInt(oxygen[0], 2) * parseInt(c02[0], 2)));
    }
    partTwo();
    function getMaxMin(input, index) {
        var ones = 0;
        var zeros = 0;
        for (var i = 0; i < input.length; i++) {
            var line = input[i];
            var char = line[index];
            if (char == '0') {
                zeros++;
            }
            else if (char == '1') {
                ones++;
            }
        }
        var common = ones > zeros ? '1' : '0';
        var least = ones < zeros ? '1' : '0';
        var equal = common == least;
        return { common: common, least: least, equal: equal };
    }
})(day3 || (day3 = {}));
//# sourceMappingURL=day3.js.map