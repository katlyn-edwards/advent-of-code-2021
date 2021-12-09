namespace day9 {
    const input = ``;

    const arr = [];
    const lines = input.split('\n');
    for (let line of lines) {
        const nums = line.trim().split('').map(el => Number(el));
        arr.push(nums);
    }

    function findLowPoints(arr: number[][]): Array<{val: number, x: number, y: number}> {
        let lowPoints = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                let isLowest = true;
                let curr = arr[i][j];
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
                    lowPoints.push({val: curr, x: i, y: j});
                }
            }
        }

        return lowPoints;
    }

    function partOne() {
        let points = findLowPoints(arr);
        let totalRisk = points.reduce((prev, curr: {
            val: number;
            x: number;
            y: number;
        }) => {
            return prev + curr.val;
        }, 0);
        console.log(`Part one: ${totalRisk} ${points.length} ${totalRisk + points.length}`);
    }
    partOne();

    function findBasinSizeForSink(x: number, y: number, arr: number[][], st: Set<string>) {
        let key = `${x},${y}`;
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
        let points = findLowPoints(arr);
        let basinSizes = [];
        for (let point of points) {
            let resultSet = new Set<string>();
            findBasinSizeForSink(point.x, point.y, arr, resultSet);
            basinSizes.push(resultSet.size);
        }
        let sorted = basinSizes.sort((a, b) => a - b);
        let total = 1;
        for ( let i = 0; i < 3; i++) {
            total *= sorted[sorted.length - 1 - i];
        }
        console.log(`Part two: ${total}`);
    }
    partTwo();
}