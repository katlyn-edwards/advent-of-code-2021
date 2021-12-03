namespace day1 {
    const input = `199
200
208
210
200
207
240
269
260
    263`;
    const inputArr = input.split(`\n`).map((el)=> Number(el));

    function partOne() {
        let increased = 0;
        for (let i = 1; i < input.length; i++) {
            if (inputArr[i] > inputArr[i-1]) {
                increased++;
            }
        }
        console.log(`Part one: ${increased}`);
    }

    partOne();

    function partTwo() {
        let currTotal;
        let increased = 0;
        for (let i = 2; i < input.length; i++) {
            let total = inputArr[i] + inputArr[i - 1] + inputArr[i - 2];
            if (!!currTotal && total > currTotal) {
                increased++;
            }
            currTotal = total;
        }
        console.log(`Part two: ${increased}`);
    }

    partTwo();
}