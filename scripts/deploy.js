const hre = require('hardhat');
console.log("Charity: " + hre.network.config.charity);
import { ethers } from 'hardhat';
async function main () {
  const souls = await ethers.getContractFactory('SOULS');
  // Start deployment, returning a promise that resolves to a contract object
  const Souls = await souls.deploy(hre.network.config.charity);
  console.log('Contract deployed to address:', Souls.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
