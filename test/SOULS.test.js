import { deploySOULS } from './utils/deploy';
import { mine } from './utils/mine';
import { Q, tokenURI, tokenIMG, base64Out } from './utils/consts';
import { web3 } from 'hardhat';
import chai from 'chai';
import { solidity } from 'ethereum-waffle';
chai.use(solidity);

// const Math = require('mathjs');
const { BN } = require('@openzeppelin/test-helpers');

// generate random hex string of length size
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

function hexToByte (hexString) {
  return Buffer.from(hexString, 'hex');
}

async function mintTokenHelper (contract, minter, uri, img, price) {
  const response = await contract.mintToken(uri, hexToByte(img), { from: minter, value: price });
  return response;
}

contract('SOULS', function (accounts) {
  describe('Should deploy and', () => {
    let deployer, customer, charity, newCharity, contract;

    beforeEach(async () => {
      deployer = accounts[0];
      customer = accounts[1];
      charity = accounts[2];
      newCharity = accounts[3];
      contract = await deploySOULS(charity, deployer);
    });

    it('return correct name', async () => {
      expect(await contract.name()).to.equal('Social Media Profile Token');
    });

    it('return correct symbol', async () => {
      expect(await contract.symbol()).to.equal('SOULS');
    });

    it('initially have no tokens', async () => {
      expect(await contract.totalSupply()).to.be.a.bignumber.to.equal(new BN('0'));
    });

    it('be able to mint a token', async () => {
      await mintTokenHelper(contract, customer, tokenURI, tokenIMG, (new BN('0')));
      expect(await contract.totalSupply()).to.be.a.bignumber.to.equal(new BN('1'));
    });

    it('have initial minting price of zero', async () => {
      // initial cost of minting a token is 0
      expect(await contract.getMintingPrice()).to.be.a.bignumber.to.equal(new BN('0'));
    });

    it('have minting price of 0.001 eth after minting', async () => {
      await mintTokenHelper(contract, customer, tokenURI, tokenIMG, (new BN('0')));
      expect(await contract.getMintingPrice()).to.be.a.bignumber.to.equal(Q(15).mul(new BN('1')));
    });

    it('have charity set correctly', async () => {
      expect(await contract.getCharity()).to.equal(charity);
    });

    it('be able to change charity if owner', async () => {
      await contract.setCharity(newCharity, { from: deployer });
      expect(await contract.getCharity()).to.equal(newCharity);
    });

    it('deployer and charity balance increases on minting', async () => {
      const deployerBalance = new BN(await web3.eth.getBalance(deployer));
      const charityBalance = new BN(await web3.eth.getBalance(charity));
      await mintTokenHelper(contract, customer, tokenURI, tokenIMG, (new BN('0')));
      const price = new BN(await contract.getMintingPrice());
      await mintTokenHelper(contract, customer, tokenURI, tokenIMG, price);
      const newDeployerBalance = await web3.eth.getBalance(deployer);
      const newCharityBalance = await web3.eth.getBalance(charity);
      expect(newDeployerBalance).to.be.a.bignumber.to.equal(deployerBalance.add(price.divn(2)));
      expect(newCharityBalance).to.be.a.bignumber.to.equal(charityBalance.add(price.divn(2)));
      expect(await contract.totalSupply()).to.be.a.bignumber.to.equal(new BN('2'));
    });
  });

  describe('Token query should', () => {
    let deployer, customer, contract, charity;

    beforeEach(async () => {
      deployer = accounts[0];
      customer = accounts[1];
      charity = accounts[2];
      contract = await deploySOULS(charity, deployer);
      const price = new BN(await contract.getMintingPrice());
      await mintTokenHelper(contract, customer, tokenURI, tokenIMG, price);
    });

    it('return correct URI', async () => {
      expect(await contract.tokenURI(new BN('1'))).to.equal(tokenURI);
    });

    it('return correct .jpg data', async () => {
      const binIMG = await contract.tokenIMG(new BN('1'));
      expect(binIMG).to.equal('0x' + tokenIMG);
    });

    it('return correct base64 string', async () => {
      const b64String = await contract.tokenB64(new BN('1'));
      expect(b64String).to.equal(base64Out);
    });

    it('have different souls', async () => {
      for (let i = 2; i < 32; i++) {
        const price = new BN(await contract.getMintingPrice());
        await mintTokenHelper(contract, customer, tokenURI, tokenIMG, price);
        const soulString = await contract.tokenSoul(new BN(i));
        console.log(soulString);
      }
    });
  });

  describe('Tokens should', () => {
    let deployer, customer, contract, charity;

    beforeEach(async () => {
      deployer = accounts[0];
      customer = accounts[1];
      charity = accounts[2];
      contract = await deploySOULS(charity, deployer);
      const price = new BN(await contract.getMintingPrice());
      await mintTokenHelper(contract, customer, tokenURI, tokenIMG, price);
    });

    it('be transferrable', async () => {
      await contract.approve(charity, new BN('1'), { from: customer });
      await contract.transferFrom(customer, charity, new BN('1'), { from: customer });
      const newO = await (contract.ownerOf(new BN('1')));
      expect(newO.toString()).to.equal(charity.toString());
    });

    it('claimable through approve', async () => {
      await contract.approve(charity, new BN('1'), { from: customer });
      await contract.transferFrom(customer, charity, new BN('1'), { from: charity });
      const newO = await (contract.ownerOf(new BN('1')));
      expect(newO.toString()).to.equal(charity.toString());
    });

    it('not be transferrable by others', async () => {
      await contract.approve(charity, new BN('1'), { from: customer });
      await expect(contract.transferFrom(
        customer,
        charity,
        new BN('1'),
        { from: deployer },
      )).to.be.revertedWith(
        'ERC721: transfer caller is not owner nor approved',
      );
    });
  });

  describe('Level up should', () => {
    let deployer, customer, contract, charity;

    beforeEach(async () => {
      deployer = accounts[0];
      customer = accounts[1];
      charity = accounts[2];
      contract = await deploySOULS(charity, deployer);
      const price = new BN(await contract.getMintingPrice());
      await mintTokenHelper(contract, customer, tokenURI, tokenIMG, price);
    });

    it('return correct initial level of 0', async () => {
      const result = await (contract.tokenLevel(new BN('1')));
      expect(result.toString()).to.equal('0');
    });

    it('revert with non-existent token', async () => {
      await expect(contract.tokenLevel(new BN('2'))).to.be.revertedWith(
        'SOULS: tokenLevel query for nonexistent token',
      );
    });

    it('remain at level same with failed pow number', async () => {
      await (contract.levelUp(
        new BN('1'),
        '0x1853e13740e6dc4b93b65d0a684e1ccf994afae343a1bf7738291b6299ec9535',
      ));
      const result1 = await (contract.tokenLevel(new BN('1')));
      await (contract.levelUp(
        new BN('1'),
        '0x1853e13740e6dc4b93b65d0a684e1ccf994afae343a1bf7738291b6299ec9535',
      ));
      const result2 = await (contract.tokenLevel(new BN('1')));
      expect(result2.toString()).to.equal(result1.toString());
    });

    it('raise level with the right string', async () => {
      let currentLvl = await (contract.tokenLevel(new BN('1')));
      for (let i = 0; i < 30; i++) {
        const rndHx = '0x' + genRanHex(64);
        const result = await (contract.levelUp(new BN('1'), rndHx));
        const lvl = result.logs[0].args[1];
        expect(currentLvl.lte(lvl));
        console.log(rndHx + ' ' + lvl.toString());
        currentLvl = lvl;
      }
    });

    it('be mineable', async () => {
      const soul = await contract.tokenSoul(new BN('1'));
      let result;
      for (let i = 0; i < 10000; i++) {
        const rndHx = genRanHex(64);
        result = mine(soul, rndHx);
        if (result > 6) {
          console.log('Levelling up with ' + rndHx + ' which gives level ' + result);
          await (contract.levelUp(new BN('1'), '0x' + rndHx));
          break;
        }
      }
      const level = await (contract.tokenLevel(new BN('1')));
      console.log('Level: ' + level.toString());
      expect(level.toString()).to.equal(result.toString());
    });
  });
});
