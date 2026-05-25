// Pure TypeScript QR Code generator (Version 1-10, Low/Medium Error Correction)
// Ported/simplified for lightweight, zero-dependency use.

type QRMode = 'Numeric' | 'Alphanumeric' | 'Byte';

interface QRBlock {
    dataCount: number;
    data: number[];
}

export function qrcode(text: string, errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M'): boolean[][] {
    const typeNumber = getVersionNeeded(text, errorCorrectionLevel);
    const modules: (boolean | null)[][] = [];
    const moduleCount = typeNumber * 4 + 17;

    for (let row = 0; row < moduleCount; row++) {
        modules[row] = [];
        for (let col = 0; col < moduleCount; col++) {
            modules[row][col] = null;
        }
    }

    // 1. Finder patterns
    setupFinderPattern(modules, 0, 0, moduleCount);
    setupFinderPattern(modules, moduleCount - 7, 0, moduleCount);
    setupFinderPattern(modules, 0, moduleCount - 7, moduleCount);

    // 2. Alignment patterns
    setupAlignmentPattern(modules, typeNumber);

    // 3. Timing patterns
    for (let r = 8; r < moduleCount - 8; r++) {
        if (modules[r][6] !== null) continue;
        modules[r][6] = (r % 2 === 0);
    }
    for (let c = 8; c < moduleCount - 8; c++) {
        if (modules[6][c] !== null) continue;
        modules[6][c] = (c % 2 === 0);
    }

    // 4. Format Info & Version Info (Reserved spaces)
    setupReservedSpace(modules, moduleCount);

    // 5. Data encoding & block structures
    const data = encodeData(text, typeNumber, errorCorrectionLevel);
    const totalCodewords = getCodewordCount(typeNumber);
    const ecCodewords = getECCodewordCount(typeNumber, errorCorrectionLevel);
    const dataCodewords = totalCodewords - ecCodewords;

    const blocks = partitionBlocks(data, typeNumber, errorCorrectionLevel);
    const interleaved = interleaveBlocks(blocks, dataCodewords, ecCodewords);

    // 6. Map data bits into matrix
    mapData(modules, interleaved, moduleCount);

    // 7. Data Masking & Evaluation
    const bestMask = getBestMask(modules, moduleCount, errorCorrectionLevel);
    applyMask(modules, bestMask, moduleCount);

    // 8. Draw Format Info (which depends on mask)
    drawFormatInfo(modules, errorCorrectionLevel, bestMask, moduleCount);

    // Convert any remaining null to false
    const finalGrid: boolean[][] = [];
    for (let r = 0; r < moduleCount; r++) {
        finalGrid[r] = [];
        for (let c = 0; c < moduleCount; c++) {
            finalGrid[r][c] = modules[r][c] || false;
        }
    }

    return finalGrid;
}

function getVersionNeeded(text: string, ecLevel: 'L' | 'M' | 'Q' | 'H'): number {
    const len = text.length;
    // Capacity for Byte mode (8-bit bytes)
    const capacities: Record<string, number[]> = {
        'L': [0, 17, 32, 53, 78, 106, 134, 154, 192, 230, 271],
        'M': [0, 14, 26, 42, 62, 84, 106, 122, 152, 180, 213],
        'Q': [0, 11, 20, 32, 46, 60, 74, 86, 108, 130, 151],
        'H': [0, 7, 14, 24, 34, 44, 58, 64, 84, 100, 119]
    };
    const caps = capacities[ecLevel];
    const minVersion = 4; // Force at least Version 4 for perfect grid sizing uniformity across cards
    for (let v = 1; v < caps.length; v++) {
        if (len <= caps[v]) return Math.max(minVersion, v);
    }
    return Math.max(minVersion, 10); // Fallback / Max supported version
}

