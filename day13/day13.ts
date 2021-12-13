namespace day13 {
    const input = `6,10
    0,14
    9,10
    0,3
    10,4
    4,11
    6,0
    6,12
    4,1
    0,13
    10,12
    3,4
    3,0
    8,4
    1,10
    2,14
    8,10
    9,0
    
    fold along y=7
    fold along x=5`;

    const clean = input.split(`\n`).map(el => el.trim());
    let parts = clean.join('\n').split('\n\n');
    let indices = parts[0].split('\n').map(el => el.trim());
    let folds = parts[1].split('\n').map(el => el.trim());

    let dots = new Set<string>();
    for (let index of indices) {
        let xy = index.split(',');
        dots.add(`${Number(xy[0])},${Number(xy[1])}`);
    }

    function getXY(point: string) {
        let parts = point.split(',');
        let x = Number(parts[0]);
        let y = Number(parts[1]);
        return {x, y};
    }

    function doFold(line: string, points: Set<string>) {
        let preamble = 'fold along ';
        let instruction = line.slice(preamble.length);
        let isX = instruction[0] == 'x';
        let val = Number(instruction.split('=')[1]);

        let arr = Array.from(points);
        arr.forEach((point: string) => {
            let {x, y} = getXY(point);
            let wasModified = false;
            if (isX && x > val) {
                let difference = Math.abs(x - val);
                x = val - difference;
                wasModified = true;
            } else if (!isX && y > val) {
                let difference = Math.abs(y - val);
                y = val - difference;
                wasModified = true;
            }
            if (wasModified) {
                points.delete(point);
                points.add(`${x},${y}`);
            }
        });
    }

    function partOne() {
        let currFold = folds.shift();
        doFold(currFold, dots);
        console.log(`Part one: ${dots.size}`);
    }
    partOne();

    function plotPoints(points: Set<string>) {
        let maxX = 0;
        let maxY = 0;
        points.forEach(point => {
            let {x, y} = getXY(point);
            if (x > maxX) {
                maxX = x;
            }
            if (y > maxY) {
                maxY = y;
            }
        });

        let resultGrid = [];
        let newArr = [];
        for (let j = 0; j < maxY + 1; j++) {
            newArr.push(' ');
        }
        for (let i = 0; i < maxX + 1; i++) {
            resultGrid.push(newArr.slice());
        }
        points.forEach(point => {
            let {x, y} = getXY(point);
            resultGrid[x][y] = '#'
        });
        return resultGrid;
    }

    function print2DArray(arr: number[][]): void {
        for (let j = 0; j < arr[0].length; j++) {
            let line = '';
            for (let i = 0; i < arr.length; i++) {
                line += arr[i][j] + '';
            }
            console.log(line);
        }
    }

    function partTwo() {
        for (let fold of folds) {
            doFold(fold, dots);
        }
        let grid = plotPoints(dots);
        console.log('Part two:');
        print2DArray(grid);
    }
    partTwo();
}