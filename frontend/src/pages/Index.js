import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

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

const HomeHeader = styled.div`
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

const CryptoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CryptoRow = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr 180px 220px;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 180px 1fr 150px 180px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
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

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: ${props => {
    if (props.variant === 'danger') return '#dc3545';
    if (props.variant === 'buy') return '#15803d';
    return '#2c5282';
  }};
  color: #e0e0e0;
  
  &:hover {
    background: ${props => {
      if (props.variant === 'danger') return '#c82333';
      if (props.variant === 'buy') return '#166534';
      return '#2b4c7e';
    }};
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 1.2rem;
  
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 400px) {
    padding: 4px 8px;
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    flex-direction: ${props => (props.vertical ? 'column' : 'row')};
    gap: 6px;
  }
`;

function Index() {
  const [balance, setBalance] = useState(10000);
  const [cryptoData, setCryptoData] = useState([]);
  const [cryptoHistory, setCryptoHistory] = useState({});
  
  useEffect(() => {
    // Fetch crypto prices, history, and logos on mount
    fetchCryptoData();
    fetchCryptoHistory();
  }, []);

  // Inside the Index function component, add this line before the first useState:
const navigate = useNavigate();

// Add this handler function before the return statement:
const handleBuyClick = (crypto) => {
  navigate('/buy', {
    state: {
      cryptoName: crypto.name,
      cryptoLogo: crypto.logo,
      cryptoPrice: crypto.price
    }
  });
};
const handleSellClick = (crypto) => {
  navigate('/sell', {
    state: {
      cryptoName: crypto.name,
      cryptoLogo: crypto.logo,
      cryptoPrice: crypto.price
    }
  });
};

useEffect(() => {
  fetchCryptoData();
  fetchCryptoHistory();
}, []);

const fetchCryptoData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/crypto/prices');
    const prices = response.data;

    setCryptoData([
      {
        id: 1,
        name: 'Bitcoin',
        symbol: 'XXBTZUSD',
        price: parseFloat(prices?.Bitcoin.c[0]),
        logo: '/images/bitcoin.webp'
      },
      {
        id: 2,
        name: 'Ethereum',
        symbol: 'XETHZUSD',
        price: parseFloat(prices.Ethereum.c[0]),
        logo: '/images/ethereum.webp'
      },
      {
        id: 3,
        name: 'Cardano',
        symbol: 'ADAUSD',
        price: parseFloat(prices.Cardano?.c[0] || '1.20'),
        logo: '/images/cardano.webp'
      },
    ]);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};
const fetchCryptoHistory = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/crypto/historical');
    setCryptoHistory(response.data);
  } catch (error) {
    console.error('Error fetching crypto history:', error);
  }
}; 

  // Render a line chart for the given crypto using its historical data.
  const renderChart = (cryptoName) => {
    const history = cryptoHistory[cryptoName];
    if (!history) return <p>Loading chart...</p>;

    // Each history item is assumed to be an array:
    // index 0 = timestamp (in seconds), index 4 = closing price
    const labels = history.map(item => new Date(item[0] * 1000).toLocaleDateString());
    const prices = history.map(item => parseFloat(item[4]));

    const data = {
      labels,
      datasets: [
        {
          label: `${cryptoName} Price`,
          data: prices,
          borderColor: '#3a7bd5',
          backgroundColor: 'rgba(58, 123, 213, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    };

    return (
      <div style={{ height: '80px', width: '90%' }}>
        <Line data={data} options={options} />
      </div>
    );
  };

  return (
    <Container>
      <Navbar balance={balance} />
      <MainContent>
        <HomeHeader>
          <h1>Home</h1>
        </HomeHeader>
        <CryptoList>
          {cryptoData.map((crypto) => (
            <CryptoRow key={crypto.id}>
              <CryptoInfo>
                <img src={crypto.logo} alt={crypto.name} />
                <span>{crypto.name}</span>
              </CryptoInfo>
              {renderChart(crypto.name)}
              <Price>${crypto.price.toLocaleString()}</Price>
              <ButtonGroup vertical>
                <Button variant="buy" onClick={() => handleBuyClick(crypto)}>Buy</Button>
                <Button variant="danger" onClick={() => handleSellClick(crypto)}>Sell</Button>
              </ButtonGroup>
            </CryptoRow>
          ))}
        </CryptoList>
      </MainContent>
      <Footer />
    </Container>
  );
}

export default Index;
