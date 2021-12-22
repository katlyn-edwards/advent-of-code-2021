namespace day20 {
    const input = `Player 1 starting position: 4
    Player 2 starting position: 8`;

    let deterministicDice = 0;
    function rollDeterministicDice(): number {
        deterministicDice++;
        if (deterministicDice > 100) {
            deterministicDice = 1;
        }
        return deterministicDice;
    }

    function playTurn(position: number): number {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            sum += rollDeterministicDice();
        }
        position += sum;
        while (position > 10) {
            position -= 10;
        }
        return position;
    }

    const quantumRolls = generateQuantumDiceRolls();

    function generateQuantumDiceRolls(): Map<number, number> {
        let sums = [];
        for (let d1 = 1; d1 < 4; d1++) {
            for (let d2 = 1; d2 < 4; d2++) {
                for (let d3 = 1; d3 < 4; d3++) {
                    sums.push(d1 + d2 + d3);
                }
            }
        }
        let rolls = new Map<number, number>();
        sums.forEach( el => {
            if (!rolls.has(el)) {
                rolls.set(el, 0);
            }
            rolls.set(el, rolls.get(el) + 1);
        })
        return rolls;
    }

    interface Player {
        position: number,
        score: number,
    }

    interface State {
        player1: Player,
        player2: Player,
        instances: number,
    }

    function playQuantumGame(players: Array<{position: number, score: number}>): number {
        let winningScore = 21;
        let player1Wins = 0;
        let player2Wins = 0;
        // Seed queue with initial state.
        let quantumStates: Array<State> = [{
            player1: {
                position: players[0].position,
                score: players[0].score,
            },
            player2: {
                position: players[1].position,
                score: players[1].score,
            },
            instances: 1,
        }];

        // While there are still unfinished games, keep playing games.
        while (quantumStates.length) {
            let game = quantumStates.shift()
            // For each player, play a turn
            quantumRolls.forEach((val, key) => {
                let oneNewPosition = game.player1.position + key;
                while (oneNewPosition > 10) {
                    oneNewPosition -= 10;
                }
                let oneNewScore = game.player1.score + oneNewPosition;
                if (oneNewScore >= winningScore) {
                    player1Wins += (val * game.instances);
                } else {
                    // Game not won, let's do player 2.
                    let twoNewPosition = game.player2.position + key;
                    while (twoNewPosition > 10) {
                        twoNewPosition -= 10;
                    }
                    let twoNewScore = game.player2.score + twoNewPosition;
                    if (twoNewScore >= winningScore) {
                        player2Wins += (val * game.instances);
                    } else {
                        // Neither won this round, enqueue for future play.
                        quantumStates.push({
                            player1: {
                                position: oneNewPosition,
                                score: oneNewScore,
                            },
                            player2: {
                                position: twoNewPosition,
                                score: twoNewScore,
                            },
                            instances: (val * game.instances),
                        })
                    }
                }
            });
        }
        console.log(`player1: ${player1Wins}, player2: ${player2Wins}`)
        return player1Wins > player2Wins ? player1Wins : player2Wins;
    }

    function parseInput(): Array<{position: number, score: number}> {
        let lines = input.split('\n').map(el => el.trim());
        let players: Array<{position: number, score: number}> = [];
        for (let line of lines) {
            let found = line.match(/Player (\d+) starting position: (\d+)/);
            if (!found) {
                console.log(`error parsing line: ${line}`);
            } else {
                players.push({position: Number(found[2]), score: 0});
            }
        }
        return players;
    }

    function playGame(players: Array<{position: number, score: number}>): number {
        let winningScore = 1000;
        let diceRoll = 0;
        let winnerResult: number|undefined;
        while (!winnerResult) {
            for (let i = 0; i < players.length; i++) {
                let player = players[i];
                let newPos = playTurn(player.position);
                diceRoll += 3;
                player.position = newPos;
                player.score += newPos;
                if (player.score >= winningScore) {
                    // Winner
                    // Return other player's score * # of dice rolls
                    winnerResult = players[(i + 1) % 2].score * diceRoll;
                }
            };
        }
        return winnerResult;
    }

    let startTime = new Date();
    console.log(`Starting timer: ${startTime.toLocaleString()}`)
    function partOne() {
        let players = parseInput();
        let result = playGame(players);
        console.log(`Part one: ${result}`);
        let partOneEnd = new Date();
        console.log(`Part one ended at ${partOneEnd.toLocaleString()}`)
        let millis = partOneEnd.getTime() - startTime.getTime();
        console.log(`Part one took ${millis} milliseconds, or ${millisToHoursMinutesAndSeconds(millis)}`);
    }
    partOne();

    function millisToHoursMinutesAndSeconds(millis: number) {
        const hours = Math.floor(millis / (60 * 60 * 1000))
        const minutes = Math.floor(millis / (60 * 1000)) % 60;
        const seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return hours + ':' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }

    function partTwo() {
        let partTwoStart = new Date();

        let players = parseInput();
        let result = playQuantumGame(players);

        console.log(`Part two: ${result}`);
        let partTwoEnd = new Date();
        let millis2 = partTwoEnd.getTime() - partTwoStart.getTime();
        let millisTotal = partTwoEnd.getTime() - startTime.getTime();
        console.log(`Part two took ${millis2} milliseconds, or ${millisToHoursMinutesAndSeconds(millis2)}`);
        console.log(`Total runtime took ${millisTotal} milliseconds, or ${millisToHoursMinutesAndSeconds(millisTotal)}`);
    }
    partTwo();
}