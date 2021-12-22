var day20;
(function (day20) {
    var input = "Player 1 starting position: 4\n    Player 2 starting position: 8";
    var deterministicDice = 0;
    function rollDeterministicDice() {
        deterministicDice++;
        if (deterministicDice > 100) {
            deterministicDice = 1;
        }
        return deterministicDice;
    }
    function playTurn(position) {
        var sum = 0;
        for (var i = 0; i < 3; i++) {
            sum += rollDeterministicDice();
        }
        position += sum;
        while (position > 10) {
            position -= 10;
        }
        return position;
    }
    var quantumRolls = generateQuantumDiceRolls();
    function generateQuantumDiceRolls() {
        var sums = [];
        for (var d1 = 1; d1 < 4; d1++) {
            for (var d2 = 1; d2 < 4; d2++) {
                for (var d3 = 1; d3 < 4; d3++) {
                    sums.push(d1 + d2 + d3);
                }
            }
        }
        var rolls = new Map();
        sums.forEach(function (el) {
            if (!rolls.has(el)) {
                rolls.set(el, 0);
            }
            rolls.set(el, rolls.get(el) + 1);
        });
        return rolls;
    }
    function playQuantumGame(players) {
        var winningScore = 21;
        var player1Wins = 0;
        var player2Wins = 0;
        // Seed queue with initial state.
        var quantumStates = [{
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
        var _loop_1 = function () {
            var game = quantumStates.shift();
            // For each player, play a turn
            quantumRolls.forEach(function (val, key) {
                var oneNewPosition = game.player1.position + key;
                while (oneNewPosition > 10) {
                    oneNewPosition -= 10;
                }
                var oneNewScore = game.player1.score + oneNewPosition;
                if (oneNewScore >= winningScore) {
                    player1Wins += (val * game.instances);
                }
                else {
                    // Game not won, let's do player 2.
                    var twoNewPosition = game.player2.position + key;
                    while (twoNewPosition > 10) {
                        twoNewPosition -= 10;
                    }
                    var twoNewScore = game.player2.score + twoNewPosition;
                    if (twoNewScore >= winningScore) {
                        player2Wins += (val * game.instances);
                    }
                    else {
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
                        });
                    }
                }
            });
        };
        // While there are still unfinished games, keep playing games.
        while (quantumStates.length) {
            _loop_1();
        }
        console.log("player1: ".concat(player1Wins, ", player2: ").concat(player2Wins));
        return player1Wins > player2Wins ? player1Wins : player2Wins;
    }
    function parseInput() {
        var lines = input.split('\n').map(function (el) { return el.trim(); });
        var players = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var found = line.match(/Player (\d+) starting position: (\d+)/);
            if (!found) {
                console.log("error parsing line: ".concat(line));
            }
            else {
                players.push({ position: Number(found[2]), score: 0 });
            }
        }
        return players;
    }
    function playGame(players) {
        var winningScore = 1000;
        var diceRoll = 0;
        var winnerResult;
        while (!winnerResult) {
            for (var i = 0; i < players.length; i++) {
                var player = players[i];
                var newPos = playTurn(player.position);
                diceRoll += 3;
                player.position = newPos;
                player.score += newPos;
                if (player.score >= winningScore) {
                    // Winner
                    // Return other player's score * # of dice rolls
                    winnerResult = players[(i + 1) % 2].score * diceRoll;
                }
            }
            ;
        }
        return winnerResult;
    }
    var startTime = new Date();
    console.log("Starting timer: ".concat(startTime.toLocaleString()));
    function partOne() {
        var players = parseInput();
        var result = playGame(players);
        console.log("Part one: ".concat(result));
        var partOneEnd = new Date();
        console.log("Part one ended at ".concat(partOneEnd.toLocaleString()));
        var millis = partOneEnd.getTime() - startTime.getTime();
        console.log("Part one took ".concat(millis, " milliseconds, or ").concat(millisToHoursMinutesAndSeconds(millis)));
    }
    partOne();
    function millisToHoursMinutesAndSeconds(millis) {
        var hours = Math.floor(millis / (60 * 60 * 1000));
        var minutes = Math.floor(millis / (60 * 1000)) % 60;
        var seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return hours + ':' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
    function partTwo() {
        var partTwoStart = new Date();
        var players = parseInput();
        var result = playQuantumGame(players);
        console.log("Part two: ".concat(result));
        var partTwoEnd = new Date();
        var millis2 = partTwoEnd.getTime() - partTwoStart.getTime();
        var millisTotal = partTwoEnd.getTime() - startTime.getTime();
        console.log("Part two took ".concat(millis2, " milliseconds, or ").concat(millisToHoursMinutesAndSeconds(millis2)));
        console.log("Total runtime took ".concat(millisTotal, " milliseconds, or ").concat(millisToHoursMinutesAndSeconds(millisTotal)));
    }
    partTwo();
})(day20 || (day20 = {}));
//# sourceMappingURL=day21.js.map