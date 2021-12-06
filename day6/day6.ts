namespace day6 {
    const input = `3,4,3,1,2`;

    function oneDay(school: Array<{timer: number}>) {
        let newSchool = [];
        for (let fish of school) {
            if (fish.timer == 0) {
                fish.timer = 6;
                let newFish = {timer: 8};
                newSchool.push(newFish);
            } else {
                fish.timer = fish.timer - 1;
            }
        }
        return [...newSchool, ...school];
    }

    function printSchool(school: Array<{timer: number}>) {
        let str = '';
        for (let fish of school) {
            str += fish.timer + ',';
        }
        console.log(str)
    }

    function partOne() {
        let school = input.split(',').map(el => {return {timer: Number(el)}});
        for (let i = 0; i < 80; i++) {
            school = oneDay(school);
        }
        console.log(`Part one: ${school.length}`);
    }
    partOne();

    function partTwoOneDay(counters: number[]) {
        let newFish = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < counters.length; i++) {
            let numFish = counters[i];
            if  (i == 0) {
                newFish[8] = numFish;
                newFish[6] += numFish;
            } else {
                newFish[i - 1] += numFish;
            }
        }
        return newFish;
    }

    function partTwo() {
        const school = input.split(',').map(el => {return {timer: Number(el)}});
        let counters = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let fish of school) {
            counters[fish.timer]++;
        }
        for (let i = 0; i < 256; i++) {
            counters = partTwoOneDay(counters);
        }
        let result = counters.reduce((prev, curr)=> { return prev + curr}, 0);
        console.log(`Part two: ${result}`)
    }
    partTwo();
}