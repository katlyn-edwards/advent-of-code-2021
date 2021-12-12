var day12;
(function (day12) {
    var input = "um-end\n    pk-um\n    FE-il\n    ay-FE\n    pk-start\n    end-jt\n    um-FE\n    RO-il\n    xc-ay\n    il-end\n    start-EZ\n    pk-FE\n    xc-start\n    jt-FE\n    EZ-um\n    pk-xc\n    xc-EZ\n    pk-ay\n    il-ay\n    jt-EZ\n    jt-om\n    pk-EZ";
    var lines = input.split('\n').map(function (el) { return el.trim(); });
    var paths = new Map();
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var parts = line.split('-');
        if (!paths.has(parts[0])) {
            paths.set(parts[0], new Set());
        }
        paths.get(parts[0]).add(parts[1]);
        if (!paths.has(parts[1])) {
            paths.set(parts[1], new Set());
        }
        paths.get(parts[1]).add(parts[0]);
    }
    function isSmallCave(char) {
        return char.charCodeAt(0) >= 97;
    }
    function findPaths(map, allowSmallTwiceOnce) {
        var trail = [];
        var allPaths = explorePath('start', map, trail, allowSmallTwiceOnce);
        return allPaths;
    }
    function explorePath(path, map, trail, allowSmallTwiceOnce) {
        if (path == 'end') {
            return 1;
        }
        if (isSmallCave(path) && trail.indexOf(path) != -1) {
            if (!allowSmallTwiceOnce) {
                // invalid path
                return 0;
            }
            else if (allowSmallTwiceOnce && path == 'start') {
                return 0;
            }
            else {
                allowSmallTwiceOnce = false;
            }
        }
        var newPaths = map.get(path);
        if (!newPaths || !newPaths.size) {
            // dead end
            return 0;
        }
        // choose 
        trail.push(path);
        var totalPathsFromHere = 0;
        newPaths.forEach(function (newPath) {
            // explore
            var found = explorePath(newPath, map, trail, allowSmallTwiceOnce);
            totalPathsFromHere += found;
        });
        // unchoose
        trail.pop();
        return totalPathsFromHere;
    }
    function partOne() {
        var result = findPaths(paths, false);
        console.log("Part one: ".concat(result));
    }
    partOne();
    function partTwo() {
        var result = findPaths(paths, true);
        console.log("Part two: ".concat(result));
    }
    partTwo();
})(day12 || (day12 = {}));
//# sourceMappingURL=day12.js.map