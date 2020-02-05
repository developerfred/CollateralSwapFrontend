import getAddresses from "../providers/getAddresses"
import getGasPrice from "./GasStation"

import DSProxy from "../abi/DSProxy.json"
import ProxyRegistry from "../abi/ProxyRegistry.json"
import SwapActions from "../contracts/SwapActions.json"

/**
 * @param {  } web3 The web3 instance (usually metamask or their wallet)
 * @param {  } account The account to use for sending transactions
 * @param { Number } cdpId The CDP / Vault ID
 * @param { Boolean } ethToBat Whether the CDP is converting ETH collateral to BAT, or vice versa
 */
export const performSwap = async (web3, account, cdpId, ethToBat) => {
	let addresses = getAddresses()

	let cdpManager = addresses.maker.cdpManager
	let jug = addresses.maker.jug
	let ethJoin = addresses.maker.ethJoin
	let batJoin = addresses.maker.batJoin
	let daiJoin = addresses.maker.daiJoin

	let daiAddress = addresses.tokens.dai
	let batAddress = addresses.tokens.bat
	let ethAddress = addresses.aave.ethAddress

	let myProxyAddress = await getUsersProxy(web3, account)

	console.log(`myProxyAddress: ${myProxyAddress}`)
	
	let data
	if (ethToBat) {
		data = web3.eth.abi.encodeParameters(
			["address", "uint", "address", "address", "address", "address", "address", "address", "address", "bytes32"],
			[myProxyAddress, cdpId, batAddress, ethAddress, cdpManager, ethJoin, daiJoin, batJoin, jug, web3.utils.utf8ToHex(addresses.maker.ilkBatA)]
		)
	} else {
		data = web3.eth.abi.encodeParameters(
			["address", "uint", "address", "address", "address", "address", "address", "address", "address", "bytes32"],
			[myProxyAddress, cdpId, ethAddress, batAddress, cdpManager, ethJoin, daiJoin, batJoin, jug, web3.utils.utf8ToHex(addresses.maker.ilkEthA)]
		)
	}

    let networkId = await web3.eth.net.getId()
	let deployedNetwork = SwapActions.networks[networkId]
    let swapActions = new web3.eth.Contract(SwapActions.abi, deployedNetwork && deployedNetwork.address)
    
	let flashloanCalldata = swapActions.methods.swapCollateral(cdpManager, addresses.collateralSwap.beta, daiAddress, cdpId, data).encodeABI()

    let myProxyInstance = new web3.eth.Contract(DSProxy, myProxyAddress)
    let gasPrice = await getGasPrice()

	let response = await myProxyInstance.methods.execute(addresses.collateralSwap.beta, flashloanCalldata).send({
		from: account,
		gas: 2000000,
		gasPrice: web3.utils.toWei(`${gasPrice}`, "gwei")
	})

	console.log(response)
}

export const getUsersProxy = async (web3, account) => {
	let proxyRegistryInstance = new web3.eth.Contract(ProxyRegistry, getAddresses().maker.proxyRegistry)
	return await proxyRegistryInstance.methods.proxies(account).call()
}