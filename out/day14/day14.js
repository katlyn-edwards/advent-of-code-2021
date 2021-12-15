var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var day14;
(function (day14) {
    var input = "NNCB\n\n    CH -> B\n    HH -> N\n    CB -> H\n    NH -> C\n    HB -> C\n    HC -> B\n    HN -> C\n    NN -> C\n    BH -> H\n    NC -> B\n    NB -> B\n    BN -> B\n    BB -> N\n    BC -> B\n    CC -> N\n    CN -> C";
    var clean = input.split("\n").map(function (el) { return el.trim(); });
    var joined = clean.join('\n');
    var parts = joined.split('\n\n');
    var startCode = parts[0];
    var instructions = parts[1];
    var lines = instructions.split('\n');
    var map = new Map();
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var p = line.split(' -> ');
        map.set(p[0], p[1]);
    }
    function applyTransformations(map, start) {
        var modifications = start.split('');
        var inserted = 0;
        for (var i = 1; i < start.length; i++) {
            var pair = start[i - 1] + start[i];
            if (map.has(pair)) {
                var first = modifications.slice(0, i + inserted);
                var second = modifications.slice(i + inserted);
                modifications = __spreadArray(__spreadArray(__spreadArray([], first, true), [map.get(pair)], false), second, true);
                inserted++;
            }
        }
        return modifications;
    }
    function partOne() {
        var code = startCode;
        for (var i = 0; i < 10; i++) {
            var result = applyTransformations(map, code);
            code = result.join('');
        }
        var counts = new Map();
        var chars = code.split('');
        chars.forEach(function (char) {
            if (!counts.has(char)) {
                counts.set(char, 0);
            }
            counts.set(char, counts.get(char) + 1);
        });
        var min = Number.MAX_SAFE_INTEGER;
        var max = 0;
        counts.forEach(function (val, key) {
            if (val > max) {
                max = val;
            }
            if (val < min) {
                min = val;
            }
        });
        console.log("Part one: ".concat(max - min, " "));
    }
    partOne();
    function applyTransformations2(map, start) {
        var resultMap = new Map();
        start.forEach(function (counts, pair) {
            if (map.has(pair)) {
                var transformChar = map.get(pair);
                var totalCounts = counts;
                var first = pair[0] + transformChar;
                if (resultMap.has(first)) {
                    totalCounts += resultMap.get(first);
                }
                resultMap.set(first, totalCounts);
                var totalCounts2 = counts;
                var second = transformChar + pair[1];
                if (resultMap.has(second)) {
                    totalCounts2 += resultMap.get(second);
                }
                resultMap.set(second, totalCounts2);
            }
            else {
                resultMap.set(pair, counts);
            }
        });
        return resultMap;
    }
    function partTwo() {
        var code = startCode;
        var initialPairs = new Map();
        for (var i = 1; i < code.length; i++) {
            var pair = code[i - 1] + code[i];
            initialPairs.set(pair, 1);
        }
        ;
        for (var i = 0; i < 40; i++) {
            var resultMap = applyTransformations2(map, initialPairs);
            initialPairs = resultMap;
        }
        var counts = new Map();
        var lastLetter = startCode[startCode.length - 1];
        initialPairs.forEach(function (count, pair) {
            pair.split('');
            if (!counts.has(pair[0])) {
                counts.set(pair[0], 0);
            }
            // Only count first item in pair, except for last one.
            counts.set(pair[0], counts.get(pair[0]) + count);
        });
        counts.set(lastLetter, counts.get(lastLetter) + 1);
        var min = Number.MAX_SAFE_INTEGER;
        var max = 0;
        counts.forEach(function (val, key) {
            if (val > max) {
                max = val;
            }
            if (val < min) {
                min = val;
            }
        });
        console.log("Part two: ".concat(max - min, " "));
    }
    partTwo();
})(day14 || (day14 = {}));
//# sourceMappingURL=day14.js.map