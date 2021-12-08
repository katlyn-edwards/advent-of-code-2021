namespace day8 {
    const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
    edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
    fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
    fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
    aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
    fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
    dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
    bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
    egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
    gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
    const lines = input.split('\n');
    let outputs = [];
    let prefixes = [];
    lines.forEach((line) => {
        const parts = line.split(' | ');
        prefixes.push(parts[0]);
        outputs.push(parts[1]);
    });

    const oneLength = 2;
    const fourLength = 4;
    const sevenLength  = 3;
    const eightLength = 7;

    function partOne() {
        let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let line of outputs) {
            const parts = line.split(' ');
            for (let word of parts) {
                switch(word.length) {
                    case oneLength:
                        counts[0]++;
                        break;
                    case fourLength:
                        counts[1]++;
                        break;
                    case sevenLength:
                        counts[2]++;
                        break;
                    case eightLength:
                        counts[3]++;
                        break;
                    default:
                        break;
                }
            }
        }

        let sum = counts.reduce((prev, curr) => prev + curr, 0);
        console.log(`Part one: ${sum}`);
    }
    partOne();

    function partTwo() {
        let totalOfAllOutputs = 0;
        for (let i = 0; i < prefixes.length; i++) {
            let prefix = prefixes[i];
            let output = outputs[i];

            const parts = prefix.split(' ');
            let one = [];
            let two = [];
            let three = [];
            let four = [];
            let five = [];
            let six = [];
            let seven = [];
            let eight = [];
            let nine = [];
            let zero = [];
            // find the 1
            const oneArr = parts.filter((val: string) => val.length == oneLength);
            one = oneArr[0].split('');
            // find the 7
            const sevenArr = parts.filter((val: string) => val.length == sevenLength);
            seven = sevenArr[0].split('');
            // find the 4
            const fourArr = parts.filter((val: string) => val.length == fourLength);
            four = fourArr[0].split('');
            // find the 8
            const eightArr = parts.filter((val: string) => val.length == eightLength);
            eight = eightArr[0].split('');

            // Identify what 3 is based on knowing it's length 5 and contains a one.
            const threeMaybes = parts.filter((val: string) => val.length == 5);
            threeMaybes.forEach((candidate: string) => {
                let letters = candidate.split('');
                let found = true;
                for (let char of one) {
                    if (letters.indexOf(char) < 0) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    three = letters;
                }
            });

            // 5 chars: 2, 3, 5, 
            // 2 will have two parts of 4, whereas 5 will have 3 parts of 4
            // let's do 2 first
            const twoMaybes = parts.filter((val: string) => val.length == 5);
            twoMaybes.forEach((candidate: string) => {
                let letters = candidate.split('');
                let found = 0;
                for (let char of four) {
                    if (letters.indexOf(char) >= 0) {
                        found++;
                    }
                }
                if (found == 2) {
                    two = letters;
                } else if (found == 3) {
                    // set five only if it's not already 3.
                    // idk why, but somehow I fucked this up and sometimes set my 5 to my 3.
                    let found = true;
                    for (let char of three) {
                        if (letters.indexOf(char) < 0) {
                            found = false;
                            break;
                        }
                    }
                     if (!found) {
                        five = letters;
                     } 
                }
            });

            // 6 chars: 0, 6, 9
            // 6 won't have one in it
            const sixMaybes = parts.filter((val: string) => val.length == 6);
            sixMaybes.forEach((candidate: string) => {
                let letters = candidate.split('');
                let found = 0;
                for (let char of one) {
                    if (letters.indexOf(char) >= 0) {
                        found++;
                    }
                }
                if (found < 2) {
                    six = letters;
                }
            });

            // 9 will have all of 3 in it
            const nineMaybes = parts.filter((val: string) => val.length == 6);
            nineMaybes.forEach((candidate: string) => {
                let letters = candidate.split('');
                let found = 0;
                for (let char of three) {
                    if (letters.indexOf(char) >= 0) {
                        found++;
                    }
                }
                if (found == three.length) {
                    nine = letters;
                }
            });

            const zeroMaybes = parts.filter((val: string) => val.length == 6);
            zeroMaybes.forEach((candidate: string) => {
                let letters = candidate.split('');
                // not a six
                let isSix = true;
                for (let char of six) {
                    if (letters.indexOf(char) < 0) {
                        isSix = false;
                        break;
                    }
                }
                // not a nine
                let isNine = true;
                for (let char of nine) {
                    if (letters.indexOf(char) < 0) {
                        isNine = false;
                        break;
                    }
                }
                if (!isSix && !isNine) {
                    zero = letters;
                }
            });
            // OK now I have all the nubmers, parse the output
            let result = '';
            for (let word of output.split(' ')) {
                result += getNumberForWord(word, [zero, one, two, three, four, five, six, seven, eight, nine]);
            }
            const resultNum = Number(result);
            totalOfAllOutputs += resultNum;
        }

        console.log(`Part two: ${totalOfAllOutputs}`);
    }

    function getNumberForWord(word, numbers) {
        for (let i = 0; i < numbers.length; i++) {
            let num = numbers[i];
            if (num.length != word.length) {
                continue;
            }
            let foundAllChars = true;
            for (let char of num) {
                if (word.indexOf(char) < 0) {
                    foundAllChars = false;
                    break;
                }
            }
            if (foundAllChars) {
                return i;
            }
        }
    }
    partTwo();
}