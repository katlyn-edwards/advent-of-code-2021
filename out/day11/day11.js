var day11;
(function (day11) {
    var input = "5483143223\n    2745854711\n    5264556173\n    6141336146\n    6357385478\n    4167524645\n    2176841721\n    6882881134\n    4846848554\n    5283751526";
    var lines = input.split('\n').map(function (el) { return el.trim(); });
    var octopi = lines.map(function (line) { return line.split('').map(function (item) { return Number(item); }); });
    var totalSize = octopi.length * octopi[0].length;
    function print2DArray(arr) {
        for (var i = 0; i < arr.length; i++) {
            var line = '';
            for (var j = 0; j < arr[0].length; j++) {
                line += arr[i][j] + '';
            }
            console.log(line);
        }
    }
    function step(octopi) {
        var flashes = [];
        for (var i = 0; i < octopi.length; i++) {
            for (var j = 0; j < octopi[0].length; j++) {
                octopi[i][j]++;
                if (shouldFlash(i, j, octopi)) {
                    flashes.push({ i: i, j: j });
                }
            }
        }
        var seen = new Set();
        // Deal with flashes
        while (flashes.length) {
            var location_1 = flashes.pop();
            var key = "".concat(location_1.i, ",").concat(location_1.j);
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);
            // Add all diagonals to queue if necessary.
            if (location_1.j + 1 < octopi[0].length) {
                octopi[location_1.i][location_1.j + 1]++;
                if (shouldFlash(location_1.i, location_1.j + 1, octopi)) {
                    flashes.push({ i: location_1.i, j: location_1.j + 1 });
                }
            }
            if (location_1.j - 1 >= 0) {
                octopi[location_1.i][location_1.j - 1]++;
                if (shouldFlash(location_1.i, location_1.j - 1, octopi)) {
                    flashes.push({ i: location_1.i, j: location_1.j - 1 });
                }
            }
            if (location_1.j + 1 < octopi[0].length && location_1.i + 1 < octopi.length) {
                octopi[location_1.i + 1][location_1.j + 1]++;
                if (shouldFlash(location_1.i + 1, location_1.j + 1, octopi)) {
                    flashes.push({ i: location_1.i + 1, j: location_1.j + 1 });
                }
            }
            if (location_1.i + 1 < octopi.length && location_1.j - 1 >= 0) {
                octopi[location_1.i + 1][location_1.j - 1]++;
                if (shouldFlash(location_1.i + 1, location_1.j - 1, octopi)) {
                    flashes.push({ i: location_1.i + 1, j: location_1.j - 1 });
                }
            }
            if (location_1.i - 1 >= 0 && location_1.j + 1 < octopi[0].length) {
                octopi[location_1.i - 1][location_1.j + 1]++;
                if (shouldFlash(location_1.i - 1, location_1.j + 1, octopi)) {
                    flashes.push({ i: location_1.i - 1, j: location_1.j + 1 });
                }
            }
            if (location_1.i - 1 >= 0 && location_1.j - 1 >= 0) {
                octopi[location_1.i - 1][location_1.j - 1]++;
                if (shouldFlash(location_1.i - 1, location_1.j - 1, octopi)) {
                    flashes.push({ i: location_1.i - 1, j: location_1.j - 1 });
                }
            }
            if (location_1.i + 1 < octopi.length) {
                octopi[location_1.i + 1][location_1.j]++;
                if (shouldFlash(location_1.i + 1, location_1.j, octopi)) {
                    flashes.push({ i: location_1.i + 1, j: location_1.j });
                }
            }
            if (location_1.i - 1 >= 0) {
                octopi[location_1.i - 1][location_1.j]++;
                if (shouldFlash(location_1.i - 1, location_1.j, octopi)) {
                    flashes.push({ i: location_1.i - 1, j: location_1.j });
                }
            }
        }
        seen.forEach(function (el) {
            var res = el.split(',');
            octopi[res[0]][res[1]] = 0;
        });
        return seen.size;
    }
    function shouldFlash(i, j, arr) {
        if (i >= arr.length || i < 0) {
            return false;
        }
        if (j >= arr[0].length || j < 0) {
            return false;
        }
        return arr[i][j] > 9;
    }
    function partOne() {
        var total = 0;
        for (var i = 0; i < 100; i++) {
            var flashes = step(octopi);
            total += flashes;
        }
        console.log("Part one: ".concat(total));
    }
    partOne();
    function partTwo() {
        var i = 0;
        var seenFlashes = 0;
        while (seenFlashes != totalSize) {
            seenFlashes = step(octopi);
            i++;
        }
        print2DArray(octopi);
        // CHEATING, adding 100 from part one because I'm lazy and modified input.
        // Real people would clone the input array or re-read it, but here we are.
        console.log("Part two: ".concat(i + 100));
    }
    partTwo();
})(day11 || (day11 = {}));
//# sourceMappingURL=day11.js.map