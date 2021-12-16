var day16;
(function (day16) {
    var input = "9C0141080250320F1802104A08";
    var binaryMap = new Map([
        ['0', '0000'],
        ['1', '0001'],
        ['2', '0010'],
        ['3', '0011'],
        ['4', '0100'],
        ['5', '0101'],
        ['6', '0110'],
        ['7', '0111'],
        ['8', '1000'],
        ['9', '1001'],
        ['A', '1010'],
        ['B', '1011'],
        ['C', '1100'],
        ['D', '1101'],
        ['E', '1110'],
        ['F', '1111'],
    ]);
    function binaryToDecimal(binary) {
        return parseInt(binary, 2);
    }
    // Convert from Hex to Binary
    var BITS = input.trim().split('');
    var newBinaryString = '';
    for (var _i = 0, BITS_1 = BITS; _i < BITS_1.length; _i++) {
        var char = BITS_1[_i];
        newBinaryString += binaryMap.get(char);
    }
    var totalVersionNumbers = 0;
    // Given a string of binary, parse a single packet from it.
    function parsePacket(binaryString) {
        var versionHeader = binaryToDecimal(binaryString.slice(0, 3).join(''));
        totalVersionNumbers += versionHeader;
        var typeId = binaryToDecimal(binaryString.slice(3, 6).join(''));
        binaryString = binaryString.slice(6);
        var parseResult;
        switch (typeId) {
            case 4:
                parseResult = parseLiteralPacket(binaryString);
                break;
            default:
                parseResult = parseOperator(binaryString, typeId);
                break;
        }
        binaryString = parseResult.binaryString;
        var result = parseResult.result;
        return { binaryString: binaryString, result: result };
    }
    function parseLiteralPacket(binaryString) {
        // Groups of 5 prefixed with 1 (in the 5) last is prefixed with 0, other 4 are binary
        var firstDigit;
        var literalRepresentation = '';
        do {
            var chunk = binaryString.slice(0, 5);
            binaryString = binaryString.slice(5);
            firstDigit = chunk.shift();
            literalRepresentation += chunk.join('');
        } while (firstDigit == 1);
        // First char is 0, thus it's the end, parse the new binary string.
        var result = binaryToDecimal(literalRepresentation);
        return { binaryString: binaryString, result: result };
    }
    function parseOperator(binaryString, typeId) {
        var lengthTypeId = binaryString.shift();
        var packets = [];
        if (lengthTypeId == 1) {
            // The next 11 bits are a number that 
            // represents the number of sub-packets immediately contained
            var numSubPackets = binaryToDecimal(binaryString.slice(0, 11).join(''));
            binaryString = binaryString.slice(11);
            for (var i = 0; i < numSubPackets; i++) {
                var packetResult = parsePacket(binaryString);
                binaryString = packetResult.binaryString;
                packets.push(packetResult.result);
            }
        }
        else {
            // The next 15 bits are a number that represents the total
            // length in bits of the sub-packets contained by this packet.
            var totalLength = binaryToDecimal(binaryString.slice(0, 15).join(''));
            var chopped = 0;
            binaryString = binaryString.slice(15);
            var originalLength = binaryString.length;
            while (chopped < totalLength) {
                var packetResult = parsePacket(binaryString);
                binaryString = packetResult.binaryString;
                var foundNewLength = binaryString.length;
                chopped += originalLength - foundNewLength;
                originalLength = foundNewLength;
                packets.push(packetResult.result);
            }
        }
        var result;
        switch (typeId) {
            case 0: // sum
                result = packets.reduce(function (prev, curr) { return prev + curr; }, 0);
                break;
            case 1: // product
                result = packets.reduce(function (prev, curr) { return prev * curr; }, 1);
                break;
            case 2: // minimum
                result = packets.reduce(function (prev, curr) { return curr < prev ? curr : prev; }, Number.MAX_SAFE_INTEGER);
                break;
            case 3: // maximum
                result = packets.reduce(function (prev, curr) { return curr > prev ? curr : prev; }, -1);
                break;
            case 5: // greater than
                if (packets.length != 2) {
                    console.log("ERROR: greater than: ".concat(packets));
                }
                result = packets[0] > packets[1] ? 1 : 0;
                break;
            case 6: // less than
                if (packets.length != 2) {
                    console.log("ERROR: less than: ".concat(packets));
                }
                result = packets[0] < packets[1] ? 1 : 0;
                break;
            case 7: // equal
                if (packets.length != 2) {
                    console.log("ERROR equal: ".concat(packets));
                }
                result = packets[0] == packets[1] ? 1 : 0;
                break;
            default:
                console.log("WTF: ".concat(typeId));
        }
        return { binaryString: binaryString, result: result };
    }
    var result = parsePacket(newBinaryString.split('').map(function (el) { return Number(el); }));
    function partOne() {
        console.log("Part one: ".concat(totalVersionNumbers));
    }
    partOne();
    function partTwo() {
        console.log("Part two: ".concat(result.result));
    }
    partTwo();
})(day16 || (day16 = {}));
//# sourceMappingURL=day16.js.map