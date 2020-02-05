import getWeb3 from "../providers/getWeb3"

export const checkForWeb3 = ({ noWeb3, notEnabled, enabled }) => {
    return !window.ethereum ? 
        noWeb3 : window.ethereum.selectedAddress ? 
            enabled : notEnabled
}

export const setupWeb3 = async (forcePrompt) => {
    let web3;
    let accounts;
    try {
        if (forcePrompt) {
            await window.ethereum.enable()
        }
        web3 = await getWeb3()
        accounts = await web3.eth.getAccounts()
    } catch (error) {
        console.error(`Failed to load web3, accounts, or contract: ${error.message}`)
    }
    return { web3, accounts }
}
