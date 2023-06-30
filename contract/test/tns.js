var wait = require('./helpers/wait')
var chalk = require('chalk')
var TNS = artifacts.require("./TNS.sol");

let tnsContract



contract('TNS', function (accounts) {

before(async function () {
  tnsContract = await TNS.deployed()
})

it("should verify that the contract has been deployed by accounts[0]", async function () {
  assert.equal(await tnsContract.owner(), tronWeb.address.toHex(accounts[0]))
});

it("should set top level domain \"trx\" ",async function(){
  let tx = await tnsContract.setTLD("trx")
  tx = await tnsContract.isTLD("trx")
  expect(tx).to.equal(true)
})

it("should get price",async function(){
    let price = await tnsContract.getPrice()
    expect(price.toNumber()).to.equal(1)
})

it("should get domains availability",async function(){
    const domains = ["adeel.trx","adeel2.trx","adeel3.trx"]
    const availability = await tnsContract.getDomainsAvailibility(domains)
    console.log("info",availability)
    expect(availability.length).to.equal(domains.length)
})
it("should buy a domain on top of tld", async function () {
    const options = {value: 1}
    let tx = await tnsContract.buyDomain("adeel2","trx", options);
    ownerAddress = await tnsContract.getOwner("adeel2.trx");
    expect(ownerAddress).to.equal(tronWeb.address.toHex(accounts[0]));

});

it("should not buy a domain if already registered", async function () {
    const options = {value: 1}
    let tx = await tnsContract.buyDomain("adeel2","trx", options);
    const txDetail = await tronWeb.trx.getTransaction(tx);
    expect(txDetail.ret[0].contractRet).to.equal('REVERT');
});

})
