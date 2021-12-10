namespace day10 {
    const input = `[({(<(())[]>[[{[]{<()<>>
        [(()[<>])]({[<{<<[]>>(
        {([(<{}[<>[]}>{[]{[(<()>
        (((({<>}<{<{<>}{[]{[]{}
        [[<[([]))<([[{}[[()]]]
        [{[{({}]{}}([{[{{{}}([]
        {<[[]]>}<{[{[{[]{()[[[]
        [<(<(<(<{}))><([]([]()
        <{([([[(<>()){}]>(<<{{
        <{([{{}}[<[[[<>{}]]]>[]]`;

    const lines = input.split('\n').map(el => el.trim());

    const openers = ['(', '[', '{', '<'];
    const closers = [')', ']', '}', '>'];
    
    function isLegalLine(line: string): {invalid?: string, stack?: string[]} {
        let stack = [];
        let arr = line.split('')
        for (let i = 0; i < arr.length; i++) {
            let char = arr[i];
            if (openers.indexOf(char) >= 0) {
                stack.push(char);
            } else if (closers.indexOf(char) >= 0) {
                let index = closers.indexOf(char)
                if (stack[stack.length - 1] !== openers[index]) {
                    // Error 
                    return {invalid: char};
                } else {
                    stack.pop();
                }
            }  else {
                console.log(`Unexpected char: ${char}`);
            }
        }

        // Incomplete.
        if (stack.length != 0) {
            return {stack};
        }
        return {};
    }

    function partOne() {
        let total = 0;
        for (let line of lines) {
            let res = isLegalLine(line);
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
        console.log(`Part one: ${total}`);
    }
    partOne();

    function completeLine(stack: string[]) {
        let res = '';
        for (let i = 0; i < stack.length; i++) {
            let opener = stack[stack.length - 1 - i];
            let index = openers.indexOf(opener);
            let closer = closers[index];
            res += closer;
        }
        return res;
    }

    function partTwo() {
        let lineInfo = lines.map(line =>  isLegalLine(line));
        let stacks = lineInfo.map(info => info.stack).filter(stack => !!stack);
        let scores = [];
        for (let stack of stacks) {
            let total = 0;
            let res = completeLine(stack);
            for (let char of res) {
                total = total * 5;
                let index = closers.indexOf(char);
                total += index + 1;
            }
            scores.push(total);
        }
        let sorted = scores.sort((a, b) => a - b);
        let chosen = sorted[Math.round((sorted.length -1)/ 2)];
        console.log(`Part two: ${chosen}`);
    }
    partTwo();
}