import React from "react"
import SwapComponent from "./SwapComponent"

const Web3Enabled = (props) => {
    return (
        <SwapComponent web3={props.web3} account={props.account}/>
    )
}

export default Web3Enabled
