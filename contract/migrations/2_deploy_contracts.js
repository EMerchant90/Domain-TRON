var TNS = artifacts.require("./TNS.sol");

const supportedTLDS = ['trx', 'tron', 'dao'];
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = async function(deployer) {
  const tnsContractAddress = await deployer.deploy(TNS).then(async (tnsContract) => {
      console.log("tnsContractAddress", tnsContract.address)

      for(const tld of supportedTLDS) {
          await tnsContract.setTLD(tld);
      }


      for(const tld of supportedTLDS) {
          const result = await tnsContract.isTLD(tld);
            console.log(`TLD ${tld} is ${result ? 'supported' : 'not supported'}`);
      }

  })

};
