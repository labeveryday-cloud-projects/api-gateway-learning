// Sign Up Component
import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: formData.username,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email
          }
        }
      });

      // Save username to localStorage
      localStorage.setItem('signupUsername', formData.username);

      if (isSignUpComplete) {
        alert('Sign-up successful! Please check your email for verification.');
      } else {
        console.log('Sign-up is not complete. Next step:', nextStep);
        // Handle next steps (e.g., confirmation) if needed
      }
      // Navigate to the ConfirmSignUp component
      navigate('/confirm-signup', { state: { username: formData.username } });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Sign Up</Typography>
      <TextField 
        label="Username" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
      />
      <TextField 
        label="Email" 
        type="email" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
      />
      <TextField 
        label="Password" 
        type="password" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
    </Container>
  );
}

export default SignUp;