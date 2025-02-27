import React, { useState, useEffect } from 'react';
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
  max-width: 800px;
  margin: 0 auto;
  width: 90%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const HistoryHeader = styled.div`
  color: white;
  margin-bottom: 32px;
  text-align: center;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
  }
`;

const TransactionCard = styled.div`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const TransactionInfo = styled.div`
  h3 {
    color: #1a202c;
    margin: 0 0 12px 0;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  p {
    color: #4a5568;
    margin: 8px 0;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .date {
    color: #718096;
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 12px;
  }
`;
const ClearButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 24px;
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }
`;

const TransactionValue = styled.div`
  text-align: right;
  padding-left: 24px;

  .amount {
    font-size: 1.5rem;
    color: #1a202c;
    font-weight: 800;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }

  .profit {
    color: #38a169;
    font-weight: 600;
    padding: 8px 16px;
    background: rgba(56, 161, 105, 0.15);
    border-radius: 24px;
    font-size: 1.1rem;
    display: inline-block;
  }

  .loss {
    color: #e53e3e;
    font-weight: 600;
    padding: 8px 16px;
    background: rgba(229, 62, 62, 0.15);
    border-radius: 24px;
    font-size: 1.1rem;
    display: inline-block;
  }
`;

function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = () => {
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        const parsedTransactions = JSON.parse(savedTransactions);        const sortedTransactions = parsedTransactions.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        
          );
                      setTransactions(sortedTransactions);
                    }
                  };

                  loadTransactions();
                  window.addEventListener('transactionUpdate', loadTransactions);
    
    return () => {
      window.removeEventListener('transactionUpdate', loadTransactions);
    };
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  const clearHistory = () => {
    localStorage.removeItem('transactions');
    setTransactions([]);
    window.dispatchEvent(new CustomEvent('transactionUpdate'));
  };
  

  return (
    <Container>
      <Navbar />
      <MainContent>
        <HistoryHeader>
          <h1>Transaction History</h1>
        </HistoryHeader>
       <div style={{ textAlign: 'right' }}>
        <ClearButton onClick={clearHistory}>
          Clear History
        </ClearButton>
      </div>
        {transactions.length === 0 ? (
          <TransactionCard>
            <TransactionInfo>
              <h3>No transactions yet</h3>
            </TransactionInfo>
          </TransactionCard>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionCard key={index}>
              <TransactionInfo>
                <h3>{transaction.type.toUpperCase()} {transaction.crypto?.name}</h3>
                <p className="date">{formatDate(transaction.date)}</p>
                <p>Amount: {transaction.amount.toFixed(4)} {transaction.crypto?.symbol}</p>
                <p>Price: ${transaction.price?.toLocaleString()}</p>
              </TransactionInfo>
              <TransactionValue>
                <div className="amount">
                  ${transaction.total?.toLocaleString()}
                </div>
                {transaction.type === 'sell' && (
                  <div className={transaction.total >= 0 ? 'profit' : 'loss'}>
                    {transaction.total >= 0 ? '▲' : '▼'} 
                    ${Math.abs(transaction.total).toLocaleString()}
                  </div>
                )}
              </TransactionValue>
            </TransactionCard>
          ))
        )}
      </MainContent>
      <Footer />
    </Container>
  );
}
export default History;