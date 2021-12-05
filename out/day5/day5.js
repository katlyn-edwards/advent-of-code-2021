var day5;
(function (day5) {
    var input = "0,9 -> 5,9\n    8,0 -> 0,8\n    9,4 -> 3,4\n    2,2 -> 2,1\n    7,0 -> 7,4\n    6,4 -> 2,0\n    0,9 -> 2,9\n    3,4 -> 1,4\n    0,0 -> 8,8\n    5,5 -> 8,2";
    var lines = input.split('\n').map(function (el) { return el.trim(); });
    function generatePoints(x1, y1, x2, y2, isPartTwo) {
        var results = [];
        if (x1 == x2) {
            var min = Math.min(y1, y2);
            var max = Math.max(y1, y2);
            for (var i = min; i <= max; i++) {
                results.push({ x: x1, y: i });
            }
        }
        else if (y1 == y2) {
            var min = Math.min(x1, x2);
            var max = Math.max(x1, x2);
            for (var i = min; i <= max; i++) {
                results.push({ x: i, y: y1 });
            }
        }
        else if (isPartTwo) {
            // Diagonal case.
            if (Math.abs(x1 - x2) != Math.abs(y1 - y2)) {
                console.log("ERRORR!!!! ".concat(x1, " ").concat(y1, " -> ").concat(x2, " ").concat(y2));
                return results;
            }
            var isXAdding = x1 < x2;
            var isYAdding = y1 < y2;
            for (var i = 0; i <= Math.abs(x1 - x2); i++) {
                var newX = isXAdding ? x1 + i : x1 - i;
                var newY = isYAdding ? y1 + i : y1 - i;
                results.push({ x: newX, y: newY });
            }
        }
        return results;
    }
    function parseLines(isPartTwo) {
        var markedPoints = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var parts = line.split(' -> ');
            var firstPair = parts[0].split(',').map(function (el) { return Number(el); });
            var secondPair = parts[1].split(',').map(function (el) { return Number(el); });
            var newPoints = generatePoints(firstPair[0], firstPair[1], secondPair[0], secondPair[1], isPartTwo);
            markedPoints.push.apply(markedPoints, newPoints);
        }
        return markedPoints;
    }
    function populateMap(isPartTwo) {
        // Generate all points.
        var markedPoints = parseLines(isPartTwo);
        // Generate map.
        var result = new Map();
        for (var _i = 0, markedPoints_1 = markedPoints; _i < markedPoints_1.length; _i++) {
            var point = markedPoints_1[_i];
            var key = "".concat(point.x, ",").concat(point.y);
            if (result.has(key)) {
                result.set(key, result.get(key) + 1);
            }
            else {
                result.set(key, 1);
            }
        }
        return result;
    }
    function sumGreaterThanTwos(result) {
        var sum = 0;
        result.forEach(function (val, key) {
            if (val >= 2) {
                sum++;
            }
        });
        return sum;
    }
    function partOne() {
        var sum = sumGreaterThanTwos(populateMap(false));
        console.log("Part one: ".concat(sum));
    }
    partOne();
    function partTwo() {
        var sum = sumGreaterThanTwos(populateMap(true));
        console.log("Part two: ".concat(sum));
    }
    partTwo();
})(day5 || (day5 = {}));
//# sourceMappingURL=day5.js.map