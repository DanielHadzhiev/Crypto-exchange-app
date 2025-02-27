import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(255, 255, 255, 0.95);
  padding: 24px;
  text-align: center;
  font-weight: 500;
  color: #4a5568;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.05);
`;

function Footer() {
  return (
    <FooterContainer>
      <p>© 2024 Crypto Exchange | Secure Trading Platform</p>
    </FooterContainer>
  );
}

export default Footer;
