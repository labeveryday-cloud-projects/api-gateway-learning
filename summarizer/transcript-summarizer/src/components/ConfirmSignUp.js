import React, { useState, useEffect } from 'react';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ConfirmSignUp() {
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('signupUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      alert('No username found. Please sign up first.');
      navigate('/signup');
    }
  }, [navigate]);

  const handleConfirmSignUp = async () => {
    if (!username) {
      alert('Username is required.');
      return;
    }
    try {
      await confirmSignUp({ username, confirmationCode: code });
      alert('Email confirmed successfully! You can now log in.');
      localStorage.removeItem('signupUsername');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResendConfirmationCode = async () => {
    if (!username) {
      alert('Username is required.');
      return;
    }
    try {
      await resendSignUpCode({ username });
      alert('Confirmation code resent successfully.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Confirm Your Email</Typography>
      <Typography variant="body1" gutterBottom>
        Please enter the verification code sent to your email.
      </Typography>
      <TextField
        label="Verification Code"
        fullWidth
        margin="normal"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleConfirmSignUp}>
        Confirm
      </Button>
      <Button color="secondary" onClick={handleResendConfirmationCode} style={{ marginLeft: '10px' }}>
        Resend Code
      </Button>
    </Container>
  );
}

export default ConfirmSignUp;