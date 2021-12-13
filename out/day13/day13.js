var day13;
(function (day13) {
    var input = "6,10\n    0,14\n    9,10\n    0,3\n    10,4\n    4,11\n    6,0\n    6,12\n    4,1\n    0,13\n    10,12\n    3,4\n    3,0\n    8,4\n    1,10\n    2,14\n    8,10\n    9,0\n    \n    fold along y=7\n    fold along x=5";
    var clean = input.split("\n").map(function (el) { return el.trim(); });
    var parts = clean.join('\n').split('\n\n');
    var indices = parts[0].split('\n').map(function (el) { return el.trim(); });
    var folds = parts[1].split('\n').map(function (el) { return el.trim(); });
    var dots = new Set();
    for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
        var index = indices_1[_i];
        var xy = index.split(',');
        dots.add("".concat(Number(xy[0]), ",").concat(Number(xy[1])));
    }
    function getXY(point) {
        var parts = point.split(',');
        var x = Number(parts[0]);
        var y = Number(parts[1]);
        return { x: x, y: y };
    }
    function doFold(line, points) {
        var preamble = 'fold along ';
        var instruction = line.slice(preamble.length);
        var isX = instruction[0] == 'x';
        var val = Number(instruction.split('=')[1]);
        var arr = Array.from(points);
        arr.forEach(function (point) {
            var _a = getXY(point), x = _a.x, y = _a.y;
            var wasModified = false;
            if (isX && x > val) {
                var difference = Math.abs(x - val);
                x = val - difference;
                wasModified = true;
            }
            else if (!isX && y > val) {
                var difference = Math.abs(y - val);
                y = val - difference;
                wasModified = true;
            }
            if (wasModified) {
                points.delete(point);
                points.add("".concat(x, ",").concat(y));
            }
        });
    }
    function partOne() {
        var currFold = folds.shift();
        doFold(currFold, dots);
        console.log("Part one: ".concat(dots.size));
    }
    partOne();
    function plotPoints(points) {
        var maxX = 0;
        var maxY = 0;
        points.forEach(function (point) {
            var _a = getXY(point), x = _a.x, y = _a.y;
            if (x > maxX) {
                maxX = x;
            }
            if (y > maxY) {
                maxY = y;
            }
        });
        var resultGrid = [];
        var newArr = [];
        for (var j = 0; j < maxY + 1; j++) {
            newArr.push(' ');
        }
        for (var i = 0; i < maxX + 1; i++) {
            resultGrid.push(newArr.slice());
        }
        points.forEach(function (point) {
            var _a = getXY(point), x = _a.x, y = _a.y;
            resultGrid[x][y] = '#';
        });
        return resultGrid;
    }
    function print2DArray(arr) {
        for (var j = 0; j < arr[0].length; j++) {
            var line = '';
            for (var i = 0; i < arr.length; i++) {
                line += arr[i][j] + '';
            }
            console.log(line);
        }
    }
    function partTwo() {
        for (var _i = 0, folds_1 = folds; _i < folds_1.length; _i++) {
            var fold = folds_1[_i];
            doFold(fold, dots);
        }
        var grid = plotPoints(dots);
        console.log('Part two:');
        print2DArray(grid);
    }
    partTwo();
})(day13 || (day13 = {}));
//# sourceMappingURL=day13.js.map