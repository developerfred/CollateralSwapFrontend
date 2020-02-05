import React from "react"
import { Box, Text, Paragraph } from "grommet"

const Warnings = () => {
	return (
        <>
		<Box width="large" align="center" margin="medium" pad="small" round="small" background="status-critical" elevation="medium">
			<Text weight="bold">Warnings</Text>
			<Paragraph margin="medium" fill>
				<li>Use at your own risk!</li>
				<li>
					The{" "}
					<a href="https://etherscan.io/address/0x5bca0f6cd5f9a74895d66005acef969342f301a0" target="_blank" rel="noopener noreferrer">
						smart contract
					</a>{" "}
					that handles the Collateral Swap is unaudited.
				</li>
				<li>The contract does not ensure that you are below the liquidation percentage. Make sure you have plenty of breathing room!</li>
			</Paragraph>
        </Box>
        <Box width="large" align="center" margin="medium" pad="small" round="small" background="status-warning" elevation="small">
			<Text weight="bold">Fees</Text>
			<Paragraph margin="medium" fill>
                <li>There is a fee automatically taken in DAI only if the entire transaction is successful.</li>
                <li>Based on your vault's debt that needs to be swapped, the fee is 35 bps (goes to Aave) + 17.5 bps (goes to developer)</li>
                <li>Fee example: Your vault currently has 100 DAI debt, therefore the fee is 0.525 DAI. Your new vault after the Collateral Swap will have
				an outstanding debt of 100.525 DAI debt.</li>
            </Paragraph>
        </Box>
        <Box width="large" align="center" margin="medium" pad="small" round="small" background="status-warning" elevation="xsmall">
			<Text weight="bold">Slippage</Text>
			<Paragraph margin="medium" fill>
                <li>As Uniswap is the only DEX used currently, there may be slippage in the collateral price swap, especially if you're swapping a large
				amount</li>
            </Paragraph>
        </Box>
        </>
	)
}

export default Warnings
