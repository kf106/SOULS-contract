// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @dev ERC721 token with storage based token URI management.
 */
abstract contract ERC721IMGStorage is ERC721 {
    using Strings for uint256;
    bytes private constant base64stdchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => bytes) private _tokenIMGs;
    mapping(uint256 => bytes32) private _tokenHashes;
    mapping(uint256 => uint256) private _tokenLevels;

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: tokenURI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    /**
     * @dev function to return base64 encoded string of image
     */
    function tokenB64(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721Portrait: tokenB64 query for nonexistent token");
        bytes memory _tokenIMG = _tokenIMGs[tokenId];
        return string(encodeAsBase64(abi.encodePacked(_tokenIMG)));
    }

    /**
     * @dev function to return bytes of image
     */
    function tokenIMG(uint256 tokenId) public view returns (bytes memory) {
        require(_exists(tokenId), "ERC721Portrait: tokenIMG query for nonexistent token");
        bytes memory _tokenIMG = _tokenIMGs[tokenId];
        return bytes(abi.encodePacked(_tokenIMG));
    }

    // Returns a hash of the token ID concatenated with the block in
    // which it was minted, which could be used as a random stats
    // generator for the token if it were to be used in a game.
    // Note that this is not truly random, so sophisticated users could
    // exploit the system by submitting their minting request just at the
    // right time.

    function bytes32ToString(bytes32 _bytes32) internal pure returns (string memory) {
        uint8 i = 0;
        bytes memory bytesArray = new bytes(64);
        for (i = 0; i < bytesArray.length; i++) {
            uint8 _f = uint8(_bytes32[i / 2] & 0x0f);
            uint8 _l = uint8(_bytes32[i / 2] >> 4);
            bytesArray[i] = toByte(_f);
            i = i + 1;
            bytesArray[i] = toByte(_l);
        }
        return string(bytesArray);
    }

    function toByte(uint8 _uint8) public pure returns (bytes1) {
        if (_uint8 < 10) {
            return bytes1(_uint8 + 48);
        } else {
            return bytes1(_uint8 + 87);
        }
    }

    function tokenStats(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: tokenStats query for nonexistent token");
        return bytes32ToString(_tokenHashes[tokenId]);
    }

    /* test function - delete later */
    function test(uint256 tokenId, bytes memory incantation) public view returns (uint256) {
        require(_exists(tokenId), "ERC721Portrait: levelUp query for nonexistent token");
        uint256 _tokenLevel = _tokenLevels[tokenId];
        bytes32 _target = (_tokenHashes[tokenId] >> 8);
        bytes32 _hash = keccak256(incantation);
        uint _match = clo(_hash ^ _target);
        return (_match);
    }
    /* test function - delete later */
    function test2(uint256 tokenId, bytes memory incantation) public view returns (string memory) {
        require(_exists(tokenId), "ERC721Portrait: levelUp query for nonexistent token");
        uint256 _tokenLevel = _tokenLevels[tokenId];
        bytes32 _target = (_tokenHashes[tokenId] >> 8);
        bytes32 _hash = keccak256(incantation);
        bytes32 _match = _hash ^ _target;
        bytes32 _mask = 0x0000000000000000000000000000000000000000000000000000000000000001;
        bytes32 _and = _match & _mask;
        return bytes32ToString(_and);
    }

    /* test function - delete later */
    function test3(uint256 tokenId, bytes memory incantation) public view returns (uint256) {
        require(_exists(tokenId), "ERC721Portrait: levelUp query for nonexistent token");
        uint256 _tokenLevel = _tokenLevels[tokenId];
        bytes32 _target = (_tokenHashes[tokenId] >> 8);
        bytes32 _hash = keccak256(incantation);
        uint256 _match = clo(_hash ^ _target);
        return _match;

    }

    /**
     * @dev function to return level of image
     */
    function tokenLevel(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "ERC721Portrait: tokenLevel query for nonexistent token");
        return _tokenLevels[tokenId];
    }

    /**
     * Internal function to count the number of leading 1s in a byte32 for POW level work
     */
    function clo(bytes32 target) internal pure returns (uint256) {
        bytes32 _mask = 0x0000000000000000000000000000000000000000000000000000000000000001;
        uint256 i = 0;
        for (; i < 256; i++) {
            if ((target & _mask) == 0x0) {
                return i;
            }
            _mask = _mask << 1;
        }
        return i;
    }

    /**
     * @dev function to allow owner to attempt to raise level
     */
    event LevelUp(uint256 _tokenId, uint256 _level);

    function _levelUp(uint256 tokenId, bytes memory incantation) internal virtual returns (uint256) {
        require(_exists(tokenId), "ERC721Portrait: levelUp query for nonexistent token");
        uint256 _tokenLevel = _tokenLevels[tokenId];
        bytes32 _target = (_tokenHashes[tokenId] >> 1);
        uint256 _result = clo((keccak256(incantation) ^ _target));
        bool _success = false;
        if (_result > _tokenLevel) {
            _tokenLevels[tokenId] = _result;
            _success = true;
        }
        emit LevelUp(tokenId, _tokenLevels[tokenId]);
        return _tokenLevels[tokenId];
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`, and so on. Just read the code.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI,
        bytes memory _tokenIMG
    ) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: attempted to set URI of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
        _tokenIMGs[tokenId] = _tokenIMG;
        _tokenHashes[tokenId] = keccak256(abi.encode(tokenId, blockhash(block.number)));
        // start at level 0
        _tokenLevels[tokenId] = 0;
    }

    /**
     * @dev Base64 encoding of bytes for tokenB64 function
     */

    function encodeAsBase64(bytes memory _str) internal pure returns (string memory) {
        bytes memory _bs = bytes(_str);
        uint256 rem = _bs.length % 3;

        uint256 res_length = ((_bs.length + 2) / 3) * 4 - ((3 - rem) % 3);
        bytes memory res = new bytes(res_length);

        uint256 i = 0;
        uint256 j = 0;

        for (; i + 3 <= _bs.length; i += 3) {
            (res[j], res[j + 1], res[j + 2], res[j + 3]) = encode3(uint8(_bs[i]), uint8(_bs[i + 1]), uint8(_bs[i + 2]));

            j += 4;
        }

        if (rem != 0) {
            uint8 la0 = uint8(_bs[_bs.length - rem]);
            uint8 la1 = 0;

            if (rem == 2) {
                la1 = uint8(_bs[_bs.length - 1]);
            }

            (bytes1 b0, bytes1 b1, bytes1 b2, bytes1 b3) = encode3(la0, la1, 0);
            res[j] = b0;
            res[j + 1] = b1;
            if (rem == 2) {
                res[j + 2] = b2;
            }
        }

        return string(res);
    }

    function encode3(
        uint256 a0,
        uint256 a1,
        uint256 a2
    )
        private
        pure
        returns (
            bytes1 b0,
            bytes1 b1,
            bytes1 b2,
            bytes1 b3
        )
    {
        uint256 n = (a0 << 16) | (a1 << 8) | a2;
        uint256 c0 = (n >> 18) & 63;
        uint256 c1 = (n >> 12) & 63;
        uint256 c2 = (n >> 6) & 63;
        uint256 c3 = (n) & 63;
        b0 = base64stdchars[c0];
        b1 = base64stdchars[c1];
        b2 = base64stdchars[c2];
        b3 = base64stdchars[c3];
    }
}
