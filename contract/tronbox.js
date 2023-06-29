require('dotenv').config();
console.info("--- tronbox.js ---", process.env.PRIVATE_KEY);
module.exports = {
  networks: {
      development: {
          privateKey: process.env.PRIVATE_KEY,
          userFeePercentage: 100, // The percentage of resource consumption ratio.
          feeLimit: 100000000, // The TRX consumption limit for the deployment and trigger, unit is SUN
          fullHost: "http://127.0.0.1:9090",

          network_id: '9'
      },
    mainnet: {
      privateKey: process.env.PRIVATE_KEY,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    },
    shasta: {
      privateKey: process.env.PRIVATE_KEY,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '2'
    },
    nile: {
      privateKey: process.env.PRIVATE_KEY,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.nileex.io',
      network_id: '3'
    },

    compilers: {
      solc: {
        version:'0.8.18',
        optimizer: {
            enabled: true,
            runs: 200
        }

      }
    }
  }
}
