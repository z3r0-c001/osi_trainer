// Minimal QR code generator for TOTP URIs — outputs inline SVG
// Implements QR Code Model 2 with error correction level L
// Based on the QR code specification (ISO/IEC 18004)

export function generateQrSvg(text, size = 200) {
  const matrix = generateQrMatrix(text);
  const n = matrix.length;
  const cellSize = size / n;

  let paths = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (matrix[y][x]) {
        paths += `M${x * cellSize},${y * cellSize}h${cellSize}v${cellSize}h${-cellSize}z`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="background:#fff;border-radius:8px;padding:8px;"><path d="${paths}" fill="currentColor"/></svg>`;
}

// QR matrix generation — simplified implementation for alphanumeric/byte mode
function generateQrMatrix(text) {
  const data = encodeData(text);
  const version = getMinVersion(data.length);
  const size = version * 4 + 17;

  // Create matrix
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  const reserved = Array.from({ length: size }, () => Array(size).fill(false));

  // Place finder patterns
  placeFinder(matrix, reserved, 0, 0);
  placeFinder(matrix, reserved, size - 7, 0);
  placeFinder(matrix, reserved, 0, size - 7);

  // Place alignment patterns
  const alignPos = getAlignmentPositions(version);
  for (const row of alignPos) {
    for (const col of alignPos) {
      if (reserved[row]?.[col]) continue;
      placeAlignment(matrix, reserved, row, col);
    }
  }

  // Place timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) {
      matrix[6][i] = (i % 2 === 0) ? 1 : 0;
      reserved[6][i] = true;
    }
    if (!reserved[i][6]) {
      matrix[i][6] = (i % 2 === 0) ? 1 : 0;
      reserved[i][6] = true;
    }
  }

  // Dark module
  matrix[size - 8][8] = 1;
  reserved[size - 8][8] = true;

  // Reserve format info areas
  for (let i = 0; i < 8; i++) {
    reserved[8][i] = true;
    reserved[8][size - 1 - i] = true;
    reserved[i][8] = true;
    reserved[size - 1 - i][8] = true;
  }
  reserved[8][8] = true;

  // Reserve version info areas for version >= 7
  if (version >= 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        reserved[i][size - 11 + j] = true;
        reserved[size - 11 + j][i] = true;
      }
    }
  }

  // Encode and place data
  const ecData = addErrorCorrection(data, version);
  placeData(matrix, reserved, ecData, size);

  // Apply mask (pattern 0: (row + col) % 2 === 0)
  applyMask(matrix, reserved, size);

  // Place format info
  placeFormatInfo(matrix, size);

  // Place version info
  if (version >= 7) {
    placeVersionInfo(matrix, version, size);
  }

  return matrix;
}

function encodeData(text) {
  // Byte mode encoding
  const bytes = new TextEncoder().encode(text);
  const bits = [];

  // Mode indicator: 0100 (byte mode)
  bits.push(0, 1, 0, 0);

  // Character count (8 bits for versions 1-9, 16 bits for 10+)
  const version = getMinVersion(bytes.length + 3); // rough estimate
  const countBits = version <= 9 ? 8 : 16;
  for (let i = countBits - 1; i >= 0; i--) {
    bits.push((bytes.length >> i) & 1);
  }

  // Data
  for (const byte of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1);
    }
  }

  // Terminator
  for (let i = 0; i < 4 && bits.length < getDataCapacity(version) * 8; i++) {
    bits.push(0);
  }

  // Pad to byte boundary
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  // Pad bytes
  const padBytes = [0xEC, 0x11];
  let padIdx = 0;
  while (bits.length < getDataCapacity(version) * 8) {
    for (let i = 7; i >= 0; i--) {
      bits.push((padBytes[padIdx] >> i) & 1);
    }
    padIdx = (padIdx + 1) % 2;
  }

  // Convert to bytes
  const result = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (bits[i + j] || 0);
    }
    result.push(byte);
  }

  return result;
}

function getMinVersion(dataBytes) {
  // Data capacity for byte mode, EC level L
  const capacities = [0, 17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858];
  for (let v = 1; v <= 20; v++) {
    if (capacities[v] >= dataBytes + 3) return v; // +3 for mode + count overhead
  }
  return 20;
}

function getDataCapacity(version) {
  // Total data codewords for EC level L
  const capacities = [0, 19, 34, 55, 80, 108, 136, 156, 194, 232, 274, 324, 370, 428, 461, 523, 589, 647, 721, 795, 861];
  return capacities[version] || capacities[20];
}

function getEcCodewords(version) {
  // EC codewords per block for level L
  const ec = [0, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28];
  return ec[version] || 28;
}

function addErrorCorrection(data, version) {
  const ecLen = getEcCodewords(version);
  const totalCodewords = getTotalCodewords(version);
  const dataLen = getDataCapacity(version);

  // Pad data to expected length
  while (data.length < dataLen) {
    data.push(0);
  }

  // Generate EC codewords using polynomial division
  const ec = reedSolomonEncode(data.slice(0, dataLen), ecLen);

  // Interleave (simplified — single block for small versions)
  const result = [];
  for (let i = 0; i < dataLen; i++) result.push(data[i]);
  for (let i = 0; i < ecLen; i++) result.push(ec[i]);

  // Convert to bits
  const bits = [];
  for (const byte of result) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1);
    }
  }

  return bits;
}

function getTotalCodewords(version) {
  const size = version * 4 + 17;
  // Total modules minus function patterns, format info, version info
  let total = size * size;
  // Rough calculation for available data modules
  total -= 3 * 64; // finder patterns + separators
  total -= 2 * (size - 16); // timing patterns
  total -= 31; // format + dark module
  if (version >= 2) {
    const alignCount = Math.floor(version / 7) + 2;
    total -= (alignCount * alignCount - 3) * 25; // alignment patterns
  }
  if (version >= 7) total -= 36; // version info
  return Math.floor(total / 8);
}

// Reed-Solomon encoding over GF(2^8)
function reedSolomonEncode(data, ecLen) {
  const gf = GF256;
  const gen = generatePolynomial(ecLen);
  const msg = new Array(data.length + ecLen).fill(0);
  for (let i = 0; i < data.length; i++) msg[i] = data[i];

  for (let i = 0; i < data.length; i++) {
    const coef = msg[i];
    if (coef === 0) continue;
    for (let j = 0; j < gen.length; j++) {
      msg[i + j] ^= gf.multiply(gen[j], coef);
    }
  }

  return msg.slice(data.length);
}

function generatePolynomial(degree) {
  const gf = GF256;
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const factor = [1, gf.exp[i]];
    const newPoly = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      for (let k = 0; k < factor.length; k++) {
        newPoly[j + k] ^= gf.multiply(poly[j], factor[k]);
      }
    }
    poly = newPoly;
  }
  return poly;
}

// GF(2^8) arithmetic with primitive polynomial x^8 + x^4 + x^3 + x^2 + 1
const GF256 = (() => {
  const exp = new Array(256);
  const log = new Array(256);
  let x = 1;
  for (let i = 0; i < 256; i++) {
    exp[i] = x;
    log[x] = i;
    x <<= 1;
    if (x >= 256) x ^= 0x11d;
  }
  return {
    exp,
    log,
    multiply(a, b) {
      if (a === 0 || b === 0) return 0;
      return exp[(log[a] + log[b]) % 255];
    }
  };
})();

function placeFinder(matrix, reserved, row, col) {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const mr = row + r, mc = col + c;
      if (mr < 0 || mc < 0 || mr >= matrix.length || mc >= matrix.length) continue;
      const isBlack = (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
                      (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
                      (r >= 2 && r <= 4 && c >= 2 && c <= 4);
      matrix[mr][mc] = isBlack ? 1 : 0;
      reserved[mr][mc] = true;
    }
  }
}

function placeAlignment(matrix, reserved, centerRow, centerCol) {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const mr = centerRow + r, mc = centerCol + c;
      if (mr < 0 || mc < 0 || mr >= matrix.length || mc >= matrix.length) continue;
      if (reserved[mr][mc]) return; // skip if overlaps finder
    }
  }
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const mr = centerRow + r, mc = centerCol + c;
      const isBlack = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
      matrix[mr][mc] = isBlack ? 1 : 0;
      reserved[mr][mc] = true;
    }
  }
}

function getAlignmentPositions(version) {
  if (version <= 1) return [];
  const positions = [6];
  const size = version * 4 + 17;
  const last = size - 7;
  const count = Math.floor(version / 7) + 2;
  if (count === 2) {
    positions.push(last);
  } else {
    const step = Math.ceil((last - 6) / (count - 1));
    const adjustedStep = step + (step % 2); // make even
    for (let i = 1; i < count; i++) {
      positions.push(last - (count - 1 - i) * adjustedStep);
    }
  }
  return positions;
}

function placeData(matrix, reserved, bits, size) {
  let bitIdx = 0;
  let upward = true;

  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col = 5; // skip timing column

    const rows = upward ? Array.from({ length: size }, (_, i) => size - 1 - i) : Array.from({ length: size }, (_, i) => i);

    for (const row of rows) {
      for (let c = 0; c <= 1; c++) {
        const actualCol = col - c;
        if (actualCol < 0) continue;
        if (reserved[row][actualCol]) continue;

        matrix[row][actualCol] = bitIdx < bits.length ? bits[bitIdx] : 0;
        bitIdx++;
      }
    }
    upward = !upward;
  }
}

function applyMask(matrix, reserved, size) {
  // Mask pattern 0: (row + col) % 2 === 0
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (reserved[row][col]) continue;
      if ((row + col) % 2 === 0) {
        matrix[row][col] ^= 1;
      }
    }
  }
}

function placeFormatInfo(matrix, size) {
  // Format info for EC level L (01), mask pattern 0 (000)
  // Pre-computed BCH: 0x77c4 = 0111011111000100
  const formatBits = 0x77c4;
  const bits = [];
  for (let i = 14; i >= 0; i--) {
    bits.push((formatBits >> i) & 1);
  }

  // Place around top-left finder
  const positions1 = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
    [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];

  // Place around other two finders
  const positions2 = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8],
    [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5],
    [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
  ];

  for (let i = 0; i < 15; i++) {
    const [r1, c1] = positions1[i];
    const [r2, c2] = positions2[i];
    matrix[r1][c1] = bits[i];
    matrix[r2][c2] = bits[i];
  }
}

function placeVersionInfo(matrix, version, size) {
  if (version < 7) return;

  // Version info is an 18-bit sequence: 6 bits version + 12 bits error correction
  // Pre-computed for versions 7-20
  const versionInfo = {
    7: 0x07C94, 8: 0x085BC, 9: 0x09A99, 10: 0x0A4D3, 11: 0x0BBF6,
    12: 0x0C762, 13: 0x0D847, 14: 0x0E60D, 15: 0x0F928, 16: 0x10B78,
    17: 0x1145D, 18: 0x12A17, 19: 0x13532, 20: 0x149A6
  };

  const info = versionInfo[version] || 0;
  for (let i = 0; i < 18; i++) {
    const bit = (info >> i) & 1;
    const row = Math.floor(i / 3);
    const col = i % 3;
    // Bottom-left
    matrix[size - 11 + col][row] = bit;
    // Top-right
    matrix[row][size - 11 + col] = bit;
  }
}
