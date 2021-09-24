// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721IMGStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PICT is ERC721IMGStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 private _basePrice;

    address contractAddress;
    address owner;
    uint256 maxTokens;

    constructor() ERC721("Picture Token", "PICT") {
        owner = payable(msg.sender);
        maxTokens = 100000;
        _basePrice = 10**14;
    }

    function mintToken(string memory tokenURI, bytes memory tokenIMG) public payable nonReentrant returns (uint256) {
        // Do not mint more tokens if market cap is reached
        require(_tokenIds.current() < maxTokens, "Total supply limit of tokens has been reached");
        // Check payment ammount is correct
        require(msg.value == getMintingPrice(), "Price must be equal to current getMintingPrice");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI, tokenIMG);
        // lets make the contract send all
        payable(owner).transfer(address(this).balance);
        return newItemId;
    }

    function levelUp(uint256 tokenId, bytes memory incantation) public returns (uint256) {
        return _levelUp(tokenId, incantation);
    }

    // Returns total number of tokens minted
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Returns cost of minting a token.
    // This is a fee on top of the gas fee, and increases with each token minted
    function getMintingPrice() public view returns (uint256) {
        return _tokenIds.current() * _basePrice;
    }
}
