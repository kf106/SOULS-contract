const SOULS = artifacts.require('SOULS');

export async function deploySOULS (charity, deployer) {
  return SOULS.new(charity, {from: deployer});
}
