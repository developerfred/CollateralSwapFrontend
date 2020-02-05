# Collateral Swap Front end

Swap your vault's underlying collateral with another asset, in one transaction, without paying back the vault's debt.
This uses the magic of open composable ethereum protocols, namely: MakerDAO's vaults, Aave's flash loans, and Uniswap's DEX.

More info: [Twitter thread](https://twitter.com/daveytea/status/1224760425272745991).

## For devs & designers
 - I've tried to build this for ease of extensibility and skinning. 
 - For the designers, only `App.js` and the files in `/components` need to be modified. The rest should 'just work'.
 - Current ghetto version uses Grommet: https://v2.grommet.io/
 - Contributing: Fork the repo and send PRs

## To run
```
npm install
npm start
```

## To build
```
npm run build
```