export const saveTransaction = (type, crypto, amount, price, total, profitLoss) => {
  const transaction = {
    type,
    crypto,
    amount,
    price,
    total,
    profitLoss,
    date: Date.now()  // Using timestamp instead of ISO string
  };

  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  window.dispatchEvent(new CustomEvent('transactionUpdate'));
};