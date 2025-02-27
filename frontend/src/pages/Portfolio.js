import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(33, 33, 33);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 80%;

  @media (max-width: 768px) {
    padding: 16px;
    
  }
`;

const PortfolioHeader = styled.div`
  color: white;
  margin-bottom: 24px;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: #888;
    font-size: 1.1rem;
  }
`;

const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
 
  gap: 16px;
`;

const CryptoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  span {
    font-weight: 600;
    color: #2d3748;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const Holdings = styled.div`
  font-size: 1.1rem;
  color: #2d3748;

  span {
    display: block;
    font-size: 0.9rem;
    color: #666;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PortfolioRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 24px;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;

    ${CryptoInfo} {
      grid-column: 1 / -1;
      justify-content: center;
    }

    ${ButtonGroup} {
      grid-column: 1 / -1;
      justify-content: center;
      margin-top: 8px;
    }
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 12px;
  }
`;
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  background: ${props => props.variant === 'buy' ? '#15803d' : '#dc3545'};
  color: white;

  &:hover {
    background: ${props => props.variant === 'buy' ? '#166534' : '#c82333'};
  }
`;

function Portfolio() {
  const [ownedTokens, setOwnedTokens] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem('ownedTokens') || '{}');
    
    const tokenArray = Object.entries(tokens).map(([name, tokenData]) => ({
      id: name.toLowerCase(),
      name: name,
      logo: `/images/${name.toLowerCase()}.webp`,
      amount: typeof tokenData === 'object' ? tokenData.amount : tokenData,
      price: localStorage.getItem(`${name.toLowerCase()}_price`) || 0
    }));
  
    setOwnedTokens(tokenArray);
  }, []);
  

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
  
    // Trigger balance update in navbar
    window.dispatchEvent(new Event('balanceUpdate'));
  
    // Redirect to dashboard
    navigate('/dashboard');
  };
  
  
  return (
    <Container>
      <Navbar />
      <MainContent>
        <PortfolioHeader>
          <h1>Your Portfolio</h1>
          <p>Track and manage your crypto investments</p>
        </PortfolioHeader>
        <PortfolioList>
          {ownedTokens.length > 0 ? (
            ownedTokens.map((crypto) => (
              <PortfolioRow key={crypto.id}>
                <CryptoInfo>
                  <img src={crypto.logo} alt={crypto.name} />
                  <span>{crypto.name}</span>
                </CryptoInfo>
                <Holdings>
                    <span>Amount</span>
                    {Number(crypto.amount)} {crypto.name}
                </Holdings>
                <ButtonGroup>
                  <Button variant="buy" onClick={() => handleBuy(crypto.name)}>
                    Buy
                  </Button>
                  <Button variant="sell" onClick={() => handleSell(crypto)}>
                    Sell
                  </Button>
                </ButtonGroup>
              </PortfolioRow>
            ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: 'white', 
              padding: '32px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px'
            }}>
              No tokens in your portfolio yet. Start trading to build your portfolio!
            </div>
          )}
        </PortfolioList>
      </MainContent>
      <Footer />
    </Container>
  );
}export default Portfolio;
