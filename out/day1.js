var input = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263";
var inputArr = input.split("\n").map(function (el) { return Number(el); });
function partOne() {
    var increased = 0;
    for (var i = 1; i < input.length; i++) {
        if (inputArr[i] > inputArr[i - 1]) {
            increased++;
        }
    }
    console.log('Part One: ' + increased);
}
partOne();
function partTwo() {
    var currTotal;
    var increased = 0;
    for (var i = 2; i < input.length; i++) {
        var total = inputArr[i] + inputArr[i - 1] + inputArr[i - 2];
        if (!!currTotal && total > currTotal) {
            increased++;
        }
        currTotal = total;
    }
    console.log('Part two: ' + increased);
}
partTwo();
//# sourceMappingURL=day1.js.map