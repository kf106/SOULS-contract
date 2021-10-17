const keccak256 = require('js-sha3').keccak256;

for (let i = 0; i < 100000000000; i++) {
    const result = keccak256('something');
}

