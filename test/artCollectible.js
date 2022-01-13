const truffleAssert = require('truffle-assertions');
const {expectRevert } = require('@openzeppelin/test-helpers');


const assert = require('assert');
const { constants } = require('buffer');
const c = require('config');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const artCollectible = artifacts.require('ArtCollectible');

contract('validator artcollectible contract()', (accounts) => {
  it('contract owner should be first contract from contracts list', async () => {
    let artCollectibleContract = await artCollectible.deployed();
    let owner = await artCollectibleContract.owner();
    expect(owner).to.equal(accounts[0]);
  });

  //it('Should set base URI',async () =>{
     //let artCollectibleContract = await artCollectible.deployed();
     //const baseURI = "https://ipfs.io/ipfs/" ;
     //const baseURI_sol = await artCollectibleContract.setBaseURI();
     //expect(baseURI).to.equal(baseURI_sol);                                          
  //});

  

  it('owner of tokenId 1 should be first contract from contracts list which is also the address that deployed contract', async () => {
    let artCollectibleContract = await artCollectible.deployed();
    const tokenURI =
      'https://ipfs.io/ipfs/QmYz4BiRqBTcMPqh4u3nXYzaYPbXREpmPyGnuwFjHGkuEG';
    await artCollectibleContract.claimItem(tokenURI);
    const owner = await artCollectibleContract.ownerOf(1);
    expect(owner).to.equal(accounts[0]);
  });

  it(' token URI of existing token ',async () =>{
    let artCollectibleContract = await artCollectible.deployed();
    let metadata = await artCollectibleContract.tokenURI(1);
    const tokenURI =
      'https://ipfs.io/ipfs/QmYz4BiRqBTcMPqh4u3nXYzaYPbXREpmPyGnuwFjHGkuEG';
    expect(metadata).to.equal(tokenURI);
  });

  it(' token URI of non existing token ',async () =>{
    let err = null;
    let artCollectibleContract = await artCollectible.deployed();
    let errorSol = 'ERC721Metadata: URI query for nonexistent token';
    //try {
      //await artCollectibleContract.tokenURI(2);
    //} catch (error) {
      //err = error ;
    //}
    //expect(err).to.equal(errorSol);
    await expectRevert(
      this.artCollectibleContract.tokenURI(2),'ERC721Metadata: URI query for nonexistent token'
    );
  });

  it('Should total supply',async () =>{
    let artCollectibleContract = await artCollectible.deployed();
    const totalSupply = 1
    totalSupplySol = await artCollectibleContract.totalSupply()
    expect(totalSupplySol).to.equal(totalSupply)
  });
});
