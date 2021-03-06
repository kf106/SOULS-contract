# SOULS - the Social Media Portrait NFT
[![build](https://github.com/kf106/SOULS-contract/actions/workflows/Build.yml/badge.svg)](https://github.com/kf106/SOULS-contract/actions/workflows/Build.yml)
[![tests](https://github.com/kf106/SOULS-contract/actions/workflows/Tests.yml/badge.svg)](https://github.com/kf106/SOULS-contract/actions/workflows/Tests.yml)

The Social Media Portrait Token (SOULS) is an NFT contract based on a modification of the OpenZeppelin ERC721 implementation.

# What does it do?
SOULS solves the problems of *integrity* and *persistence* for NFTs by storing the actual data of the icon on the blockchain. For ownership or licensing of the materials pointed to, you're still going to need a legal contract, or perhaps some kind of game integration.

Yes, it's gas expensive. I wouldn't deploy it on Ethereum in a hurry.

It also provides a template for a unique pseudo-random number associated with each token. This allows third-party sites to create "stats" for each token.

Finally, each token has a "level", which can be increased through proof-of-work by mining for special strings which raise the level. Once raised, levels cannot be lowered.

This shows the amount of effort in the form of computing resources that have been put into the token that could, for example, be used to increase the perceived value of the token.

# Use cases

To demonstrate the use of the contract, we have implemented the [Souls website](https://souls.fi), where the user can log in using their social media profile, and subsequently authorize and mint an NFT of their profile SOULSure, their name, and headline or description.

We have thought of the following other uses:

* On-chain icons for tokens and coins
* Game character emblems and crests
* Digital facsimiles of physical signatures
* An interesting addition to a resume

Feel free to suggest more to me, and I'll add them to the list! 

### Persistence
NFTs are, generally speaking, pointers to data that is stored elsewhere. If the pointer in the NFT (typically called the tokenURI) is to a file on a centrally controled server, then that file can be intentially removed by the server operators, or unintentionally disappear if the company paying for the server goes bankrupt or fails to pay the bills.

The usual solution to this is to store the data on the InterPlanetary File System, which is a decentralized peer-to-peer file storage and reference system. This does not guarantee continuous persistence though - if no IPFS node "pins" a copy of the file, it is not possible ot retrieve it. The file would need to be uploaded again.

### Integrity
Again, if the file is stored on a centralized server, then the server controller can swap out the data for some other data. And who wants to buy an NFT of a cute cat, only to find a year later that it has morphed into an ugly frog. The IPFS does solve this problem, because the name of the file is derived from a cryptographic hash of the contents.

### No clarity on what is owned
To ensure that there is real ownership beyond control of the individual NFT, I recommend that the metadata includes a traditional legal contract.

# Implementation

The SOULS contract implements two new functions: tokenIMG and tokenB64. Data representing the payload of an image file is uploaded during the minting of the token. The contract subsequently exposes functions that allow the data to be retrieved  directly from the chain.

## tokenIMG(uint tokenIndex)
Takes the index of a token as its argument, and returns a binary array containing the full data for the image, which can then be saved to a local file system as `filename.jpg`, and subsequently be used in applications or web pages.

You can save the output from tokenIMG as a file as returned, for example, `myfile.jpg` and the resulting file will be a valid image file that can be viewed in a web page or loaded into an app as an image asset without any further work.

## tokenB64(uint tokenIndex)
Takes the index of a token as its argument, and returns a base64 encoded string containing the full data for the image. This allows a web3 enabled website to retrieve the NFT data from the blockchain and immediately render the image to the web pages using, for example:

```
<img src="src={'data:image/jpg;base64, ' + nft.image}">
```

# Gas prices

As the data involved is signifcantly higher than most EVM contract, costs are equivalently higher. We have estimated the following gas prices:

| Action                  | Estimated Gas | EUR (est) |
|-------------------------|---------------|-----------|
| Deployment              | 2325094       | 550.32    |
| Token minting (24x24)   | 1499300       | 354.86    |
| Levelling up            |   32812       | 7.77      |

Visit the [Ethereum Gas Station](https://ethgasstation.info/calculatorTxV.php) to see what the current US dollar cost of that level of gas is. The last time I checked it was about 350??? to mint a token, 7??? to level up your token, and 550??? to deploy the contract on the Ethereum mainnet. Which is why I have deployed the contract on the Binance Smart Chain.
