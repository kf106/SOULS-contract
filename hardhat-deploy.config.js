/* hardhat.config.js */
require("@babel/register");
require("@babel/polyfill");

require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");

require('dotenv-safe').config();

const { 
    RINKEBY_API_URL, 
    MAINNET_API_URL, 
    MUMBAI_API_URL,
    POLYGON_API_URL,
    RINKEBY_PRIVATE_KEY, 
    MAINNET_PRIVATE_KEY, 
    MUMBAI_PRIVATE_KEY, 
    POLYGON_PRIVATE_KEY, 
    ETHSCAN_API_KEY } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // over-ride chain ID to allow MetaMask to connect to localhost:8545
      // see https://hardhat.org/metamask-issue.html
      chainId: 1337
    },
    coverage: {
      url: 'http://127.0.0.1:8555',
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
    rinkeby: {
         url: RINKEBY_API_URL,
         accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    },
    mainnet: {
        url: MAINNET_API_URL,
        accounts: [`0x${MAINNET_PRIVATE_KEY}`]
    },
    mumbai: {
        url: MUMBAI_API_URL,
        accounts: [`0x${MUMBAI_PRIVATE_KEY}`]
    },
    polygon: {
        url: POLYGON_API_URL,
        accounts: [`0x${POLYGON_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: ETHSCAN_API_KEY
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}