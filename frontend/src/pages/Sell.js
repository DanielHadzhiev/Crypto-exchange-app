import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { saveTransaction } from '../utils/transactionHistory';



const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(33, 33, 33);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
  width: 90%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SellHeader = styled.div`
  color: white;
  margin-bottom: 32px;
  text-align: center;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SellCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  
  h2 {
    color: #2d3748;
    font-size: 1.5rem;
    margin: 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PriceInfo = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(0, 210, 255, 0.1);
  border-radius: 8px;
  
  label {
    display: block;
    color: #666;
    margin-bottom: 8px;
  }
  
  .price {
    font-size: 1.5rem;
    color: #2d3748;
    font-weight: bold;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  margin-right: 6%;
  label {
    display: block;
    color: #2d3748;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #00d2ff;
    }
  }
`;

const TotalValue = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(0, 210, 255, 0.1);
  border-radius: 8px;
  
  label {
    display: block;
    color: #666;
    margin-bottom: 8px;
  }
  
  .total {
    font-size: 1.5rem;
    color: #2d3748;
    font-weight: bold;
  }
`;


const SellButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #c82333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

function Sell() {
  const [amount, setAmount] = useState('');
  const [crypto, setCrypto] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [totalValue, setTotalValue] = useState(0);
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('userBalance');
    return savedBalance ? parseFloat(savedBalance) : 10000;
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [ownedAmount, setOwnedAmount] = useState(0);

  useEffect(() => {
    if (location.state?.cryptoName && location.state?.cryptoPrice) {
      setCrypto({
        name: location.state.cryptoName,
        currentPrice: location.state.cryptoPrice,
        symbol: location.state.cryptoName.toUpperCase(),
        logo: location.state.cryptoLogo
      });
      
      // Get owned amount of this crypto
      const ownedTokens = JSON.parse(localStorage.getItem('ownedTokens') || '{}');
      const tokenName = location.state.cryptoName.charAt(0).toUpperCase() + 
                       location.state.cryptoName.slice(1).toLowerCase();
      setOwnedAmount(ownedTokens[tokenName]?.amount || 0); // Access the amount property
    } else {
      navigate('/dashboard');
    }
  }, [location, navigate]);
  

  useEffect(() => {
    if (amount && crypto.currentPrice) {
      const total = Number(amount) * crypto.currentPrice;
      setTotalValue(total);
      setErrorMessage('');
      
      if (Number(amount) > ownedAmount) {
        setErrorMessage('Insufficient crypto balance for this sale');
      }
    } else {
      setTotalValue(0);
    }
  }, [amount, crypto.currentPrice, ownedAmount]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 0) {
      setAmount(value);
    }
  };

  const handleSell = () => {
    if (Number(amount) > ownedAmount) {
      setErrorMessage('Insufficient crypto balance for this sale');
      return;
    }
  
    const newBalance = balance + totalValue;
    setBalance(newBalance);
    localStorage.setItem('userBalance', newBalance.toString());
  
    window.dispatchEvent(new Event('balanceUpdate'));
  
    const ownedTokens = JSON.parse(localStorage.getItem('ownedTokens') || '{}');
    const tokenName = crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1).toLowerCase();
    
    // Calculate profit/loss
    const entryPrice = ownedTokens[tokenName].entryPrice;
    const profitLoss = (crypto.currentPrice - entryPrice) * Number(amount);
    
    ownedTokens[tokenName].amount -= Number(amount);
    
    if (ownedTokens[tokenName].amount <= 0) {
      delete ownedTokens[tokenName];
    }
    
    localStorage.setItem('ownedTokens', JSON.stringify(ownedTokens));
    setOwnedAmount(ownedTokens[tokenName]?.amount || 0);
  
    // Save transaction history with profit/loss
    saveTransaction('sell', crypto, Number(amount), crypto.currentPrice, totalValue, profitLoss);
  
    setAmount('');
    setErrorMessage('Sale successful!');
  };
  

  return (
    <Container>
      <Navbar />
      <MainContent>
        <SellHeader>
          <h1>Sell {crypto.name}</h1>
        </SellHeader>
        <SellCard>
          <TokenInfo>
            <img
              src={crypto.logo}
              alt={crypto.name}
              onError={(e) => {
                e.target.src = `/${crypto.name?.toLowerCase()}-logo.png`;
              }}
            />
            <h2>{crypto.name}</h2>
          </TokenInfo>
          
          <PriceInfo>
            <label>Current Price</label>
            <div className="price">${crypto.currentPrice?.toLocaleString()}</div>
          </PriceInfo>
          
          <div style={{ color: '#2d3748', marginBottom: '16px' }}>
            Available {crypto.name}: {ownedAmount.toLocaleString()}
          </div>

          <InputGroup>
            <label>Amount to Sell</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              step="0.0001"
              placeholder={`Enter amount`}
            />
          </InputGroup>

          <div style={{ color: errorMessage.includes('Insufficient') ? 'red' : 'green', marginBottom: '16px', textAlign: 'center' }}>
            {errorMessage}
          </div>

          <TotalValue>
            <label>Total Value</label>
            <div className="total">
              ${totalValue.toLocaleString()}
            </div>
          </TotalValue>

          <SellButton
            onClick={handleSell}
            disabled={!amount || Number(amount) <= 0 || Number(amount) > ownedAmount}
          >
            Sell {crypto.name}
          </SellButton>
        </SellCard>
      </MainContent>
      <Footer />
    </Container>
  );
}

export default Sell;