function setupFinderPattern(modules: (boolean | null)[][], row: number, col: number, size: number) {
    for (let r = -1; r <= 7; r++) {
        if (row + r < 0 || row + r >= size) continue;
        for (let c = -1; c <= 7; c++) {
            if (col + c < 0 || col + c >= size) continue;
            if ((0 <= r && r <= 6 && (c === 0 || c === 6)) ||
                (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
                (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                modules[row + r][col + c] = true;
            } else {
                modules[row + r][col + c] = false;
            }
        }
    }
}

const ALIGNMENT_PATTERN_TABLE = [
    [],
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50]
];

function setupAlignmentPattern(modules: (boolean | null)[][], version: number) {
    const pos = ALIGNMENT_PATTERN_TABLE[version];
    if (!pos || pos.length === 0) return;
    const len = pos.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            const row = pos[i];
            const col = pos[j];
            if (modules[row][col] !== null) continue; // Already covered by Finders

            for (let r = -2; r <= 2; r++) {
                for (let c = -2; c <= 2; c++) {
                    const isBorder = (Math.abs(r) === 2 || Math.abs(c) === 2);
                    const isCenter = (r === 0 && c === 0);
                    modules[row + r][col + c] = isCenter || isBorder;
                }
            }
        }
    }
}

function setupReservedSpace(modules: (boolean | null)[][], size: number) {
    // Format info area reserved
    for (let i = 0; i < 9; i++) {
        modules[i][8] = false;
        modules[8][i] = false;
    }
    for (let i = 0; i < 8; i++) {
        modules[size - 1 - i][8] = false;
        modules[8][size - 1 - i] = false;
    }
    modules[size - 8][8] = true; // Dark module
}

function encodeData(text: string, version: number, ecLevel: 'L' | 'M' | 'Q' | 'H'): number[] {
    const buffer: number[] = [];
    
    // Byte Mode Indicator: 0100
    writeBits(buffer, 4, 4);

    // Character Count Indicator
    const charCountBits = version < 10 ? 8 : 16;
    writeBits(buffer, text.length, charCountBits);

    // Data payload
    for (let i = 0; i < text.length; i++) {
        writeBits(buffer, text.charCodeAt(i), 8);
    }

    // Terminal Indicator: 4 bits of 0 (or up to capacity)
    const maxDataBits = (getCodewordCount(version) - getECCodewordCount(version, ecLevel)) * 8;
    const termBits = Math.min(4, maxDataBits - buffer.length);
    if (termBits > 0) writeBits(buffer, 0, termBits);

    // Align to byte boundary
    while (buffer.length % 8 !== 0) {
        buffer.push(0);
    }

    // Padding with alternate bytes
    const padBytes = [0xEC, 0x11];
    let padIndex = 0;
    while (buffer.length < maxDataBits) {
        writeBits(buffer, padBytes[padIndex], 8);
        padIndex = 1 - padIndex;
    }

    // Convert bits buffer to byte array
    const bytes: number[] = [];
    for (let i = 0; i < buffer.length; i += 8) {
        let byte = 0;
        for (let b = 0; b < 8; b++) {
            byte = (byte << 1) | buffer[i + b];
        }
        bytes.push(byte);
    }

    return bytes;
}

function writeBits(buffer: number[], value: number, length: number) {
    for (let i = length - 1; i >= 0; i--) {
        buffer.push((value >> i) & 1);
    }
}

// Block partitioning table for Version 1 to 10
const EC_BLOCK_PARAMS: Record<string, Record<number, number[]>> = {
    'L': {
        1: [1, 26, 19], 2: [1, 44, 34], 3: [1, 70, 55], 4: [1, 100, 80], 5: [1, 134, 108],
        6: [2, 86, 68], 7: [2, 98, 78], 8: [2, 121, 97], 9: [2, 146, 116], 10: [2, 86, 68, 2, 87, 69]
    },
    'M': {
        1: [1, 26, 16], 2: [1, 44, 28], 3: [1, 70, 44], 4: [2, 50, 32], 5: [2, 67, 43],
        6: [4, 43, 27], 7: [4, 49, 31], 8: [4, 60, 38], 9: [3, 58, 36, 2, 59, 37], 10: [4, 69, 43, 2, 70, 44]
    },
    'Q': {
        1: [1, 26, 13], 2: [1, 44, 22], 3: [2, 35, 18], 4: [2, 50, 24], 5: [2, 33, 15, 2, 34, 16],
        6: [4, 43, 23], 7: [2, 39, 21, 4, 40, 22], 8: [4, 38, 20, 2, 39, 21], 9: [3, 36, 18, 5, 37, 19], 10: [5, 43, 22, 5, 44, 23]
    },
    'H': {
        1: [1, 26, 9], 2: [1, 44, 16], 3: [2, 35, 13], 4: [4, 25, 9], 5: [2, 24, 9, 2, 25, 10],
        6: [4, 22, 9, 4, 23, 10], 7: [5, 24, 11, 2, 25, 12], 8: [4, 25, 11, 5, 26, 12], 9: [4, 24, 10, 5, 25, 11], 10: [6, 24, 9, 6, 25, 10]
    }
};

