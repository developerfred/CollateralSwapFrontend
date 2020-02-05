import React, { useEffect, useState } from "react"
import { checkForWeb3, setupWeb3 } from "./controllers/Web3"

import Web3Unavailable from "./components/Web3Unavailable"
import Web3NotEnabled from "./components/Web3NotEnabled"
import Web3Enabled from "./components/Web3Enabled"

import Information from "./components/Information"
import { Grommet, Box, Heading } from "grommet"

const theme = {
	global: {
		font: {
			family: "Roboto",
			size: "18px",
			height: "20px"
		}
	}
}

const App = () => {
  
  let [web3, setWeb3] = useState(null)
  let [accounts, setAccounts] = useState(null)

  useEffect(() => {
		if (window.ethereum && window.ethereum.selectedAddress) {
			loadWeb3()
		}
  }, [web3, accounts])

  const loadWeb3 = async (forcePrompt) => {
    try {
      let { web3: web3setup, accounts: accountsSetup } = await setupWeb3(forcePrompt)
      setWeb3(web3setup)
      setAccounts(accountsSetup)
    } catch (e) {
      console.log(e.message)
    }
  }
  
  const content = checkForWeb3({
		noWeb3: <Web3Unavailable />,
		notEnabled: <Web3NotEnabled loadWeb3={loadWeb3} />,
		enabled: <Web3Enabled web3={web3} accounts={accounts} />
  })

  return (
		<Grommet theme={theme}>
			<Box pad="medium" align="center">
				<Heading size="small" textAlign="center">Collateral Swap 🦺 (beta)</Heading>
        <Information />
				{content}
			</Box>
		</Grommet>
  )
}

export default App;
