import React from "react"
import { Heading } from "grommet"

const Web3Unavailable = () => (
	<Heading size="small" color="status-critical">
		No Ethereum wallet detected! Try Metamask!
	</Heading>
)

export default Web3Unavailable