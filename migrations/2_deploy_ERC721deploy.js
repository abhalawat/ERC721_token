const ArtCollectible = artifacts.require('ArtCollectible');

module.exports = function (deployer) {
  deployer.deploy(ArtCollectible);
};