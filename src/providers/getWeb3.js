import Web3 from "web3";

export const isEnabled = async () => {
  let web3 = new Web3(window.ethereum)
  let accounts = await web3.eth.getAccounts()
  return accounts !== null && accounts.length !== 0
}

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          let account = (await web3.eth.getAccounts())[0]
          resolve({ web3, account });
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        let account = web3.eth.defaultAccount
        console.log("Injected web3 detected.");
        resolve({ web3, account });
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        let account = web3.eth.defaultAccount
        console.log("No web3 instance injected, using Local web3.");
        resolve({ web3, account });
      }
  });

export default getWeb3;
