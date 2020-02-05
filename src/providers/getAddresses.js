/**
 * Returns the addresses needed for data encoding (mainnet!)
 * MakerDAO: https://changelog.makerdao.com/
 * Aave: https://developers.aave.com/#the-lendingpooladdressesprovider and https://github.com/aave/aave-protocol/blob/478244b0c5f85431b067a058d55bc7eb2b886cdb/contracts/libraries/EthAddressLib.sol#L10
 * Uniswap factory contract currently hardcoded as 0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95
 * @returns { { maker: {}, aave: {}, tokens: {} } }
 */
const getAddresses = () => {
    return {
        collateralSwap: {
            beta: "0x5bca0f6cd5f9a74895d66005acef969342f301a0"
        },
        maker: {
            proxyRegistry: "0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4",
            cdpManager: "0x5ef30b9986345249bc32d8928B7ee64DE9435E39",
            jug: "0x19c0976f590D67707E62397C87829d896Dc0f1F1",
            ethJoin: "0x2F0b23f53734252Bda2277357e97e1517d6B042A",
            batJoin: "0x3D0B1912B66114d4096F48A8CEe3A56C231772cA",
            daiJoin: "0x9759A6Ac90977b93B58547b4A71c78317f391A28",
            ilkBatA: "BAT-A",
            ilkEthA: "ETH-A",
        },
        aave: {
            ethAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        },
        tokens: {
            dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            bat: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
        }
    }
}

export default getAddresses;