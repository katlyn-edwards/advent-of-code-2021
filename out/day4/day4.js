/**
 * big caveat:
 * it's been brought to my attention this doesn't handle
 * a bunch of important edge cases:
 *  - a false positive bingo because 0 is present in the row/col already
 *  - marking a called number on boards after a winning board has been spotted
 *  - removing multiple winners from a number being called
 */
var day4;
(function (day4) {
    var input = "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n    22 13 17 11  0\n     8  2 23  4 24\n    21  9 14 16  7\n     6 10  3 18  5\n     1 12 20 15 19\n    \n     3 15  0  2 22\n     9 18 13 17  5\n    19  8  7 25 23\n    20 11 10 24  4\n    14 21 16 12  6\n    \n    14 21 17 24  4\n    10 16 15  9 19\n    18  8 23 26 20\n    22 11 13  6  5\n     2  0 12  3  7";
    var inputArr = input.split('\n').map(function (line) { return line.trim(); });
    var numbersLine = inputArr.shift();
    var numbersToCall = numbersLine.split(',').map(function (el) { return Number(el); });
    console.log("numbers to call: ".concat(numbersToCall));
    // Drop blank line
    inputArr.shift();
    var boards = inputArr.join('\n').split('\n\n');
    // cleanup formatting of boards
    var formattedBoards = [];
    for (var _i = 0, boards_1 = boards; _i < boards_1.length; _i++) {
        var board = boards_1[_i];
        var newBoard = [];
        var lines = board.split('\n');
        for (var _a = 0, lines_1 = lines; _a < lines_1.length; _a++) {
            var line = lines_1[_a];
            var nums = line.split(/[ ]+/).map(function (el) { return Number(el); });
            newBoard.push(nums);
        }
        formattedBoards.push(newBoard);
    }
    for (var _b = 0, formattedBoards_1 = formattedBoards; _b < formattedBoards_1.length; _b++) {
        var board = formattedBoards_1[_b];
        console.log("------");
        print2DArray(board);
        console.log("------");
    }
    function print2DArray(arr) {
        for (var i = 0; i < arr.length; i++) {
            var line = '';
            for (var j = 0; j < arr[0].length; j++) {
                line += arr[i][j] + '\t';
            }
            console.log(line);
        }
    }
    function checkBingo(board) {
        // Check horzontals
        for (var i = 0; i < board.length; i++) {
            if (board[i].reduce(function (prev, curr) {
                return prev + curr;
            }, 0) == 0) {
                // All zeros in the row, must be a winner.
                return true;
            }
        }
        // Check verticals
        for (var i = 0; i < board[0].length; i++) {
            var sum = 0;
            for (var j = 0; j < board.length; j++) {
                sum += board[j][i];
            }
            if (sum == 0) {
                return true;
            }
        }
        return false;
    }
    function zeroOutNumber(board, num) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j] == num) {
                    board[i][j] = 0;
                }
            }
        }
    }
    function playBingo() {
        for (var _i = 0, numbersToCall_1 = numbersToCall; _i < numbersToCall_1.length; _i++) {
            var num = numbersToCall_1[_i];
            // Zero out number in each board.
            // Check if winner.
            for (var _a = 0, formattedBoards_2 = formattedBoards; _a < formattedBoards_2.length; _a++) {
                var board = formattedBoards_2[_a];
                zeroOutNumber(board, num);
                if (checkBingo(board)) {
                    return { board: board, num: num };
                }
            }
        }
    }
    function totalBoard(board) {
        var boardSum = 0;
        for (var i = 0; i < board.length; i++) {
            boardSum += board[i].reduce(function (prev, curr) {
                return curr + prev;
            }, 0);
        }
        return boardSum;
    }
    function partOne() {
        var result = playBingo();
        var num = result.num;
        var boardSum = totalBoard(result.board);
        console.log("Part one: ".concat(boardSum, " ").concat(num, " ").concat(boardSum * num));
    }
    partOne();
    function partTwo() {
        while (formattedBoards.length > 1) {
            var result_1 = playBingo();
            for (var i = 0; i < formattedBoards.length; i++) {
                if (formattedBoards[i] == result_1.board) {
                    formattedBoards.splice(i, 1);
                    break;
                }
            }
        }
        var result = playBingo();
        var boardSum = totalBoard(result.board);
        console.log("Part two: ".concat(boardSum, " ").concat(result.num, " ").concat(boardSum * result.num));
    }
    partTwo();
})(day4 || (day4 = {}));
//# sourceMappingURL=day4.js.map