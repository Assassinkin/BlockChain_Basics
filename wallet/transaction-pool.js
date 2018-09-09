class TransactionPool {
  constructor() {
    this.transaction = [];
  }

  updateOrAddTransaction(transaction) {
    // look for all transaction in th epool and find the one with the same id as the one in the argument
    let transactionWithId = this.transaction.find(t => t.id === transaction.id);

    if (transactionWithId) {
      this.transaction[this.transaction.indexOf(transactionWithId)] = transaction;
    } else {
      this.transaction.push(transaction);
    }
  }
}

module.exports = TransactionPool;
