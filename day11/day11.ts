namespace day11 {
    const input = `5483143223
    2745854711
    5264556173
    6141336146
    6357385478
    4167524645
    2176841721
    6882881134
    4846848554
    5283751526`;

    const lines = input.split('\n').map(el => el.trim());
    const octopi = lines.map(line => line.split('').map(item => Number(item)));

    let totalSize = octopi.length * octopi[0].length;

    function print2DArray(arr: number[][]): void {
        for (let i = 0; i < arr.length; i++) {
            let line = '';
            for (let j = 0; j < arr[0].length; j++) {
                line += arr[i][j] + '';
            }
            console.log(line);
        }
    }

    function step(octopi: number[][]) {
        let flashes: Array<{i: number, j: number}> = [];
        for (let i = 0; i < octopi.length; i++) {
            for (let j = 0; j < octopi[0].length; j++) {
                octopi[i][j]++;
                if (shouldFlash(i, j, octopi)) {
                    flashes.push({i, j});
                }
            }
        }

        let seen = new Set<string>();
        // Deal with flashes
        while (flashes.length) {
            let location = flashes.pop();
            let key = `${location.i},${location.j}`;
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);
            // Add all diagonals to queue if necessary.
            if (location.j + 1 < octopi[0].length) {
                octopi[location.i][location.j + 1]++;
                if (shouldFlash(location.i, location.j + 1, octopi)) {
                    flashes.push({i: location.i, j: location.j + 1});
                }
            }

            if (location.j - 1 >= 0) {
                octopi[location.i][location.j - 1]++;
                if (shouldFlash(location.i, location.j - 1, octopi)) {
                    flashes.push({i: location.i, j: location.j - 1});
                }
            }

            if (location.j + 1 < octopi[0].length && location.i + 1 < octopi.length) {
                octopi[location.i + 1][location.j + 1]++;
                if (shouldFlash(location.i + 1, location.j + 1, octopi)) {
                    flashes.push({i: location.i + 1, j: location.j + 1});
                }
            }

            if (location.i + 1 < octopi.length && location.j - 1 >= 0) {
                octopi[location.i + 1][location.j - 1]++;
                if (shouldFlash(location.i + 1, location.j - 1, octopi)) {
                    flashes.push({i: location.i + 1, j: location.j - 1});
                }
            }
            
            if (location.i - 1 >= 0 && location.j + 1 < octopi[0].length) {
                octopi[location.i - 1][location.j + 1]++;
                if (shouldFlash(location.i - 1, location.j + 1, octopi)) {
                    flashes.push({i: location.i - 1, j: location.j + 1});
                }
            }

            if (location.i - 1 >= 0 && location.j - 1 >= 0) {
                octopi[location.i - 1][location.j - 1]++;
                if (shouldFlash(location.i - 1, location.j - 1, octopi)) {
                    flashes.push({i: location.i - 1, j: location.j - 1});
                }
            }

            if (location.i + 1 < octopi.length) {
                octopi[location.i + 1][location.j]++;
                if (shouldFlash(location.i + 1, location.j, octopi)) {
                    flashes.push({i: location.i + 1, j: location.j});
                }
            }

            if (location.i - 1 >= 0) {
                octopi[location.i - 1][location.j]++;
                if (shouldFlash(location.i - 1, location.j, octopi)) {
                    flashes.push({i: location.i - 1, j: location.j});
                }
            }
        }

        seen.forEach(el => {
            let res = el.split(',');
            octopi[res[0]][res[1]] = 0;
            
        });
        return seen.size;
    }

    function shouldFlash(i: number, j: number, arr: number[][]): boolean {
        if (i >= arr.length || i < 0) {
            return false;
        }
        if (j >= arr[0].length || j < 0) {
            return false;
        }
        return arr[i][j] > 9;
    }

    function partOne() {
        let total = 0;
        for (let i = 0; i < 100; i++) {
            let flashes = step(octopi);
            total += flashes;
        }
        console.log(`Part one: ${total}`);
    }
    partOne();

    function partTwo() {
        let i = 0;
        let seenFlashes = 0;
        while (seenFlashes != totalSize) {
            seenFlashes = step(octopi);
            i++;
        }
        print2DArray(octopi);
        // CHEATING, adding 100 from part one because I'm lazy and modified input.
        // Real people would clone the input array or re-read it, but here we are.
        console.log(`Part two: ${i + 100}`);
    }
    partTwo();
}