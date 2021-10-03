// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721IMGStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SOULS is ERC721IMGStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 private _maxTokens;
    uint256 private _basePrice;
    address internal _owner;
    address internal _charity;

    modifier onlyOwner() {
        require(msg.sender == _owner, "SOULS: only the contract owner can call this");
        _;
    }

    constructor(address charity_) ERC721("Social Media Profile Token", "SOULS") {
        _owner = payable(msg.sender);
        _charity = payable(charity_);
        _maxTokens = 10000000;
        _basePrice = 10**15;
    }

    function mintToken(string memory tokenURI_, bytes memory tokenIMG_)
        external
        payable
        nonReentrant
        returns (uint256)
    {
        // Do not mint more tokens if market cap is reached
        require(_tokenIds.current() < _maxTokens, "SOULS: total supply limit of tokens has been reached");
        // Check payment ammount is correct
        require(msg.value >= getMintingPrice(), "SOULS: price must be equal to current getMintingPrice");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI_, tokenIMG_);
        // Make the contract send half to the owner and half to the charity
        uint256 _amount = address(this).balance / 2;
        payable(_owner).transfer(_amount);
        payable(_charity).transfer(_amount);
        return newItemId;
    }

    function levelUp(uint256 tokenId, bytes memory incantation) external returns (uint256) {
        return _levelUp(tokenId, incantation);
    }

    // Returns total number of tokens minted
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }

    // Returns cost of minting a token.
    // This is a fee on top of the gas fee, and increases with each token minted
    function getMintingPrice() public view returns (uint256) {
        return _tokenIds.current() * _basePrice;
    }

    // Find the registered charity address
    function getCharity() external view returns (address) {
        return _charity;
    }

    // Change the registered charity address
    function setCharity(address newCharity) external onlyOwner {
        _changeCharity(newCharity);
    }

    event NewCharity(address _newCharity);

    function _changeCharity(address newCharity) internal virtual {
        require((newCharity != address(0)), "SOULS: the nominated charity cannot be the zero address");
        _charity = payable(newCharity);
        emit NewCharity(newCharity);
    }
}
