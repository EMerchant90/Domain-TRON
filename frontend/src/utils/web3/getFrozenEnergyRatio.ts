import TronWeb from 'tronweb';
import TronStation from 'tronstation';

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://nile.trongrid.io');
const solidityNode = new HttpProvider('https://nile.trongrid.io');
const eventServer = new HttpProvider('https://nile.trongrid.io');

const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';


const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);
export async function getFrozenEnergyRatio() {
    try {
        const tronStation = new TronStation(tronWeb, true);
        const res = await tronStation.energy.trx2FrozenEnergy(1);
        console.log("res from api" , res);
        return res
    } catch (error) {
      console.error('Error fetching user transactions:', error);
    }
  }