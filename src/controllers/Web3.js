import getWeb3, { isEnabled } from "../providers/getWeb3"

export const setupWeb3 = async () => {
    try {
        return await getWeb3()
    } catch (error) {
        console.error(`Failed to load web3, accounts, or contract: ${error.message}`)
        return { web3: null, account: null }
    }
}

export const isWeb3Enabled = async () => await isEnabled()