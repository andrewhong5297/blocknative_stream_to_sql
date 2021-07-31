const BlocknativeSdk = require('bnc-sdk');
const { uptime } = require('process');
const WebSocket = require('ws');
const { config } = require("./configuration.json")
require('dotenv').config()

const handleTransactionEvent = event => {
  const {
    transaction, // transaction object
    emitterResult // data that is returned from the transaction event listener defined on the emitter
  } = event
  
  console.log(transaction)
  console.log(emitterResult)
}

async function main() {
  const options = {
    dappId: process.env.APIKEY,
    networkId: 1,
    transactionHandlers: [handleTransactionEvent], //replace this with sql write function later
    ws: WebSocket,
    onerror: (error) => {console.log(error)}
  }
  
  // initialize and connect to the api
  const blocknative = new BlocknativeSdk(options)

  console.log("spinning up...")
  await blocknative.configuration({
    scope: "0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270", // [required] - either 'global' or valid Ethereum address
    //filters: config.filters, // [optional] - array of valid searchjs filter strings
    abi: config.abi // [optional] - valid contract ABI
    // watchAddress: true // [optional] - Whether the server should automatically watch the "scope" value if it is an address
  })  
}

main()
