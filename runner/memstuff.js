const BlocknativeSdk = require('bnc-sdk');
const { uptime } = require('process');
const WebSocket = require('ws');
const { config } = require("./configuration.json")
const axios = require('axios');
require('dotenv').config()

const handleTransactionEvent = event => {
  console.log("event")
  const {
    transaction, // transaction object
    emitterResult // data that is returned from the transaction event listener defined on the emitter
  } = event
  
  console.log(transaction)
  console.log(emitterResult)

  // const response = await axios.post('https://localhost:8000/newMint/', {
  //     "tx_hash": "0x67b77db0d5022a91a46095cbdeba82deef8337b90e12f5171a830ef50cfb465d",
  //     "status": "test",
  //     "sender": "0xa55E01a40557fAB9d87F993d8f5344f1b2408072",
  //     "projectId": 120,
  //     "gas_limit": 1397818,
  //     "gas_price": 10
  //   })
  // console.log(response.status);
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
    scope: '0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270', // [required] - either 'global' or valid Ethereum address
    //filters: config.filters, // [optional] - array of valid searchjs filter strings
    abi: config.abi // [optional] - valid contract ABI
    // watchAddress: true // [optional] - Whether the server should automatically watch the "scope" value if it is an address
  })  
}

main()
