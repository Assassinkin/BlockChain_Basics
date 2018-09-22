const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {

    this.blockchain = blockchain;
    This.transactionPool = transactionPool;
    This.wallet = wallet;
    This.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();

    // reward for the Miner
    validTransactions.push(
      transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
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