function partitionBlocks(data: number[], version: number, ecLevel: 'L' | 'M' | 'Q' | 'H'): QRBlock[] {
    const params = EC_BLOCK_PARAMS[ecLevel][version];
    const blocks: QRBlock[] = [];
    let dataIndex = 0;

    for (let p = 0; p < params.length; p += 3) {
        const numBlocks = params[p];
        const blockTotalWords = params[p + 1];
        const blockDataWords = params[p + 2];

        for (let b = 0; b < numBlocks; b++) {
            const dataBytes = data.slice(dataIndex, dataIndex + blockDataWords);
            dataIndex += blockDataWords;

            const ecBytes = calculateECC(dataBytes, blockTotalWords - blockDataWords);
            blocks.push({
                dataCount: blockDataWords,
                data: [...dataBytes, ...ecBytes]
            });
        }
    }
    return blocks;
}

function calculateECC(data: number[], ecCount: number): number[] {
    const generator = getGeneratorPoly(ecCount);
    let ec = new Array(ecCount).fill(0);

    for (let i = 0; i < data.length; i++) {
        const factor = data[i] ^ ec[0];
        ec.shift();
        ec.push(0);

        if (factor !== 0) {
            const logFactor = GF_LOG[factor];
            for (let j = 0; j < ecCount; j++) {
                ec[j] ^= GF_EXP[(GF_LOG[generator[j]] + logFactor) % 255];
            }
        }
    }
    return ec;
}

// Galois Field Table initialization
const GF_EXP = new Array(256).fill(0);
const GF_LOG = new Array(256).fill(0);
(() => {
    let val = 1;
    for (let i = 0; i < 255; i++) {
        GF_EXP[i] = val;
        GF_LOG[val] = i;
        val <<= 1;
        if (val & 0x100) val ^= 0x11D; // Polynomial x^8 + x^4 + x^3 + x^2 + 1
    }
    GF_EXP[255] = GF_EXP[0];
})();

function getGeneratorPoly(size: number): number[] {
    let poly = [1];
    for (let i = 0; i < size; i++) {
        const next = [0, ...poly];
        const scaleVal = GF_EXP[i];
        for (let j = 0; j < poly.length; j++) {
            next[j] ^= GF_EXP[(GF_LOG[poly[j]] + GF_LOG[scaleVal]) % 255];
        }
        poly = next.slice(0, size + 1);
    }
    poly.shift(); // Remove leading coefficient
    return poly;
}

function interleaveBlocks(blocks: QRBlock[], dataCodewords: number, ecCodewords: number): number[] {
    const interleaved: number[] = [];
    const numBlocks = blocks.length;

    // 1. Interleave data bytes
    let maxDataLen = 0;
    blocks.forEach(b => maxDataLen = Math.max(maxDataLen, b.dataCount));

    for (let i = 0; i < maxDataLen; i++) {
        for (let b = 0; b < numBlocks; b++) {
            if (i < blocks[b].dataCount) {
                interleaved.push(blocks[b].data[i]);
            }
        }
    }

    // 2. Interleave EC bytes
    let maxTotalLen = 0;
    blocks.forEach(b => maxTotalLen = Math.max(maxTotalLen, b.data.length));

    for (let i = maxDataLen; i < maxTotalLen; i++) {
        for (let b = 0; b < numBlocks; b++) {
            if (i < blocks[b].data.length) {
                interleaved.push(blocks[b].data[i]);
            }
        }
    }

    return interleaved;
}

