import React from 'react';
import styled from 'styled-components';

const ProfitLossSpan = styled.span`
  color: ${props => props.value >= 0 ? '#38a169' : '#e53e3e'};
  font-weight: 500;
`;

const ProfitLoss = ({ value }) => {
  const formattedValue = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  return (
    <ProfitLossSpan value={value}>
      {value >= 0 ? '+' : ''}{formattedValue}
    </ProfitLossSpan>
  );
};

export default ProfitLoss;
