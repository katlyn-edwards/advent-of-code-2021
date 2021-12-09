var day9;
(function (day9) {
    var input = "2199943210\n    3987894921\n    9856789892\n    8767896789\n    9899965678";
    var arr = [];
    var lines = input.split('\n');
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var nums = line.trim().split('').map(function (el) { return Number(el); });
        arr.push(nums);
    }
    function findLowPoints(arr) {
        var lowPoints = [];
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[0].length; j++) {
                var isLowest = true;
                var curr = arr[i][j];
                // Test top
                if (i > 0) {
                    if (arr[i - 1][j] <= curr) {
                        isLowest = false;
                    }
                }
                // Test bottom
                if (i + 1 < arr.length) {
                    if (arr[i + 1][j] <= curr) {
                        isLowest = false;
                    }
                }
                // Test left
                if (j > 0) {
                    if (arr[i][j - 1] <= curr) {
                        isLowest = false;
                    }
                }
                // Test right
                if (j + 1 < arr[0].length) {
                    if (arr[i][j + 1] <= curr) {
                        isLowest = false;
                    }
                }
                if (isLowest) {
                    lowPoints.push({ val: curr, x: i, y: j });
                }
            }
        }
        return lowPoints;
    }
    function partOne() {
        var points = findLowPoints(arr);
        var totalRisk = points.reduce(function (prev, curr) {
            return prev + curr.val;
        }, 0);
        console.log("Part one: ".concat(totalRisk + points.length));
    }
    partOne();
    function findBasinSizeForSink(x, y, arr, st) {
        var key = "".concat(x, ",").concat(y);
        if (st.has(key)) {
            return;
        }
        if (x >= arr.length || x < 0) {
            return;
        }
        if (y >= arr[0].length || y < 0) {
            return;
        }
        if (arr[x][y] == 9) {
            return;
        }
        st.add(key);
        // four directions exploration
        findBasinSizeForSink(x + 1, y, arr, st);
        findBasinSizeForSink(x - 1, y, arr, st);
        findBasinSizeForSink(x, y + 1, arr, st);
        findBasinSizeForSink(x, y - 1, arr, st);
    }
    function partTwo() {
        var points = findLowPoints(arr);
        var basinSizes = [];
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            var resultSet = new Set();
            findBasinSizeForSink(point.x, point.y, arr, resultSet);
            basinSizes.push(resultSet.size);
        }
        var sorted = basinSizes.sort(function (a, b) { return a - b; });
        var total = 1;
        for (var i = 0; i < 3; i++) {
            total *= sorted[sorted.length - 1 - i];
        }
        console.log("Part two: ".concat(total));
    }
    partTwo();
})(day9 || (day9 = {}));
//# sourceMappingURL=day9.js.map