var ENERGYRENTAL = artifacts.require("./EnergyRental.sol");
var chalk = require('chalk')

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = async function(deployer) {
    const EnergyRentalcontractAddress = await deployer.deploy(ENERGYRENTAL).then(async (EnergyRentalContract) => {
        console.log(chalk.bgGreen(chalk.bold("Stake2.0ContractAddress : ", EnergyRentalContract.address)))


    })

};
