const getGasPrice = async () => {
    let response = await fetch("https://ethgasstation.info/json/ethgasAPI.json")
    let json = await response.json()
	let fast = json.fast / 10
	let average = json.average / 10
    let slightlyFasterThanAverage = (fast - average) / 2 + average
    return slightlyFasterThanAverage.toFixed(2)
}

export default getGasPrice