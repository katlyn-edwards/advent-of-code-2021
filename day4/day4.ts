/** 
 * big caveat: 
 * it's been brought to my attention this doesn't handle
 * a bunch of important edge cases:
 *  - a false positive bingo because 0 is present in the row/col already
 *  - marking a called number on boards after a winning board has been spotted
 *  - removing multiple winners from a number being called
 */

namespace day4 {
    const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

    22 13 17 11  0
     8  2 23  4 24
    21  9 14 16  7
     6 10  3 18  5
     1 12 20 15 19
    
     3 15  0  2 22
     9 18 13 17  5
    19  8  7 25 23
    20 11 10 24  4
    14 21 16 12  6
    
    14 21 17 24  4
    10 16 15  9 19
    18  8 23 26 20
    22 11 13  6  5
     2  0 12  3  7`;
    const inputArr = input.split('\n').map(line => line.trim());
    const numbersLine = inputArr.shift();
    const numbersToCall = numbersLine.split(',').map(el => Number(el));
    console.log(`numbers to call: ${numbersToCall}`);
    // Drop blank line
    inputArr.shift();
    const boards = inputArr.join('\n').split('\n\n');
    // cleanup formatting of boards
    const formattedBoards = [];
    for (let board of boards) {
        const newBoard = [];
        const lines = board.split('\n');
        for (let line of lines) {
            const nums = line.split(/[ ]+/).map(el => Number(el));
            newBoard.push(nums);
        }
        formattedBoards.push(newBoard);
    }

    for (let board of formattedBoards) {
        console.log("------")
        print2DArray(board);
        console.log("------")
    }

    function print2DArray(arr: number[][]): void {
        for (let i = 0; i < arr.length; i++) {
            let line = '';
            for (let j = 0; j < arr[0].length; j++) {
                line += arr[i][j] + '\t';
            }
            console.log(line);
        }
    }

    function checkBingo(board: number[][]): boolean {
        // Check horzontals
        for (let i = 0; i < board.length; i++) {
            if (board[i].reduce((prev: number, curr: number): number => {
                return prev + curr;
            }, 0) == 0) {
                // All zeros in the row, must be a winner.
                return true;
            }
        }

        // Check verticals
        for (let i = 0; i < board[0].length; i++) {
            let sum = 0;
            for (let j = 0; j < board.length; j++) {
                sum += board[j][i];
            }
            if (sum == 0) {
                return true;
            }
        }
        return false;
    }

    function zeroOutNumber(board: number[][], num: number): void {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] == num) {
                    board[i][j] = 0;
                }
            }
        }
    }

    function playBingo(): {board: number[][], num: number} {
        for (let num of numbersToCall) {
            // Zero out number in each board.
            // Check if winner.
            for (let board of formattedBoards) {
                zeroOutNumber(board, num);
                if (checkBingo(board)) {
                    return {board, num};
                }
            }
        }
    }

    function totalBoard(board: number[][]): number {
        let boardSum = 0;
        for (let i = 0; i < board.length; i++) {
            boardSum += board[i].reduce((prev: number, curr: number): number => {
                return curr + prev;
            }, 0);
        }
        return boardSum;
    }

    function partOne() {
        const result = playBingo();
        const num = result.num;
        const boardSum = totalBoard(result.board);
        console.log(`Part one: ${boardSum} ${num} ${boardSum * num}`);
    }
    partOne();

    function partTwo() {
        while (formattedBoards.length > 1) {
            const result = playBingo();
            for (let i = 0; i < formattedBoards.length; i++) {
                if (formattedBoards[i] == result.board) {
                    formattedBoards.splice(i, 1);
                    break;
                }
            }
        }

        const result = playBingo();
        const boardSum = totalBoard(result.board);
        console.log(`Part two: ${boardSum} ${result.num} ${boardSum * result.num}`)
    }
    partTwo();
}