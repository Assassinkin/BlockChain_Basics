// const Blockchain = require('./blockchain');
//
// const bc = new Blockchain();
//
// for(let i=0; i<10; i++){
//   console.log(bc.addBlock(`Im the data in the generated block number: ${i}`).toString());
// }

const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());
