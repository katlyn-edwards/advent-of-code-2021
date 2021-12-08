var day8;
(function (day8) {
    var input = "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\n    edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\n    fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\n    fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\n    aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\n    fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\n    dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\n    bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\n    egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\n    gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce";
    var lines = input.split('\n');
    var outputs = [];
    var prefixes = [];
    lines.forEach(function (line) {
        var parts = line.split(' | ');
        prefixes.push(parts[0]);
        outputs.push(parts[1]);
    });
    var oneLength = 2;
    var fourLength = 4;
    var sevenLength = 3;
    var eightLength = 7;
    function partOne() {
        var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var _i = 0, outputs_1 = outputs; _i < outputs_1.length; _i++) {
            var line = outputs_1[_i];
            var parts = line.split(' ');
            for (var _a = 0, parts_1 = parts; _a < parts_1.length; _a++) {
                var word = parts_1[_a];
                switch (word.length) {
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
        var sum = counts.reduce(function (prev, curr) { return prev + curr; }, 0);
        console.log("Part one: ".concat(sum));
    }
    partOne();
    function partTwo() {
        var totalOfAllOutputs = 0;
        var _loop_1 = function (i) {
            var prefix = prefixes[i];
            var output = outputs[i];
            var parts = prefix.split(' ');
            var one = [];
            var two = [];
            var three = [];
            var four = [];
            var five = [];
            var six = [];
            var seven = [];
            var eight = [];
            var nine = [];
            var zero = [];
            // find the 1
            var oneArr = parts.filter(function (val) { return val.length == oneLength; });
            one = oneArr[0].split('');
            // find the 7
            var sevenArr = parts.filter(function (val) { return val.length == sevenLength; });
            seven = sevenArr[0].split('');
            // find the 4
            var fourArr = parts.filter(function (val) { return val.length == fourLength; });
            four = fourArr[0].split('');
            // find the 8
            var eightArr = parts.filter(function (val) { return val.length == eightLength; });
            eight = eightArr[0].split('');
            // Identify what 3 is based on knowing it's length 5 and contains a one.
            var threeMaybes = parts.filter(function (val) { return val.length == 5; });
            threeMaybes.forEach(function (candidate) {
                var letters = candidate.split('');
                var found = true;
                for (var _i = 0, one_1 = one; _i < one_1.length; _i++) {
                    var char = one_1[_i];
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
            var twoMaybes = parts.filter(function (val) { return val.length == 5; });
            twoMaybes.forEach(function (candidate) {
                var letters = candidate.split('');
                var found = 0;
                for (var _i = 0, four_1 = four; _i < four_1.length; _i++) {
                    var char = four_1[_i];
                    if (letters.indexOf(char) >= 0) {
                        found++;
                    }
                }
                if (found == 2) {
                    two = letters;
                }
                else if (found == 3) {
                    // set five only if it's not already 3.
                    // idk why, but somehow I fucked this up and sometimes set my 5 to my 3.
                    var found_1 = true;
                    for (var _a = 0, three_1 = three; _a < three_1.length; _a++) {
                        var char = three_1[_a];
                        if (letters.indexOf(char) < 0) {
                            found_1 = false;
                            break;
                        }
                    }
                    if (!found_1) {
                        five = letters;
                    }
                }
            });
            // 6 chars: 0, 6, 9
            // 6 won't have one in it
            var sixMaybes = parts.filter(function (val) { return val.length == 6; });
            sixMaybes.forEach(function (candidate) {
                var letters = candidate.split('');
                var found = 0;
                for (var _i = 0, one_2 = one; _i < one_2.length; _i++) {
                    var char = one_2[_i];
                    if (letters.indexOf(char) >= 0) {
                        found++;
                    }
                }
                if (found < 2) {
                    six = letters;
                }
            });
            // 9 will have all of 3 in it
            var nineMaybes = parts.filter(function (val) { return val.length == 6; });
            nineMaybes.forEach(function (candidate) {
                var letters = candidate.split('');
                var found = 0;
                for (var _i = 0, three_2 = three; _i < three_2.length; _i++) {
                    var char = three_2[_i];
                    if (letters.indexOf(char) >= 0) {
                        found++;
                    }
                }
                if (found == three.length) {
                    nine = letters;
                }
            });
            var zeroMaybes = parts.filter(function (val) { return val.length == 6; });
            zeroMaybes.forEach(function (candidate) {
                var letters = candidate.split('');
                // not a six
                var isSix = true;
                for (var _i = 0, six_1 = six; _i < six_1.length; _i++) {
                    var char = six_1[_i];
                    if (letters.indexOf(char) < 0) {
                        isSix = false;
                        break;
                    }
                }
                // not a nine
                var isNine = true;
                for (var _a = 0, nine_1 = nine; _a < nine_1.length; _a++) {
                    var char = nine_1[_a];
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
            var result = '';
            for (var _i = 0, _a = output.split(' '); _i < _a.length; _i++) {
                var word = _a[_i];
                result += getNumberForWord(word, [zero, one, two, three, four, five, six, seven, eight, nine]);
            }
            var resultNum = Number(result);
            totalOfAllOutputs += resultNum;
        };
        for (var i = 0; i < prefixes.length; i++) {
            _loop_1(i);
        }
        console.log("Part two: ".concat(totalOfAllOutputs));
    }
    function getNumberForWord(word, numbers) {
        for (var i = 0; i < numbers.length; i++) {
            var num = numbers[i];
            if (num.length != word.length) {
                continue;
            }
            var foundAllChars = true;
            for (var _i = 0, num_1 = num; _i < num_1.length; _i++) {
                var char = num_1[_i];
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
})(day8 || (day8 = {}));
//# sourceMappingURL=day8.js.map