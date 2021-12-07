namespace day7 {
    const input = `16,1,2,0,4,2,7,1,2,14`;
    const nums = input.split(',').map(el => Number(el));
    const sorted = nums.slice().sort((a, b) => {return a - b});
    const middleIndex = nums.length / 2;
    const median = Math.round(middleIndex);
    const linearAlignment = sorted[median];
    const sum = nums.reduce((prev, cur) => {
        return prev + cur;
    }, 0);
    console.log(`Unrounded average: ${sum / nums.length}`);
    const average = Math.round(sum / nums.length);
    
    function calcFuel() {
        let fuel = 0;
        for (let num of nums) {
            fuel += Math.abs(num - linearAlignment);
        }
        return fuel;
    }
    
    function factorialButNot(num: number): number {
        if (num === 0) {
            return 0;
        } else {
            return num + factorialButNot( num - 1 );
        }
    }

    function calcFuelIncreasingUsingAverage(): number {
        let fuel = 0; 
        for (let num of nums) {
            fuel += factorialButNot(Math.abs(num - average));
        }
        return fuel;
    }

    function calcFuelIncreasingUsingBruteForce(location: number): number {
        let fuel = 0; 
        for (let num of nums) {
            fuel += factorialButNot(Math.abs(num - location));
        }
        return fuel;
    }

    function partOne() {
        const fuel = calcFuel();
        console.log(`Part one: ${linearAlignment}, ${fuel}`);
    }
    partOne();

    function partTwo() {
        // This didn't work???
        const averageFuel = calcFuelIncreasingUsingAverage();
        console.log(`Part two (WRONG): ${average} ${averageFuel}`);

        // Brute force method.
        let arr = [];
        for (let i = 0; i <= sorted[sorted.length - 1]; i++) {
            arr.push(calcFuelIncreasingUsingBruteForce(i));
        }

        let index = 0;
        let min = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                index = i;
                min = arr[i];
            }
        }
        console.log(`Part two: ${index} ${min}`);
    }
    partTwo();
}