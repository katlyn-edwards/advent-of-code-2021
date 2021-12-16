namespace day16 {
    const input = `9C0141080250320F1802104A08`;

    let binaryMap = new Map<string, string>([
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
    
    interface Response {
        // Current string to use.
        binaryString: number[];
        // Result of the packet.
        result: number;
    }

    function binaryToDecimal(binary: string): number {
        return parseInt(binary, 2);
    }

    // Convert from Hex to Binary
    const BITS = input.trim().split('');
    let newBinaryString = '';
    for (let char of BITS) {
        newBinaryString += binaryMap.get(char);
    }
    let totalVersionNumbers = 0;

    // Given a string of binary, parse a single packet from it.
    function parsePacket(binaryString: number[]): Response {
        let versionHeader = binaryToDecimal(binaryString.slice(0, 3).join(''));
        totalVersionNumbers += versionHeader;
        let typeId = binaryToDecimal(binaryString.slice(3, 6).join(''));
        binaryString = binaryString.slice(6);
        let parseResult: Response;
        switch (typeId) {
            case 4:
                parseResult = parseLiteralPacket(binaryString);
                break;
            default:
                parseResult = parseOperator(binaryString, typeId);
                break;
        }
        binaryString = parseResult.binaryString;
        const result = parseResult.result;
        return {binaryString, result};
    }

    function parseLiteralPacket(binaryString: number[]): Response {
        // Groups of 5 prefixed with 1 (in the 5) last is prefixed with 0, other 4 are binary
        let firstDigit: number;
        let literalRepresentation = '';
        do {
            let chunk = binaryString.slice(0, 5);
            binaryString = binaryString.slice(5);
            firstDigit = chunk.shift();
            literalRepresentation += chunk.join('');
        } while (firstDigit == 1);
        // First char is 0, thus it's the end, parse the new binary string.
        let result = binaryToDecimal(literalRepresentation);
        return {binaryString, result};
    }

    function parseOperator(binaryString: number[], typeId: number): Response {
        let lengthTypeId = binaryString.shift();
        let packets = [];
        if (lengthTypeId == 1) {
            // The next 11 bits are a number that 
            // represents the number of sub-packets immediately contained
            let numSubPackets = binaryToDecimal(binaryString.slice(0, 11).join(''));
            binaryString = binaryString.slice(11);
            for (let i = 0; i < numSubPackets; i++) {
                let packetResult = parsePacket(binaryString);
                binaryString = packetResult.binaryString;
                packets.push(packetResult.result);
            }
        } else {
            // The next 15 bits are a number that represents the total
            // length in bits of the sub-packets contained by this packet.
            let totalLength = binaryToDecimal(binaryString.slice(0,  15).join(''));
            let chopped = 0;
            binaryString = binaryString.slice(15);
            let originalLength = binaryString.length;
            while (chopped < totalLength) {
                let packetResult = parsePacket(binaryString);
                binaryString = packetResult.binaryString;
                let foundNewLength = binaryString.length;
                chopped += originalLength - foundNewLength;
                originalLength = foundNewLength;
                packets.push(packetResult.result);
            }
        }

        let result: number;
        switch (typeId) {
            case 0: // sum
                result = packets.reduce((prev, curr) => prev + curr, 0);
                break;
            case 1: // product
                result = packets.reduce((prev, curr) => prev * curr, 1);
                break;
            case 2: // minimum
                result = packets.reduce((prev, curr) => curr < prev ? curr : prev, Number.MAX_SAFE_INTEGER);
                break;
            case 3: // maximum
                result = packets.reduce((prev, curr) => curr > prev ? curr : prev, -1);
                break;
            case 5: // greater than
                if (packets.length != 2) {
                    console.log(`ERROR: greater than: ${packets}`);
                }
                result = packets[0] > packets[1] ? 1 : 0;
                break;
            case 6: // less than
                if (packets.length != 2) {
                    console.log(`ERROR: less than: ${packets}`);
                }
                result = packets[0] < packets[1] ? 1 : 0;
                break;
            case 7:  // equal
                if (packets.length != 2) {
                    console.log(`ERROR equal: ${packets}`);
                }
                result = packets[0] == packets[1] ? 1 : 0;
                break;
            default: 
                console.log(`WTF: ${typeId}`);
        }
        return {binaryString, result};
    }

    let result = parsePacket(newBinaryString.split('').map(el => Number(el)));

    function partOne() {
        console.log(`Part one: ${totalVersionNumbers}`);
    }
    partOne();

    function partTwo() {
        console.log(`Part two: ${result.result}`);
    }
    partTwo();
}