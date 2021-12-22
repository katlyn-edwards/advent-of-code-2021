namespace day20 {
    const input = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
    #..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
    .######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
    .#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
    .#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
    ...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
    ..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#
    
    #..#.
    #....
    ##..#
    ..#..
    ..###`;

    function parseInput(input: String): {algorithm: string, pixels: Set<string>, boundsX: number, boundsY: number} {
        const chunks = input.split(`\n\n`);
        let algorithm = chunks[0];
        let image = chunks[1];

        // It should be one line, but in the test input it's multiple.
        // This should be a no-op for my real input.
        algorithm = algorithm.split(`\n`).map(el => el.trim()).join('');
        if (algorithm.length != 512) {
            console.log(`Unexpected algorithm length: ${algorithm}`)
        }

        // Go through the image, and create a set of lit up pixels
        let pixels = new Set<string>();
        let imageArr = image.split('\n').map(el => el.trim());
        for (let row = 0; row < imageArr.length; row++) {
            for (let col = 0; col < imageArr[0].length; col++) {
                if (imageArr[row][col] == '#') {
                    // Pixel is lit up, record position.
                    pixels.add(`${col},${row}`);
                }
            }
        }
        return {pixels, algorithm, boundsX: imageArr[0].length, boundsY: imageArr.length};
    }

    function findImageBorders(pixels: Set<string>): {top: number, left: number, right: number, bottom: number} {
        let minX = Number.MAX_SAFE_INTEGER;
        let minY = Number.MAX_SAFE_INTEGER;
        let maxX = Number.MIN_SAFE_INTEGER;
        let maxY = Number.MIN_SAFE_INTEGER;
        pixels.forEach(pixel => {
            let parts = pixel.split(`,`).map(el => Number(el));
            if (parts[0] < minX) {
                minX = parts[0];
            }
            if (parts[0] > maxX) {
                maxX = parts[0];
            }
            if (parts[1] < minY) {
                minY = parts[1]
            }
            if (parts[1] > maxY) {
                maxY = parts[1];
            }
        });

        return {top: minY, left: minX, right: maxX, bottom: maxY};
    }

    function enhance(algorithm: string, pixels: Set<string>, iteration: number, boundsX: number, boundsY: number): Set<string> {
        // Determine if the infinite space should be lit up.
        let infiniteSpaceIsLit = algorithm[0] == '#' && iteration % 2 == 0;

        let top = 0 - iteration;
        let bottom = boundsY + iteration;
        let left = 0 - iteration;
        let right = boundsX + iteration;

        let newImage = new Set<string>();
        for (let row = top - 1; row <= bottom; row++) {
            for (let col = left - 1; col <= right; col++) {
                // Investigate points to see if there are lit up pixels in 3x3.
                let binaryString = '';
                for (let y = row - 1; y <= row + 1; y++) {
                    for (let x = col - 1; x <= col + 1; x++) {
                        let key = `${x},${y}`
                        if (x > left && x < right &&
                            y > top && y < bottom) {
                            binaryString += pixels.has(key) ? '1' : '0';
                        } else {
                            binaryString += infiniteSpaceIsLit ? '1' : '0';
                        }
                    }
                }
                let idx = parseInt(binaryString, 2);
                let newPixel = algorithm[idx];
                if (newPixel == '#') {
                    // keep track of it, since it's a lit up pixel, otherwise, we don't care.
                    newImage.add(`${col},${row}`);
                }
            }
        }

        return newImage;
    }

    function printPicture(pixels: Set<string>) {
        let borders = findImageBorders(pixels);
        for (let row = borders.top; row <= borders.bottom; row++) {
            let line = '';
            for (let col = borders.left; col <= borders.right; col++) {
                let key = `${col},${row}`;
                line += pixels.has(key) ? '#' : '.'
            }
            console.log(line);
        }
    }

    let startTime = new Date();
    console.log(`Starting timer: ${startTime.toLocaleString()}`)

    function partOne() {
        let clean = input.split(`\n`).map(el => el.trim()).join(`\n`);
        let parsed = parseInput(clean);
        let pixels = parsed.pixels;
        for (let i = 0; i < 2; i++) {
            pixels = enhance(parsed.algorithm, pixels, i + 1, parsed.boundsX, parsed.boundsY);
        }
        console.log(`Part one: ${pixels.size}`);
        let partOneEnd = new Date();
        console.log(`Part one ended at ${partOneEnd.toLocaleString()}`)
        let millis = partOneEnd.getTime() - startTime.getTime();
        console.log(`Part one took ${millis} milliseconds, or ${millisToHoursMinutesAndSeconds(millis)}`);
    }
    partOne();

    function millisToHoursMinutesAndSeconds(millis: number) {
        const hours = Math.floor(millis / (60 * 60 * 1000))
        const minutes = Math.floor(millis / (60 * 1000)) % 60;
        const seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return hours + ':' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }

    function partTwo() {
        let partTwoStart = new Date();
        let clean = input.split(`\n`).map(el => el.trim()).join(`\n`);
        let parsed = parseInput(clean);
        let pixels = parsed.pixels;
        for (let i = 0; i < 50; i++) {
            pixels = enhance(parsed.algorithm, pixels, i + 1, parsed.boundsX, parsed.boundsY);
        }
        console.log(`Part two: ${pixels.size}`);
        let partTwoEnd = new Date();
        let millis2 = partTwoEnd.getTime() - partTwoStart.getTime();
        let millisTotal = partTwoEnd.getTime() - startTime.getTime();
        console.log(`Part two took ${millis2} milliseconds, or ${millisToHoursMinutesAndSeconds(millis2)}`);
        console.log(`Total runtime took ${millisTotal} milliseconds, or ${millisToHoursMinutesAndSeconds(millisTotal)}`);
    }
    partTwo();
}