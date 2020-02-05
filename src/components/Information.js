import React from "react"
import { Box, Paragraph, Text } from "grommet"

const Information = () => {
    return (
		<Box width="large">
			<Text weight="bold">What is this?</Text>
			<Paragraph margin="none" fill>
				Swap your vault's underlying collateral with another asset, in one transaction, without paying back the vault's debt.
				<br />
				This uses the magic of open composable ethereum protocols, namely:{" "}
				<a href="https://makerdao.com/en/" target="_blank" rel="noopener noreferrer">
					MakerDAO's vaults
				</a>
				,{" "}
				<a href="https://aave.com/" target="_blank" rel="noopener noreferrer">
					Aave's flash loans
				</a>
				, and{" "}
				<a href="https://uniswap.io/" target="_blank" rel="noopener noreferrer">
					Uniswap's DEX
				</a>
				.<br /><br />
				More info:{" "}
				<a href="https://twitter.com/daveytea/status/1224760425272745991?s=20" target="_blank" rel="noopener noreferrer">
					Twitter thread
				</a>
				.
			</Paragraph>
		</Box>
	)
}

export default Information