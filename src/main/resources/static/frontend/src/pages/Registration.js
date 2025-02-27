import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../company-logo.png';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
`;

const RegisterBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 420px;
  margin: 1rem;
  backdrop-filter: blur(8px);
`;

const LogoImage = styled.img`
  width: 100%;
  max-width: 280px;
  height: auto;
  margin: 0 auto 1.5rem;
  display: block;
  
  @media (max-width: 768px) {
    max-width: 220px;
  }
  
  @media (max-width: 480px) {
    max-width: 180px;
  }
`;

const Slogan = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-right: 10%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    border-color: #302b63;
    outline: none;
    box-shadow: 0 0 0 3px rgba(48, 43, 99, 0.1);
  }
`;

const Button = styled.button`
  padding: 1rem;
  background: linear-gradient(45deg, #302b63, #24243e);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(48, 43, 99, 0.2);
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin: 1rem 0;
  color: #302b63;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #24243e;
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e1e1e1;
  }
  
  span {
    padding: 0 1rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const registrationData = { username, email, password, confirmPassword };

    console.log("Sending Data:", JSON.stringify(registrationData)); // Debugging line

    try {
      const response = await fetch('http://localhost:8080/api/registration', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData), // Convert the form data to JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData); // Set errors from the response if any
        console.error('Registration error:', errorData);
      } else {
        const data = await response.json();
        console.log("Server Response:", data);
        navigate('/login'); // Redirect after successful registration
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <LogoImage src={logo} alt="Company Logo" />
        <Slogan>Your Gateway to Digital Assets</Slogan>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
          </InputGroup>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
          </InputGroup>
          <Button type="submit">Create Account</Button>
        </Form>
        <Divider><span>OR</span></Divider>
        <LinkText onClick={handleSignInClick} style={{ cursor: 'pointer' }}>
          Already have an account? Sign In
        </LinkText>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;
