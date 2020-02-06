import React, { useEffect, useState } from "react"
import { getUsersProxy, performSwap } from "../controllers/Swap"
import Warnings from "./Warnings"

import { Box, Button, Paragraph, Text, TextInput } from "grommet"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const SwapComponent = (props) => {
    let [cdpId, setCdpId] = useState("")

    function handleCdpChange(event) {
        setCdpId(event.target.value)
    }

    let [userProxy, setUserProxy] = useState(null)

    useEffect(() => {
        if (props.web3 && props.account) {
            (async () => {
                let proxy = await getUsersProxy(props.web3, props.account)
                setUserProxy(proxy)
            })()
        }
    }, [props.web3, props.account])

    let [loading, setLoading] = useState(false)
    let [message, setMessage] = useState("")
    let [txHash, setTxhash] = useState("")

    async function swap(ethToBat) {
        setLoading(true)
        console.log(`Account: ${props.account}, DSProxy: ${userProxy}`)
        try {
            let result = await performSwap(props.web3, props.account, cdpId, ethToBat)
            setTxhash(result ? result.transactionHash : "")
            setMessage(`${result && result.status ? "Successful" : "Unsuccessful"} collateral swap`)
        } catch (e) {
            setMessage(`Error occured: ${e.message}`)
        }
        setLoading(false)
    }
    
    if (!userProxy) {
        return (
			<Box width="large" align="center" margin="medium" pad="small" round="small" background="status-warning" elevation="medium">
				<Text weight="bold">It doesn't look like you've set up your account / Vault on MakerDAO's official Oasis.app.</Text>
				<Paragraph margin="small" fill>
					Complete the setup steps on{" "}
					<a href="https://oasis.app/borrow" target="_blank" rel="noopener noreferrer">
						Oasis borrow
					</a>{" "}
					by:
					<li>Creating a vault</li>
					<li>Unlocking DAI</li>
					<li>Generating a small amount of debt (i.e. borrow DAI)</li>
					<li>Then refresh this page</li>
				</Paragraph>
                <Paragraph margin="small" fill>
                    FYI for devs: we require that the user has Maker's standard DSProxy setup already.
                </Paragraph>
			</Box>
		)
    } else {
        return (
			<>
				<Warnings />
				<Box width="medium" align="center" margin="medium" pad="small" round="small" gap="medium">
					<Text weight="bold">Test with a small vault collateral first!</Text>
					<Text size="small">
						Check your vaults and their #'s on{" "}
						<a href="https://oasis.app/borrow" target="_blank" rel="noopener noreferrer">
							Oasis Borrow
						</a>
						.
					</Text>
					<TextInput placeholder="Your Mainnet Vault #" value={cdpId} onChange={handleCdpChange} />
					<Text size="xsmall">Make sure you select the correct Swap direction.</Text>
					<Button label="ETH to BAT Collateral Swap" onClick={() => swap(true)} disabled={loading || Number(cdpId) === 0} />
					<Button label="BAT to ETH Collateral Swap" onClick={() => swap(false)} disabled={loading || Number(cdpId) === 0} />
					<Text size="small">{message}</Text>
					{txHash && (
						<Text size="small">
							<a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
								See transaction
							</a>
						</Text>
					)}
					<Loader visible={loading} type="ThreeDots" color="#00C781" width={40} height={40} />
				</Box>
			</>
		)
    }
}

export default SwapComponent