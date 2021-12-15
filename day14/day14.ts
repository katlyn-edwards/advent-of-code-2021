namespace day14 {
    const input = `NNCB

    CH -> B
    HH -> N
    CB -> H
    NH -> C
    HB -> C
    HC -> B
    HN -> C
    NN -> C
    BH -> H
    NC -> B
    NB -> B
    BN -> B
    BB -> N
    BC -> B
    CC -> N
    CN -> C`;

    const clean = input.split(`\n`).map(el => el.trim());
    const joined = clean.join('\n');
    let parts = joined.split('\n\n');
    let startCode = parts[0];
    let instructions = parts[1];
    let lines = instructions.split('\n');

    let map = new Map<string, string>();
    for (let line of lines) {
        let p = line.split(' -> ');
        map.set(p[0], p[1]);
    }

    function applyTransformations(map: Map<string, string>, start: string) {
        let modifications = start.split('');
        let inserted = 0;
        for (let i = 1; i < start.length; i++) {
            let pair = start[i - 1] + start[i];
            if (map.has(pair)) {
                let first = modifications.slice(0, i + inserted);
                let second = modifications.slice(i + inserted);
                modifications = [...first, map.get(pair), ...second];
                inserted++;
            }
        }
        return modifications;
    }

    function partOne() {
        let code = startCode;
        for (let i = 0; i < 10; i++) {
            let result = applyTransformations(map, code);
            code = result.join('');
        }

        let counts = new Map<string, number>();
        let chars = code.split('');
        chars.forEach(char => {
            if (!counts.has(char)) {
                counts.set(char, 0);
            }
            counts.set(char, counts.get(char) + 1);
        });
        let min = Number.MAX_SAFE_INTEGER; 
        let max = 0;
        counts.forEach((val, key) => {
            if (val > max) {
                max = val;
            }
            if (val < min) {
                min = val;
            }
        });
        console.log(`Part one: ${max - min} `);
    }
    partOne();

    function applyTransformations2(map: Map<string, string>, start: Map<string, number>) {
        let resultMap = new Map<string, number>();
        start.forEach((counts, pair) => {
            if (map.has(pair)) {
                let transformChar = map.get(pair);
                let totalCounts = counts;
                let first = pair[0] + transformChar;
                if (resultMap.has(first)) {
                    totalCounts += resultMap.get(first);
                }
                resultMap.set(first, totalCounts);

                let totalCounts2 = counts;
                let second = transformChar + pair[1];
                if (resultMap.has(second)) {
                    totalCounts2 += resultMap.get(second);
                }
                resultMap.set(second, totalCounts2);
            } else {
                resultMap.set(pair, counts);
            }
        });
        return resultMap;
    }

    function partTwo() {
        let code = startCode;
        let initialPairs = new Map<string, number>();
        for (let i = 1; i < code.length; i++) {
            let pair = code[i - 1] + code[i];
            initialPairs.set(pair, 1);
        };

        for (let i = 0; i < 40; i++) {
            let resultMap = applyTransformations2(map, initialPairs);
            initialPairs = resultMap;
        }

        let counts = new Map<string, number>();
        let lastLetter = startCode[startCode.length - 1];
        initialPairs.forEach((count, pair) => {
            pair.split('');
            if (!counts.has(pair[0])) {
                counts.set(pair[0], 0);
            }
            // Only count first item in pair, except for last one.
            counts.set(pair[0], counts.get(pair[0]) + count);
        });

        counts.set(lastLetter, counts.get(lastLetter) + 1);

        let min = Number.MAX_SAFE_INTEGER; 
        let max = 0;
        counts.forEach((val, key) => {
            if (val > max) {
                max = val;
            }
            if (val < min) {
                min = val;
            }
        });
        console.log(`Part two: ${max - min} `);
    }
    partTwo();
}