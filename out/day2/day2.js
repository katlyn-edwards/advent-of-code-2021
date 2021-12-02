var day2;
(function (day2) {
    var input = "forward 5\n    down 5\n    forward 8\n    up 3\n    down 8\n    forward 2";
    var inputArr = input.split("\n");
    var inputArr2 = inputArr.map(function (line) {
        var x = line.trim().split(' ');
        return {
            dir: x[0],
            len: Number(x[1]),
        };
    });
    function partOne() {
        var forward = 0;
        var depth = 0;
        for (var i = 0; i < inputArr2.length; i++) {
            var val = inputArr2[i];
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
        console.log("Part One: ".concat(forward * depth, " "));
    }
    partOne();
    function partTwo() {
        var forward = 0;
        var depth = 0;
        var aim = 0;
        for (var i = 0; i < inputArr2.length; i++) {
            var val = inputArr2[i];
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