function mapData(modules: (boolean | null)[][], data: number[], size: number) {
    let byteIndex = 0;
    let bitIndex = 7;
    let dir = -1; // up
    let c = size - 1;

    while (c > 0) {
        if (c === 6) c--; // Skip vertical timing line column

        for (let r = 0; r < size; r++) {
            const row = (dir === -1) ? (size - 1 - r) : r;
            for (let offset = 0; offset < 2; offset++) {
                const col = c - offset;
                if (modules[row][col] !== null) continue;

                let bit = false;
                if (byteIndex < data.length) {
                    bit = (((data[byteIndex] >> bitIndex) & 1) === 1);
                }
                modules[row][col] = bit;

                bitIndex--;
                if (bitIndex < 0) {
                    byteIndex++;
                    bitIndex = 7;
                }
            }
        }
        dir = -dir;
        c -= 2;
    }
}

// Error correction patterns & counts
const CODES = [26, 44, 70, 100, 134, 172, 196, 242, 292, 346];
const EC_CODES: Record<string, number[]> = {
    'L': [7, 10, 15, 20, 26, 36, 40, 48, 60, 72],
    'M': [10, 16, 26, 36, 48, 64, 72, 88, 110, 130],
    'Q': [13, 22, 36, 52, 72, 96, 108, 130, 162, 192],
    'H': [17, 28, 44, 64, 88, 112, 130, 156, 198, 224]
};

function getCodewordCount(version: number): number {
    return CODES[version - 1];
}

function getECCodewordCount(version: number, ecLevel: 'L' | 'M' | 'Q' | 'H'): number {
    return EC_CODES[ecLevel][version - 1];
}

// Data Masking logic
function applyMask(modules: (boolean | null)[][], maskPattern: number, size: number) {
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            // Check if this module is dynamic/data module
            // Skip finders, alignment, timing, format info
            if (isReservedSpace(r, c, size)) continue;

            let invert = false;
            switch (maskPattern) {
                case 0: invert = ((r + c) % 2 === 0); break;
                case 1: invert = (r % 2 === 0); break;
                case 2: invert = (c % 3 === 0); break;
                case 3: invert = ((r + c) % 3 === 0); break;
                case 4: invert = ((Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0); break;
                case 5: invert = (((r * c) % 2) + ((r * c) % 3) === 0); break;
                case 6: invert = ((((r * c) % 2) + ((r * c) % 3)) % 2 === 0); break;
                case 7: invert = ((((r + c) % 2) + ((r * c) % 3)) % 2 === 0); break;
            }
            if (invert) {
                modules[r][c] = !modules[r][c];
            }
        }
    }
}

function isReservedSpace(row: number, col: number, size: number): boolean {
    if (row < 9 && col < 9) return true; // Top-left finder & format info
    if (row < 9 && col >= size - 8) return true; // Top-right finder & format info
    if (row >= size - 8 && col < 9) return true; // Bottom-left finder & format info
    if (row === 6 || col === 6) return true; // Timing lines
    
    // Alignments
    if (size > 21) {
        // Simple bounding check for alignment patterns of Version 2 to 10
        const centers = ALIGNMENT_PATTERN_TABLE[Math.floor((size - 17) / 4)];
        for (let i = 0; i < centers.length; i++) {
            for (let j = 0; j < centers.length; j++) {
                const r = centers[i];
                const c = centers[j];
                // Finder patterns overlap skip
                if ((r < 9 && c < 9) || (r < 9 && c >= size - 8) || (r >= size - 8 && c < 9)) continue;
                if (Math.abs(row - r) <= 2 && Math.abs(col - c) <= 2) return true;
            }
        }
    }

    return false;
}

function getBestMask(modules: (boolean | null)[][], size: number, ecLevel: 'L' | 'M' | 'Q' | 'H'): number {
    let bestMask = 0;
    let minPenalty = Infinity;

    for (let m = 0; m < 8; m++) {
        // Clone modules
        const temp = modules.map(row => [...row]);
        applyMask(temp, m, size);
        drawFormatInfo(temp, ecLevel, m, size);

        const penalty = evaluateMatrix(temp, size);
        if (penalty < minPenalty) {
            minPenalty = penalty;
            bestMask = m;
        }
    }
    return bestMask;
}

