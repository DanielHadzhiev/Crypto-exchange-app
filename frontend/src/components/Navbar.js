import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../company-logo.png';
import { BiReset } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { BiBriefcase } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LogoImage = styled.img`
  height: 100px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    height: 80px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 480px) {
    align-items: center;
  }
`;

const Username = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  letter-spacing: 0.5px;
`;

const Balance = styled.span`
  font-size: 1rem;
  color: #4a5568;
  background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: #2c5282;
  color: #e0e0e0;

  &:hover {
    background: #2b4c7e;
  }
  
  @media (max-width: 900px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.6rem;
    
    svg {
      width: 16px;
      height: 16px;
    }
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
    flex-direction: ${props => props.vertical ? 'column' : 'row'};
    gap: 6px;
  }
`;

const LogoutButton = styled(Button)`
  background: #dc3545;
  
  &:hover {
    background: #c82333;
  }
`;


  function Navbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleHistoryClick = () => navigate('/history');
    const handlePortfolioClick = () => navigate('/portfolio');
      const handleIndexClick = () => navigate('/dashboard');
      const handleSignInClick = () => navigate('/login');
            const handleReset = () => {
              // Reset balance to 10000
              localStorage.setItem('userBalance', '10000');
              setBalance(10000);

              // Clear owned tokens from localStorage
              localStorage.setItem('ownedTokens', '{}');

              // Clear both transaction storages
              localStorage.removeItem('transactions');
              localStorage.setItem('transactionHistory', '[]');

              // Trigger both update events
              window.dispatchEvent(new Event('balanceUpdate'));
              window.dispatchEvent(new Event('transactionUpdate'));

              // Refresh the page to show updated state
              window.location.reload();
            };

    const [balance, setBalance] = useState(() => {
      const savedBalance = localStorage.getItem('userBalance');
      return savedBalance ? parseFloat(savedBalance) : 10000;
    });

    useEffect(() => {
      // Add event listener for balance updates
      const handleBalanceUpdate = () => {
        const newBalance = localStorage.getItem('userBalance');
        setBalance(parseFloat(newBalance));
      };

      window.addEventListener('balanceUpdate', handleBalanceUpdate);

      // Fetch user data
      fetch('http://localhost:8080/api/currentUser', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          setUsername(data.username);
          if (!localStorage.getItem('userBalance')) {
            localStorage.setItem('userBalance', '10000');
            setBalance(10000);
          }
        })
        .catch(error => {
          console.log('Error fetching user data:', error);
          navigate('/login');
        });

      return () => {
        window.removeEventListener('balanceUpdate', handleBalanceUpdate);
      };
    }, [navigate]);
  return (
    <NavbarContainer>
      <NavLeft>
        <LogoImage onClick={handleIndexClick} src={logo} alt="CoinnectX Logo" />
        <UserInfo>
          <Username>
            {username ? `Welcome, ${username}!` : 'No user loaded.'}
          </Username>
          <Balance>${Number(balance).toFixed(2)}</Balance>
        </UserInfo>
      </NavLeft>
      <ButtonGroup>
        <Button onClick={handlePortfolioClick}>
          <BiBriefcase size={20} />
          Portfolio
        </Button>
        <Button onClick={handleReset} >
          <BiReset size={20} />
          Reset
        </Button>
        <Button onClick={handleHistoryClick}>
          <FiClock size={20} />
          History
        </Button>
        <LogoutButton onClick={handleSignInClick}>
          <FiLogOut size={20} />
          Logout
        </LogoutButton>
      </ButtonGroup>
    </NavbarContainer>
  );
}
export default Navbar;
