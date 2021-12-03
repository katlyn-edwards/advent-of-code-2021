var day2;
(function (day2) {
    var input = "forward 5\n    down 5\n    forward 8\n    up 3\n    down 8\n    forward 2";
    var inputArr = input.split("\n");
    var formattedInput = inputArr.map(function (line) {
        var x = line.trim().split(' ');
        return {
            dir: x[0],
            len: Number(x[1]),
        };
    });
    function partOne() {
        var forward = 0;
        var depth = 0;
        for (var _i = 0, formattedInput_1 = formattedInput; _i < formattedInput_1.length; _i++) {
            var val = formattedInput_1[_i];
            if (val.dir == 'forward') {
                forward += val.len;
            }
            else if (val.dir == 'down') {
                depth += val.len;
            }
            else if (val.dir == 'up') {
                depth -= val.len;
            }
        }
        console.log("Part one: ".concat(forward * depth, " "));
    }
    partOne();
    function partTwo() {
        var forward = 0;
        var depth = 0;
        var aim = 0;
        for (var _i = 0, formattedInput_2 = formattedInput; _i < formattedInput_2.length; _i++) {
            var val = formattedInput_2[_i];
            if (val.dir == 'forward') {
                forward += val.len;
                depth += val.len * aim;
            }
            else if (val.dir == 'down') {
                aim += val.len;
            }
            else if (val.dir == 'up') {
                aim -= val.len;
            }
        }
        console.log("Part two: ".concat(forward * depth, " "));
    }
    partTwo();
})(day2 || (day2 = {}));
//# sourceMappingURL=day2.js.map