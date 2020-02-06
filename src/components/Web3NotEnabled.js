import React from "react"
import { Button } from "grommet"

const Web3NotEnabled = (props) => <Button primary onClick={async () => await props.loadWeb3()} label="Connect your wallet" />

export default Web3NotEnabled
