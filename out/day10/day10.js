var day10;
(function (day10) {
    var input = "[({(<(())[]>[[{[]{<()<>>\n        [(()[<>])]({[<{<<[]>>(\n        {([(<{}[<>[]}>{[]{[(<()>\n        (((({<>}<{<{<>}{[]{[]{}\n        [[<[([]))<([[{}[[()]]]\n        [{[{({}]{}}([{[{{{}}([]\n        {<[[]]>}<{[{[{[]{()[[[]\n        [<(<(<(<{}))><([]([]()\n        <{([([[(<>()){}]>(<<{{\n        <{([{{}}[<[[[<>{}]]]>[]]";
    var lines = input.split('\n').map(function (el) { return el.trim(); });
    var openers = ['(', '[', '{', '<'];
    var closers = [')', ']', '}', '>'];
    function isLegalLine(line) {
        var stack = [];
        var arr = line.split('');
        for (var i = 0; i < arr.length; i++) {
            var char = arr[i];
            if (openers.indexOf(char) >= 0) {
                stack.push(char);
            }
            else if (closers.indexOf(char) >= 0) {
                var index = closers.indexOf(char);
                if (stack[stack.length - 1] !== openers[index]) {
                    // Error 
                    return { invalid: char };
                }
                else {
                    stack.pop();
                }
            }
            else {
                console.log("Unexpected char: ".concat(char));
            }
        }
        // Incomplete.
        if (stack.length != 0) {
            return { stack: stack };
        }
        return {};
    }
    function partOne() {
        var total = 0;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var res = isLegalLine(line);
            switch (res.invalid) {
                case ')':
                    total += 3;
                    break;
                case ']':
                    total += 57;
                    break;
                case '}':
                    total += 1197;
                    break;
                case '>':
                    total += 25137;
                    break;
                default:
                    break;
            }
        }
        console.log("Part one: ".concat(total));
    }
    partOne();
    function completeLine(stack) {
        var res = '';
        for (var i = 0; i < stack.length; i++) {
            var opener_1 = stack[stack.length - 1 - i];
            var index = openers.indexOf(opener_1);
            var closer = closers[index];
            res += closer;
        }
        return res;
    }
    function partTwo() {
        var lineInfo = lines.map(function (line) { return isLegalLine(line); });
        var stacks = lineInfo.map(function (info) { return info.stack; }).filter(function (stack) { return !!stack; });
        var scores = [];
        for (var _i = 0, stacks_1 = stacks; _i < stacks_1.length; _i++) {
            var stack = stacks_1[_i];
            var total = 0;
            var res = completeLine(stack);
            for (var _a = 0, res_1 = res; _a < res_1.length; _a++) {
                var char = res_1[_a];
                total = total * 5;
                var index = closers.indexOf(char);
                total += index + 1;
            }
            scores.push(total);
        }
        var sorted = scores.sort(function (a, b) { return a - b; });
        var chosen = sorted[Math.round((sorted.length - 1) / 2)];
        console.log("Part two: ".concat(chosen));
    }
    partTwo();
})(day10 || (day10 = {}));
//# sourceMappingURL=day10.js.map