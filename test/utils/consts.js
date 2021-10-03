import { BN } from '@openzeppelin/test-helpers';

export const Q = (decimals) => {
  return (new BN('10')).pow(new BN(decimals));
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const tokenURI =
  'https://ipfs.infura.io/ipfs/QmV7aM6j9G9r3QQp4tUCn7qFkR3P1EmTu3XiZwS7ypSG1Y';

export const base64Out = [
  'Qk32BgAAAAAAADYAAAAoAAAAGAAAAOj///8BABgAAAAAA',
  'MAGAAAAAAAAAAA',
  'AAAAAAAAAAAAAVoliVoliVoliVoliVoliVoliVoliVoliTopg',
  'XIhlU4lmUItjWIlhUohfW4tdVoZoVoliVoliVoliVoliVoliVoliVoliVoliVoliVoliVoliVoliVoliV',
  'oliVoliVoliVm1dUl5SUl1VVlxXVWFXU35lWIpgS4xhVoliVoliVoliVoliVoliVoliVoliVoliVoliVo',
  'liVoliVoliVoliVoliVoliVoliUoBeT3pZV3BaUlhRWVNSTF9YXGZaVHddVoliVoliVoliVoliVoliVoli',
  'VoliVoliVoliVoliVoliVoliVoliVoliVoliVoliXoZoV4hoXXNiWVNYVlVTVFZWX1JWTG5YVoliVoliVol',
  'iVoliVoliVoliVoliVoliVoliVoliVoliVoliVoxdVodlT4lkVItgSopbVXheXmFeVFFUVFRUSkpKU1NT',
  'XV1dVHhcT4xgVIhlT4thWIhiUolkUYlkUoliVoliVoliVoliVoliT4piW4ZlW4hhVohkUHRYSVpLRUVFVlVXVFRUPz',
  '8/R0dHUlJSWWVdWX5iX4ZlW4lgVolhWYlhWYhiVohkVoliVoliVoliVoliWIhgUYlgTo5fRmtNTFNKUlJQVl',
  'NWVVVVVVVVVVVVU1NTQ0NDQT9AR2RPU4tiUI1hU4pjV4piVolhVIhkVoliVoliVoliVoliVYlfW39lSmRST',
  'ldPV1dVUVNTU1VVVVVTVVVVVVVVU1NTUlJSU1BTSlRPRWZMTGJSVHVbUodgUophWYhiVoliVoliVoliVoliT',
  '3xdVGdYWFhWUVhXYFZRWlZXTVVWWVZTUlRaUlVXVlZUV1dTT1RXVFNVR1RQXVVQVV5dUXVdUYlkTYpiVoli',
  'VoliVoliVoliaXVtWGpfWWtgMTk0b2ZoioKBiYeBh4SLgIOTcIWWhYGShISKgYSGfnR2WWphWnBgXm1eWn',
  'pdXYdiXYdiVoliVoliVoliVoliUohXU45cM2I8O0k5j4uSrrTFqbO/pKvQhK/cgbHZoLDJrbS7n7W8nJab',
  'bn9wWIdlUYhlT4piT4piUYlkVoliVoliVoliVoliT4lkXoRsHy0nf3+Fm6nBeKrgeLLXjrPNfbLZiK7cc',
  '6/fg6vhgLDYgZWoYYNsTZFWWIlhWYhiWYhiWYhiVoliVoliVoliVoliR1xIKyUsAAABiJemhrXge7PYUX',
  'uaHh8hZq/Wgq/cebHgYVdzGDNJbYiYYYRqWYdkVoliVoliVoliVoliVoliVoliVoliVoliSlZGHiMgDw',
  'gDhZmwfbHUebTnfabScpa5fbbfhbHUgrHYeaG/cp3CfY+yc4JoVIhlVoliVoliVoliVoliVoliVoliVo',
  'liVoliTVNMHxsiBQIAh5qxga7VqrLDdLTYiK/bhK/cdaXabbTigLHddLDgd5apZYRpWIhiVoliVoliVol',
  'iVoliVoliVoliVoliVoliPVlHIxwfAAMARUtSk5aZprHEgq/df6zjgbDYVHB9T1xmW4KdlLHLoJWdZX5',
  '0X4tbVoliVoliVoliVoliVoliVoliVoliVoliSFVLHx0ePj48BggIf3hzrrS1j7PReK/gd6/kKFJ1Gj',
  'VPRHCjn7HDlpWXZ4BwWIpgVoliVoliVoliVoliVoliVoliVoliVoliSFVLHx0etLSyHyEhdHV/srK2t',
  'ra0nbLFqLfFnLDDoLHAnrTLr7S3lpaWaYFtVolhVoliVoliVoliVoliVoliVoliVoliVoliSFV',
  'LHx0etLSyHB4eeXtvtLSuqrG6vLWuFh0kDhomDhgeam1qubSxk5aZaoJsV4pjVoliVoliVoliVoliV',
  'oliVoliVoliVoliSFVLHx0etLSyHB4ec3WBpK7Ev7OtsrO1mJudlp2ijZiioaapvLSvj5WcaoJqV4p',
  'jVoliVoliVoliVoliVoliVoliVoliVoliSFVLHx0etLSyHB4ebHqEirLRprbBr7G3tLS0tLS0tLS0tL',
  'S0hYeHP0dCa4duSYddVoliVoliVoliVoliVoliVoliVoliVoliSFVLHx0etLSyHB4ea3mDebLdZ5Gwcm',
  '1qtLS0tLS0tLS0tLS0dnR1AxkIUo1lWIpcVoliVoliVoliVoliVoliVoliVoliVoliSFVLHx0etLSyHB',
  '4eaHyBhrHYa4y5PEVOuLi4s7OzsbGxmZmZXF9bIkUrUolkXYdkVoliVoliVoliVoliVoliVoliVoliV',
  'oliSFVLHx0etLSyHB4ebXiIfbPWbK7dbpK2lJSUlJSUmJiYV1dXJEIrUYpfW4lgT4llVoliVoliVoliVoli',
].join('');

export const tokenIMG = [
  '424df606000000000000360000002800000018000000e8ffffff010018000000',
  '0000c0060000000000000000000000000000000000005689625689625689625689',
  '625689625689625689625689624e8a605c8865538966508b6358896152885f5b8b',
  '5d5686685689625689625689625689625689625689625689625689625689625689',
  '62568962568962568962568962568962568962566d5d525e52525d55565c575561',
  '57537e65588a604b8c615689625689625689625689625689625689625689625689',
  '6256896256896256896256896256896256896256896256896252805e4f7a595770',
  '5a5258515953524c5f585c665a54775d5689625689625689625689625689625689',
  '625689625689625689625689625689625689625689625689625689625689625e86',
  '685788685d73625953585655535456565f52564c6e585689625689625689625689',
  '62568962568962568962568962568962568962568962568962568c5d5687654f89',
  '64548b604a8a5b55785e5e615e5451545454544a4a4a5353535d5d5d54785c4f8c',
  '605488654f8b615888625289645189645289625689625689625689625689624f8a',
  '625b86655b8861568864507458495a4b4545455655575454543f3f3f4747475252',
  '5259655d597e625f86655b89605689615989615988625688645689625689625689',
  '625689625888605189604e8e5f466b4d4c534a5252505653565555555555555555',
  '55535353434343413f4047644f538b62508d61538a63578a625689615488645689',
  '6256896256896256896255895f5b7f654a64524e574f5757555153535355555555',
  '535555555555555353535252525350534a544f45664c4c625254755b528760528a',
  '615988625689625689625689625689624f7c5d5467585858565158576056515a56',
  '574d555659565352545a5255575656545757534f54575453554754505d5550555e',
  '5d51755d5189644d8a6256896256896256896256896269756d586a5f596b603139',
  '346f66688a828189878187848b80839370859685819284848a8184867e7476596a',
  '615a70605e6d5e5a7a5d5d87625d8762568962568962568962568962528857538e',
  '5c33623c3b49398f8b92aeb4c5a9b3bfa4abd084afdc81b1d9a0b0c9adb4bb9fb5',
  'bc9c969b6e7f705887655188654f8a624f8a625189645689625689625689625689',
  '624f89645e846c1f2d277f7f859ba9c178aae078b2d78eb3cd7db2d988aedc73af',
  'df83abe180b0d88195a861836c4d91565889615988625988625988625689625689',
  '62568962568962475c482b252c0000018897a686b5e07bb3d8517b9a1e1f2166af',
  'd682afdc79b1e06157731833496d889861846a5987645689625689625689625689',
  '625689625689625689625689624a56461e23200f08038599b07db1d479b4e77da6',
  'd27296b97db6df85b1d482b1d879a1bf729dc27d8fb27382685488655689625689',
  '625689625689625689625689625689625689624d534c1f1b22050200879ab181ae',
  'd5aab2c374b4d888afdb84afdc75a5da6db4e280b1dd74b0e07796a96584695888',
  '625689625689625689625689625689625689625689625689623d5947231c1f0003',
  '00454b52939699a6b1c482afdd7face381b0d854707d4f5c665b829d94b1cba095',
  '9d657e745f8b5b5689625689625689625689625689625689625689625689624855',
  '4b1f1d1e3e3e3c0608087f7873aeb4b58fb3d178afe077afe42852751a354f4470',
  'a39fb1c3969597678070588a605689625689625689625689625689625689625689',
  '6256896248554b1f1d1eb4b4b21f212174757fb2b2b6b6b6b49db2c5a8b7c59cb0',
  'c3a0b1c09eb4cbafb4b796969669816d5689615689625689625689625689625689',
  '6256896256896256896248554b1f1d1eb4b4b21c1e1e797b6fb4b4aeaab1babcb5',
  'ae161d240e1a260e181e6a6d6ab9b4b19396996a826c578a635689625689625689',
  '6256896256896256896256896256896248554b1f1d1eb4b4b21c1e1e737581a4ae',
  'c4bfb3adb2b3b5989b9d969da28d98a2a1a6a9bcb4af8f959c6a826a578a635689',
  '6256896256896256896256896256896256896256896248554b1f1d1eb4b4b21c1e',
  '1e6c7a848ab2d1a6b6c1afb1b7b4b4b4b4b4b4b4b4b4b4b4b48587873f47426b87',
  '6e49875d56896256896256896256896256896256896256896256896248554b1f1d',
  '1eb4b4b21c1e1e6b798379b2dd6791b0726d6ab4b4b4b4b4b4b4b4b4b4b4b47674',
  '75031908528d65588a5c5689625689625689625689625689625689625689625689',
  '6248554b1f1d1eb4b4b21c1e1e687c8186b1d86b8cb93c454eb8b8b8b3b3b3b1b1',
  'b19999995c5f5b22452b5289645d87645689625689625689625689625689625689',
  '6256896256896248554b1f1d1eb4b4b21c1e1e6d78887db3d66caedd6e92b69494',
  '9494949498989857575724422b518a5f5b89604f89655689625689625689625689',
  '62',
].join('');
