 namespace day5 {
    const input = `0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2`;
    const lines = input.split('\n').map(el => el.trim());

    function generatePoints(x1: number, y1: number, x2: number, y2: number, isPartTwo: boolean): Array<{x: number, y: number}> {
        const results = [];
        if (x1 == x2) {
            let min = Math.min(y1, y2);
            let max = Math.max(y1, y2);
            for (let i = min; i <= max; i++) {
                results.push({x: x1, y: i});
            }
        } else if (y1 == y2) {
            let min = Math.min(x1, x2);
            let max = Math.max(x1, x2);
            for (let i = min; i <= max; i++) {
                results.push({x: i, y: y1});
            }
        } else if (isPartTwo) {
            // Diagonal case.
            if (Math.abs(x1 - x2) != Math.abs(y1 - y2)) {
                console.log(`ERRORR!!!! ${x1} ${y1} -> ${x2} ${y2}`);
                return results;
            }
            let isXAdding = x1 < x2;
            let isYAdding = y1 < y2;
            for (let i = 0; i <= Math.abs(x1 - x2); i++) {
                let newX = isXAdding ? x1 + i : x1 - i;
                let newY = isYAdding ? y1 + i : y1 - i;
                results.push({x: newX, y: newY});
            }
        }
        return results;
    }

    function parseLines(isPartTwo: boolean): Array<{x: number, y: number}> {
        const markedPoints = [];
        for (let line of lines) {
            let parts = line.split(' -> ');
            let firstPair = parts[0].split(',').map(el => Number(el));
            let secondPair = parts[1].split(',').map(el => Number(el));
            let newPoints = generatePoints(firstPair[0], firstPair[1], secondPair[0], secondPair[1], isPartTwo);
            markedPoints.push(...newPoints);
        }
        return markedPoints;
    }

    function populateMap(isPartTwo: boolean): Map<string, number> {
        // Generate all points.
        const markedPoints = parseLines(isPartTwo);
        
        // Generate map.
        const result = new Map();
        for (let point of markedPoints) {
            let key = `${point.x},${point.y}`;
            if (result.has(key)) {
                result.set(key, result.get(key) + 1);
            } else {
                result.set(key, 1);
            }
        }
        return result;
    }

    function sumGreaterThanTwos(result: Map<string, number>): number {
        let sum = 0;
        result.forEach((val: Number, key: string) => {
            if (val >= 2) {
                sum++;
            }
        });
        return sum;
    }

    function partOne() {
        const sum = sumGreaterThanTwos(populateMap(false));
        console.log(`Part one: ${sum}`);
    }
    partOne();

    function partTwo() {
        const sum = sumGreaterThanTwos(populateMap(true));
        console.log(`Part two: ${sum}`)
    }
    partTwo();
}