var wait = require('./helpers/wait')
var chalk = require('chalk')
var TNS = artifacts.require("./TNS.sol");

let tnsContract



contract('TNS', function (accounts) {

before(async function () {
  tnsContract = await TNS.deployed()
})

it("should verify that there are at least three available accounts", async function () {
  if(accounts.length < 3) {
    console.log(chalk.blue('\nYOUR ATTENTION, PLEASE.]\nTo test MetaCoin you should use Tron Quickstart (https://github.com/tronprotocol/docker-tron-quickstart) as your private network.\nAlternatively, you must set your own accounts in the "before" statement in "test/metacoin.js".\n'))
  }
  assert.isTrue(accounts.length >= 3)
})

it("should verify that the contract has been deployed by accounts[0]", async function () {
  assert.equal(await tnsContract.owner(), tronWeb.address.toHex(accounts[0]))
});

it("should set top level domain \"trx\" ",async function(){
  let tx = await tnsContract.setTLD("trx")
  tx = await tnsContract.isTLD("trx")
  expect(tx).to.equal(true)
})

it("should buy a domain on top of tld", async function () {
    let tx = await tnsContract.setTLD("trx")
    const options = {value: 1}
    tx = await tnsContract.buyDomain("adeel","trx", options);
    ownerAddress = await tnsContract.getOwner("adeel.trx");
    expect(ownerAddress).to.equal(tronWeb.address.toHex(accounts[0]));
});

it("should get price",async function(){
  let price = await tnsContract.getPrice()
  expect(price.toNumber()).to.equal(1)
})

})
