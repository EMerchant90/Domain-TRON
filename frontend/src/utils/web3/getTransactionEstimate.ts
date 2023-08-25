import { AbiCoder } from "ethers";
import axios from "axios";

export async function GetEstimatedFee(walletAddress, item) {
    const abi = AbiCoder.defaultAbiCoder();

    const params = abi.encode(
        ["string", "string"],
        [item.domain, item.tld]
    );

    // Calculate the size of the byte array (transaction data)
    const byteData = params.slice(2, params.length); // Assuming byteData is a Buffer
    const byteArraySize = byteData.length;


    const contractAddress = "TNbMGuz1Qm17JN4YRic1ccw1eKcAXKEdqi";
    const functionSelector = "buyDomain(string,string)";

    const requestData = {
        owner_address: walletAddress,
        contract_address: contractAddress,
        function_selector: functionSelector,
        parameter: params.slice(2, params.length),
        visible: true,
    };

    try {
        const energyResponse = await axios.post('https://nile.trongrid.io/wallet/estimateenergy', requestData);
        console.log("Energy response:", energyResponse);

        console.log(`Estimated Bandwidth Consumption: ${byteArraySize} bytes`);

        return {
            energy: energyResponse.data.energy_required,
            bandwidth: byteArraySize,
        };
    } catch (error) {
        console.error("Error:", error);
    }
}
