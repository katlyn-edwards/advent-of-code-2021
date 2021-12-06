var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var day6;
(function (day6) {
    var input = "3,4,3,1,2";
    function oneDay(school) {
        var newSchool = [];
        for (var _i = 0, school_1 = school; _i < school_1.length; _i++) {
            var fish = school_1[_i];
            if (fish.timer == 0) {
                fish.timer = 6;
                var newFish = { timer: 8 };
                newSchool.push(newFish);
            }
            else {
                fish.timer = fish.timer - 1;
            }
        }
        return __spreadArray(__spreadArray([], newSchool, true), school, true);
    }
    function printSchool(school) {
        var str = '';
        for (var _i = 0, school_2 = school; _i < school_2.length; _i++) {
            var fish = school_2[_i];
            str += fish.timer + ',';
        }
        console.log(str);
    }
    function partOne() {
        var school = input.split(',').map(function (el) { return { timer: Number(el) }; });
        for (var i = 0; i < 80; i++) {
            school = oneDay(school);
        }
        console.log("Part one: ".concat(school.length));
    }
    partOne();
    function partTwoOneDay(counters) {
        var newFish = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < counters.length; i++) {
            var numFish = counters[i];
            if (i == 0) {
                newFish[8] = numFish;
                newFish[6] += numFish;
            }
            else {
                newFish[i - 1] += numFish;
            }
        }
        return newFish;
    }
    function partTwo() {
        var school = input.split(',').map(function (el) { return { timer: Number(el) }; });
        var counters = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var _i = 0, school_3 = school; _i < school_3.length; _i++) {
            var fish = school_3[_i];
            counters[fish.timer]++;
        }
        for (var i = 0; i < 256; i++) {
            counters = partTwoOneDay(counters);
        }
        var result = counters.reduce(function (prev, curr) { return prev + curr; }, 0);
        console.log("Part two: ".concat(result));
    }
    partTwo();
})(day6 || (day6 = {}));
//# sourceMappingURL=day6.js.map