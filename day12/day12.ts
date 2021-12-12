namespace day12 {
    const input = `um-end
    pk-um
    FE-il
    ay-FE
    pk-start
    end-jt
    um-FE
    RO-il
    xc-ay
    il-end
    start-EZ
    pk-FE
    xc-start
    jt-FE
    EZ-um
    pk-xc
    xc-EZ
    pk-ay
    il-ay
    jt-EZ
    jt-om
    pk-EZ`;

    const lines = input.split('\n').map(el => el.trim());
    let paths = new Map<string, Set<string>>();
    for (let line of lines) {
        let parts = line.split('-');
        if (!paths.has(parts[0])) {
            paths.set(parts[0], new Set());
        }
        paths.get(parts[0]).add(parts[1]);

        if (!paths.has(parts[1])) {
            paths.set(parts[1], new Set());
        }
        paths.get(parts[1]).add(parts[0]);
    }

    function isSmallCave(char: string) {
        return char.charCodeAt(0) >= 97;
    }

    function findPaths(map: Map<string, Set<string>>, allowSmallTwiceOnce: boolean): number {
        let trail = [];
        let allPaths = explorePath('start', map, trail, allowSmallTwiceOnce);
        return allPaths;
    }

    function explorePath(path: string, map: Map<string, Set<string>>, trail: string[], allowSmallTwiceOnce: boolean): number {
        if (path == 'end') {
            return 1;
        }
        if (isSmallCave(path) && trail.indexOf(path) != -1) {
            if (!allowSmallTwiceOnce) {
                // invalid path
                return 0;
            } else if (allowSmallTwiceOnce && path == 'start') {
                return 0;
            } else {
                allowSmallTwiceOnce = false;
            }
        }
        let newPaths = map.get(path);
        if (!newPaths || !newPaths.size) {
            // dead end
            return 0;
        }
        // choose 
        trail.push(path);
        let totalPathsFromHere = 0;
        newPaths.forEach(newPath => {
        // explore
            let found = explorePath(newPath, map, trail, allowSmallTwiceOnce);
            totalPathsFromHere += found;
        });
        // unchoose
        trail.pop();
        return totalPathsFromHere;
    }

    function partOne() {
        let result = findPaths(paths, false);
        console.log(`Part one: ${result}`);
    }
    partOne();

    function partTwo() {
        let result = findPaths(paths, true);
        console.log(`Part two: ${result}`);
    }
    partTwo();
}