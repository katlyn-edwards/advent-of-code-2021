var day7;
(function (day7) {
    var input = "16,1,2,0,4,2,7,1,2,14";
    var nums = input.split(',').map(function (el) { return Number(el); });
    var sorted = nums.slice().sort(function (a, b) { return a - b; });
    var middleIndex = nums.length / 2;
    var medianIndex = Math.round(middleIndex);
    var linearAlignment = sorted[medianIndex];
    var sum = nums.reduce(function (prev, cur) {
        return prev + cur;
    }, 0);
    console.log("Unrounded average: ".concat(sum / nums.length));
    var average = Math.round(sum / nums.length);
    function calcFuel() {
        var fuel = 0;
        for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
            var num = nums_1[_i];
            fuel += Math.abs(num - linearAlignment);
        }
        return fuel;
    }
    function factorialButNot(num) {
        if (num === 0) {
            return 0;
        }
        else {
            return num + factorialButNot(num - 1);
        }
    }
    function calcFuelIncreasingUsingAverage() {
        var fuel = 0;
        for (var _i = 0, nums_2 = nums; _i < nums_2.length; _i++) {
            var num = nums_2[_i];
            fuel += factorialButNot(Math.abs(num - average));
        }
        return fuel;
    }
    function calcFuelIncreasingUsingBruteForce(location) {
        var fuel = 0;
        for (var _i = 0, nums_3 = nums; _i < nums_3.length; _i++) {
            var num = nums_3[_i];
            fuel += factorialButNot(Math.abs(num - location));
        }
        return fuel;
    }
    function partOne() {
        var fuel = calcFuel();
        console.log("Part one: ".concat(linearAlignment, ", ").concat(fuel));
    }
    partOne();
    function partTwo() {
        // This didn't work???
        var averageFuel = calcFuelIncreasingUsingAverage();
        console.log("Part two (WRONG): ".concat(average, " ").concat(averageFuel));
        // Brute force method.
        var arr = [];
        for (var i = 0; i <= sorted[sorted.length - 1]; i++) {
            arr.push(calcFuelIncreasingUsingBruteForce(i));
        }
        var index = 0;
        var min = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                index = i;
                min = arr[i];
            }
        }
        console.log("Part two: ".concat(index, " ").concat(min));
    }
    partTwo();
})(day7 || (day7 = {}));
//# sourceMappingURL=day7.js.map