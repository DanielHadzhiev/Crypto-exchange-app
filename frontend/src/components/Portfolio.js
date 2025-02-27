const handleBuy = (cryptoName) => {
  navigate('/dashboard', {
    state: {
      cryptoName: cryptoName,
      cryptoPrice: localStorage.getItem(`${cryptoName.toLowerCase()}_price`),
      cryptoLogo: `/images/${cryptoName.toLowerCase()}.webp`
    }
  });
};

const handleSell = (crypto) => {
  const userBalance = parseFloat(localStorage.getItem('userBalance')) || 0;
  const saleValue = crypto.amount * crypto.price;
   
  // Update balance
  const newBalance = userBalance + saleValue;
  localStorage.setItem('userBalance', newBalance.toString());

  // Remove token from owned tokens
  const ownedTokens = JSON.parse(localStorage.getItem('ownedTokens') || '{}');
  delete ownedTokens[crypto.name];
  localStorage.setItem('ownedTokens', JSON.stringify(ownedTokens));

  // Update UI
  setOwnedTokens(prev => prev.filter(token => token.name !== crypto.name));
   
  // Trigger balance update in navbar
  window.dispatchEvent(new Event('balanceUpdate'));

  // Redirect to dashboard
  navigate('/dashboard');
};
