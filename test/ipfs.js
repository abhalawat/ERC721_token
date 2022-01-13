const config = require('config');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

const validator = require('../scripts/ipfsHelper.js');

describe("validator storeDataToFile()", () => {

    it("should return true for artCollectible contracts file", async () => {
        const filePath = path.join(__dirname, '../contracts/ERC721deploy.sol');
        const result = await validator.fileExists(filePath);
        expect(result).to.be.true;
    })

    it("should return false since dummy.sol doesnt exists in contracts folder", async () => {
        const filePath = path.join(__dirname, '../contracts/dummy.sol');
        const result = await validator.fileExists(filePath);
        expect(result).to.be.false;
    })


});
