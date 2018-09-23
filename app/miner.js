const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {

    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();

    // reward for the Miner
    validTransactions.push(
      Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
    );

    //create a valid transactions block
    const block = this.blockchain.addBlock(validTransactions);

    //sync the chain in the peer to peer server
    this.p2pServer.syncChains();

    //clear the transaction pool
    this.transactionPool.clearPool();

    //broadcast to every miner to clear their pools
    this.p2pServer.broadcastClearTransactions();

    return block;

  }
}

module.exports = Miner;
