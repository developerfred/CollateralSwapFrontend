import React, { useEffect, useState } from "react"
import { getUsersProxy, performSwap } from "../controllers/Swap"
import Warnings from "./Warnings"
import { Box, Button, Paragraph, Text, TextInput } from "grommet"

const SwapComponent = (props) => {
    let [cdpId, setCdpId] = useState(null)

    function handleCdpChange(event) {
        setCdpId(event.target.value)
    }

    let [userProxy, setUserProxy] = useState(null)
    useEffect(() => {
        if (props.web3 && props.accounts) {
            (async () => {
                let proxy = await getUsersProxy(props.web3, props.accounts[0])
                setUserProxy(proxy)
            })()
        }
    }, [props.web3, props.accounts])

    async function swap(ethToBat) {
		await performSwap(props.web3, props.accounts[0], cdpId, ethToBat)
    }
    
    if (!userProxy) {
        return (
			<Box width="large" align="center" margin="medium" pad="small" round="small" background="status-warning" elevation="medium">
				<Text weight="bold">It doesn't look like you've set up your account on MakerDAO's official Oasis.app.</Text>
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
                    <TextInput
                        placeholder="Your Vault #"
                        value={cdpId}
                        onChange={handleCdpChange} 
                    />
                    <Button label="ETH to BAT Collateral Swap" onClick={() => swap(true)} />
                    <Button label="BAT to ETH Collateral Swap" onClick={() => swap(false)} />
                </Box>
            </>
        )
    }
}

export default SwapComponent