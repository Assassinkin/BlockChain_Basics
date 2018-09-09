const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transcation, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipeint = 'recipient';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('outputs the `amount` substracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  });

  it('outputs the `amount` added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
      .toEqual(amount);
  });

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('validates the balance of the wallet', () =>{
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('invalidates a corrupt transaction', () => {
    transaction.outputs[0].amount = 100000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });

  describe('transacting with an amount that exceeds the balance', () =>{
    beforeEach(() => {
      amount = 10000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });
    it('does not create the transation', () => {
      expect(transaction).toEqual(undefined);
    });
  });

  describe('add updating a transaction', () => {
    let nextAmount, nextRecipient;

    beforeEach(() => {
      nextAmount = 20;
      nextRecipient = "daNewDovahisHereItsGreed";
      transaction = transaction.update(wallet, nextRecipient, nextAmount);
    });

    it('substracts the next amount from the sender\'s output', () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount - nextAmount);
    });
    it('outputs an amount for the next recipient', () => {
      expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
        .toEqual(nextAmount);
    });
  });
});
