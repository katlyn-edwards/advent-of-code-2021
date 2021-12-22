var day20;
(function (day20) {
    var input = "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##\n    #..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###\n    .######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.\n    .#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....\n    .#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..\n    ...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....\n    ..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#\n    \n    #..#.\n    #....\n    ##..#\n    ..#..\n    ..###";
    function parseInput(input) {
        var chunks = input.split("\n\n");
        var algorithm = chunks[0];
        var image = chunks[1];
        // It should be one line, but in the test input it's multiple.
        // This should be a no-op for my real input.
        algorithm = algorithm.split("\n").map(function (el) { return el.trim(); }).join('');
        if (algorithm.length != 512) {
            console.log("Unexpected algorithm length: ".concat(algorithm));
        }
        // Go through the image, and create a set of lit up pixels
        var pixels = new Set();
        var imageArr = image.split('\n').map(function (el) { return el.trim(); });
        for (var row = 0; row < imageArr.length; row++) {
            for (var col = 0; col < imageArr[0].length; col++) {
                if (imageArr[row][col] == '#') {
                    // Pixel is lit up, record position.
                    pixels.add("".concat(col, ",").concat(row));
                }
            }
        }
        return { pixels: pixels, algorithm: algorithm, boundsX: imageArr[0].length, boundsY: imageArr.length };
    }
    function findImageBorders(pixels) {
        var minX = Number.MAX_SAFE_INTEGER;
        var minY = Number.MAX_SAFE_INTEGER;
        var maxX = Number.MIN_SAFE_INTEGER;
        var maxY = Number.MIN_SAFE_INTEGER;
        pixels.forEach(function (pixel) {
            var parts = pixel.split(",").map(function (el) { return Number(el); });
            if (parts[0] < minX) {
                minX = parts[0];
            }
            if (parts[0] > maxX) {
                maxX = parts[0];
            }
            if (parts[1] < minY) {
                minY = parts[1];
            }
            if (parts[1] > maxY) {
                maxY = parts[1];
            }
        });
        return { top: minY, left: minX, right: maxX, bottom: maxY };
    }
    function enhance(algorithm, pixels, iteration, boundsX, boundsY) {
        // Determine if the infinite space should be lit up.
        var infiniteSpaceIsLit = algorithm[0] == '#' && iteration % 2 == 0;
        var top = 0 - iteration;
        var bottom = boundsY + iteration;
        var left = 0 - iteration;
        var right = boundsX + iteration;
        var newImage = new Set();
        for (var row = top - 1; row <= bottom; row++) {
            for (var col = left - 1; col <= right; col++) {
                // Investigate points to see if there are lit up pixels in 3x3.
                var binaryString = '';
                for (var y = row - 1; y <= row + 1; y++) {
                    for (var x = col - 1; x <= col + 1; x++) {
                        var key = "".concat(x, ",").concat(y);
                        if (x > left && x < right &&
                            y > top && y < bottom) {
                            binaryString += pixels.has(key) ? '1' : '0';
                        }
                        else {
                            binaryString += infiniteSpaceIsLit ? '1' : '0';
                        }
                    }
                }
                var idx = parseInt(binaryString, 2);
                var newPixel = algorithm[idx];
                if (newPixel == '#') {
                    // keep track of it, since it's a lit up pixel, otherwise, we don't care.
                    newImage.add("".concat(col, ",").concat(row));
                }
            }
        }
        return newImage;
    }
    function printPicture(pixels) {
        var borders = findImageBorders(pixels);
        for (var row = borders.top; row <= borders.bottom; row++) {
            var line = '';
            for (var col = borders.left; col <= borders.right; col++) {
                var key = "".concat(col, ",").concat(row);
                line += pixels.has(key) ? '#' : '.';
            }
            console.log(line);
        }
    }
    var startTime = new Date();
    console.log("Starting timer: ".concat(startTime.toLocaleString()));
    function partOne() {
        var clean = input.split("\n").map(function (el) { return el.trim(); }).join("\n");
        var parsed = parseInput(clean);
        var pixels = parsed.pixels;
        for (var i = 0; i < 2; i++) {
            pixels = enhance(parsed.algorithm, pixels, i + 1, parsed.boundsX, parsed.boundsY);
        }
        console.log("Part one: ".concat(pixels.size));
        var partOneEnd = new Date();
        console.log("Part one ended at ".concat(partOneEnd.toLocaleString()));
        var millis = partOneEnd.getTime() - startTime.getTime();
        console.log("Part one took ".concat(millis, " milliseconds, or ").concat(millisToHoursMinutesAndSeconds(millis)));
    }
    partOne();
    function millisToHoursMinutesAndSeconds(millis) {
        var hours = Math.floor(millis / (60 * 60 * 1000));
        var minutes = Math.floor(millis / (60 * 1000)) % 60;
        var seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return hours + ':' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
    function partTwo() {
        var partTwoStart = new Date();
        var clean = input.split("\n").map(function (el) { return el.trim(); }).join("\n");
        var parsed = parseInput(clean);
        var pixels = parsed.pixels;
        for (var i = 0; i < 50; i++) {
            pixels = enhance(parsed.algorithm, pixels, i + 1, parsed.boundsX, parsed.boundsY);
        }
        console.log("Part two: ".concat(pixels.size));
        var partTwoEnd = new Date();
        var millis2 = partTwoEnd.getTime() - partTwoStart.getTime();
        var millisTotal = partTwoEnd.getTime() - startTime.getTime();
        console.log("Part two took ".concat(millis2, " milliseconds, or ").concat(millisToHoursMinutesAndSeconds(millis2)));
        console.log("Total runtime took ".concat(millisTotal, " milliseconds, or ").concat(millisToHoursMinutesAndSeconds(millisTotal)));
    }
    partTwo();
})(day20 || (day20 = {}));
//# sourceMappingURL=day20.js.map