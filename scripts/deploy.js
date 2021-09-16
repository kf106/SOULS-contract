import { ethers } from 'hardhat';
async function main () {
  const pict = await ethers.getContractFactory('PICT');
  // Start deployment, returning a promise that resolves to a contract object
  const Pict = await pict.deploy();
  console.log('Contract deployed to address:', Pict.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