function evaluateMatrix(modules: (boolean | null)[][], size: number): number {
    let penalty = 0;

    // Penalty 1: Horizontal & Vertical lines of 5+ same color modules
    for (let r = 0; r < size; r++) {
        let hCount = 1;
        let vCount = 1;
        for (let c = 1; c < size; c++) {
            if (modules[r][c] === modules[r][c - 1]) {
                hCount++;
            } else {
                if (hCount >= 5) penalty += (3 + (hCount - 5));
                hCount = 1;
            }
            if (modules[c][r] === modules[c - 1][r]) {
                vCount++;
            } else {
                if (vCount >= 5) penalty += (3 + (vCount - 5));
                vCount = 1;
            }
        }
        if (hCount >= 5) penalty += (3 + (hCount - 5));
        if (vCount >= 5) penalty += (3 + (vCount - 5));
    }

    // Penalty 2: 2x2 blocks of same color
    for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size - 1; c++) {
            const color = modules[r][c];
            if (modules[r + 1][c] === color && modules[r][c + 1] === color && modules[r + 1][c + 1] === color) {
                penalty += 3;
            }
        }
    }

    // Penalty 3: Finder-like patterns (1:1:3:1:1 ratios)
    const pattern = [true, false, true, true, true, false, true];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size - 10; c++) {
            let matchH = true;
            let matchV = true;
            for (let i = 0; i < 7; i++) {
                if (modules[r][c + i] !== pattern[i]) matchH = false;
                if (modules[c + i][r] !== pattern[i]) matchV = false;
            }
            // Check surrounding 4 modules are light (false)
            if (matchH) {
                const clearBefore = (c - 4 < 0) || modules[r].slice(c - 4, c).every(x => !x);
                const clearAfter = (c + 11 > size) || modules[r].slice(c + 7, c + 11).every(x => !x);
                if (clearBefore || clearAfter) penalty += 40;
            }
            if (matchV) {
                let clearBefore = true;
                for (let k = 1; k <= 4; k++) {
                    if (c - k >= 0 && modules[c - k][r]) clearBefore = false;
                }
                let clearAfter = true;
                for (let k = 7; k < 11; k++) {
                    if (c + k < size && modules[c + k][r]) clearAfter = false;
                }
                if (clearBefore || clearAfter) penalty += 40;
            }
        }
    }

    // Penalty 4: Balance of dark and light modules
    let darkModules = 0;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (modules[r][c]) darkModules++;
        }
    }
    const ratio = (darkModules / (size * size)) * 100;
    const deviation = Math.abs(ratio - 50);
    penalty += Math.floor(deviation / 5) * 10;

    return penalty;
}

const FORMAT_INFO_MASK = 0x5412;
const FORMAT_INFO_LEVELS: Record<string, number> = { 'L': 1, 'M': 0, 'Q': 3, 'H': 2 };

function drawFormatInfo(modules: (boolean | null)[][], ecLevel: 'L' | 'M' | 'Q' | 'H', maskPattern: number, size: number) {
    const levelCode = FORMAT_INFO_LEVELS[ecLevel];
    const data = (levelCode << 3) | maskPattern;

    // Calculate BCH (15, 5) code
    let bch = data << 10;
    const g = 0x537; // generator polynomial x^10 + x^8 + x^5 + x^4 + x^2 + x + 1
    for (let i = 4; i >= 0; i--) {
        if ((bch >> (10 + i)) & 1) {
            bch ^= g << i;
        }
    }

    const fullCode = ((data << 10) | bch) ^ FORMAT_INFO_MASK;

    // Draw format info modules in matrix
    // Top-left finder area
    const bits1 = [
        [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8],
        [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0]
    ];
    // Bottom-left / Top-right area
    const bits2 = [
        [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
        [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
    ];

    for (let i = 0; i < 15; i++) {
        const bit = (((fullCode >> i) & 1) === 1);
        modules[bits1[i][0]][bits1[i][1]] = bit;
        modules[bits2[i][0]][bits2[i][1]] = bit;
    }
}
