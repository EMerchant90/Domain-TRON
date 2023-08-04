var TNS = artifacts.require("./TNS.sol");
var chalk = require('chalk')

const supportedTLDS = ['trx', 'tron', 'dao'];
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = async function(deployer) {
  const tnsContractAddress = await deployer.deploy(TNS).then(async (tnsContract) => {
      console.log(chalk.bgGreen(chalk.bold("tnsContractAddress : ", tnsContract.address)))

      for(const tld of supportedTLDS) {
          await tnsContract.setTLD(tld);
      }

  })

};
