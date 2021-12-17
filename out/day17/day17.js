var day17;
(function (day17) {
    var input = "target area: x=248..285, y=-85..-56";
    var startX = 0;
    var startY = 0;
    var preamble = 'target area: ';
    var cleaned = input.slice(preamble.length);
    var parts = cleaned.split(', ');
    var xTargets = parts[0].slice('x='.length);
    var yTargets = parts[1].slice('y='.length);
    var xMinMax = xTargets.split('..').map(function (el) { return Number(el); });
    var yMinMax = yTargets.split('..').map(function (el) { return Number(el); });
    function withinXTarget(x) {
        return x <= xMinMax[1] && x >= xMinMax[0];
    }
    function isInTarget(x, y) {
        return withinXTarget(x) && y <= yMinMax[1] && y >= yMinMax[0];
    }
    function didOvershoot(x, y, xVelocity) {
        return x > xMinMax[1] || y < yMinMax[0] || (xVelocity == 0 && !withinXTarget(x));
    }
    function calculateTargetFromVelocity(xVelocity, yVelocity) {
        var x = startX;
        var y = startY;
        while (!didOvershoot(x, y, xVelocity) && !isInTarget(x, y)) {
            x += xVelocity;
            y += yVelocity;
            yVelocity--;
            if (xVelocity > 0) {
                xVelocity--;
            }
            else if (xVelocity < 0) {
                xVelocity++;
            } // else xVelocity stays at zero.
        }
        return isInTarget(x, y);
    }
    var largestYVelocity = 0 - yMinMax[0] - 1;
    function partOne() {
        // Optimize for largest Y position.
        var yVelocity = largestYVelocity;
        var y = 0;
        var maxHeight = 0;
        var isIncreasing = true;
        while (isIncreasing) {
            y += yVelocity;
            if (y > maxHeight) {
                maxHeight = y;
            }
            else {
                isIncreasing = false;
            }
            yVelocity--;
        }
        console.log("Part one: ".concat(maxHeight));
    }
    partOne();
    function partTwo() {
        // Find every initial velocity that lands in target.
        var valid = [];
        for (var xV = 0; xV <= xMinMax[1]; xV++) {
            for (var yV = yMinMax[0]; yV <= largestYVelocity; yV++) {
                if (calculateTargetFromVelocity(xV, yV)) {
                    valid.push({ xV: xV, yV: yV });
                }
            }
        }
        console.log("Part two: ".concat(valid.length));
    }
    partTwo();
})(day17 || (day17 = {}));
//# sourceMappingURL=day17.js.map