namespace day2 {
    const input = `forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`;
    const inputArr = input.split(`\n`);
    const inputArr2 = inputArr.map(line => {
        let x = line.trim().split(' ');
        return {
            dir: x[0],
            len: Number(x[1]),
        };
    }) as Array<{dir: string, len: number}>;


    function partOne() {
        let forward = 0;
        let depth = 0;
        for (let i = 0; i < inputArr2.length; i++) {
            const val = inputArr2[i];
            if (val.dir == 'forward') {
                forward += val.len;
            } else if (val.dir == 'down') {
                depth += val.len;
            } else if (val.dir == 'up') {
                depth -= val.len;
            }
        }
        console.log(`Part One: ${forward * depth} `);
    }
    partOne();

    function partTwo() {
        let forward = 0;
        let depth = 0;
        let aim = 0;
        for (let i = 0; i < inputArr2.length; i++) {
            const val = inputArr2[i];
            if (val.dir == 'forward') {
                forward += val.len;
                depth += val.len * aim;
            } else if (val.dir == 'down') {
                aim += val.len;
            } else if (val.dir == 'up') {
                aim -= val.len;
            }
        }
        console.log(`Part two: ${forward * depth} `);
    }
    partTwo();
}