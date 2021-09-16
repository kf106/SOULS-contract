const PICT = artifacts.require('PICT');

export async function deployPICT () {
  return PICT.new();
}
