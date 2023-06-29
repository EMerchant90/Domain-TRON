var StringUtil = artifacts.require("./StringUtil.sol");
var SafeMath = artifacts.require("./SafeMath.sol");
var TNS = artifacts.require("./TNS.sol");

module.exports = function(deployer) {
  deployer.deploy(TNS);
};
