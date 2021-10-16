const keccak256 = require('keccak256');

function xor (buf1, buf2) {
  return buf1.map((b, i) => b ^ buf2[i]);
}

function swap (bytes) {
  const str = bytes.toString('hex');
  let spellStore = '';
  for (let i = 0; i < 64; i = i + 2) {
    const char1 = str.charAt(i);
    const char2 = str.charAt(i + 1);
    spellStore = spellStore + char2 + char1;
  }
  return Buffer.from(spellStore, 'hex');
}

function getBit (bitIndex, buf) {
  const byte = ~~(bitIndex / 8);
  const bit = bitIndex % 8;
  const idByte = buf[byte];
  const result = (idByte & Math.pow(2, (7 - bit)));
  return result;
}

function clo (target) {
  let i = 0;
  for (i; i < 256; i++) {
    if (getBit((255 - i), target) === 0) {
      // console.log(i);
      return i;
    }
  }
  return i;
}

function mine (soul, incantation) {
  const incantationBytes = Buffer.from(incantation, 'hex');
  const soulBytes = Buffer.from(soul.replace(/0x/g, ''), 'hex');
  const spellStore = swap(keccak256(incantationBytes).toString('hex'));
  const spellBytes = Buffer.from(spellStore, 'hex');
  const result = clo(swap(xor(spellBytes, soulBytes)));
  return result;
}

// generate random hex string of length size
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

console.log('Starting mining');

const soul = '951503ab956ad15f4006d702f5d40cc329e93a14f2df6a6b179e4c807cf20029';
console.log('Mining: ' + soul);

function mineNFT () {
  let bestResult = 0;
  let bestIncantation = 0;
  for (let i = 0; i < 10000; i++) {
    if ((i % 1000) === 0) { process.stdout.write('.'); }
    const rndHx = genRanHex(64);
    const result = mine(soul, rndHx);
    if (result > bestResult) {
      bestResult = result;
      bestIncantation = rndHx;
      process.stdout.write('\rMined ' + bestIncantation + ' with result ' + bestResult);
    }
  }
}

mineNFT();
