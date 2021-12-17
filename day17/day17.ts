namespace day17 {
    const input = `target area: x=248..285, y=-85..-56`;
    const startX = 0;
    const startY = 0;

    const preamble = 'target area: ';
    const cleaned = input.slice(preamble.length);
    const parts = cleaned.split(', ');
    let xTargets = parts[0].slice('x='.length);
    let yTargets = parts[1].slice('y='.length);
    let xMinMax = xTargets.split('..').map(el => Number(el));
    let yMinMax = yTargets.split('..').map(el => Number(el));

    function withinXTarget(x: number) {
        return x <= xMinMax[1] && x >= xMinMax[0];
    }

    function isInTarget(x: number, y: number): boolean {
        return withinXTarget(x) && y <= yMinMax[1] && y >= yMinMax[0];
    }

    function didOvershoot(x: number, y: number, xVelocity: number): boolean {
        return x > xMinMax[1] || y < yMinMax[0] || (xVelocity == 0 && !withinXTarget(x));
    }

    function calculateTargetFromVelocity(xVelocity: number, yVelocity: number): boolean {
        let x = startX;
        let y = startY
        while (!didOvershoot(x, y, xVelocity) && !isInTarget(x, y)) {
            x += xVelocity;
            y += yVelocity;
            yVelocity--;
            if (xVelocity > 0) {
                xVelocity--;
            } else if (xVelocity < 0) {
                xVelocity++;
            } // else xVelocity stays at zero.
        }
        return isInTarget(x, y);
    }

    const largestYVelocity = 0 - yMinMax[0] - 1;

    function partOne() {
        // Optimize for largest Y position.
        let yVelocity = largestYVelocity;
        let y = 0;
        let maxHeight = 0;
        let isIncreasing = true;
        while (isIncreasing) {
            y += yVelocity;
            if (y > maxHeight) {
                maxHeight = y;
            } else {
                isIncreasing = false;
            }
            yVelocity--;
        }

        console.log(`Part one: ${maxHeight}`);
    }
    partOne();

    function partTwo() {
        // Find every initial velocity that lands in target.
        let valid = []; 
        for (let xV = 0; xV <= xMinMax[1]; xV++) {
            for (let yV = yMinMax[0]; yV <= largestYVelocity; yV++) {
                if (calculateTargetFromVelocity(xV, yV)) {
                    valid.push({xV, yV});
                }
            }
        }
        console.log(`Part two: ${valid.length}`);
    }
    partTwo();
}