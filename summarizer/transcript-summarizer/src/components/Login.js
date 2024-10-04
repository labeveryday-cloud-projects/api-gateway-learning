// Login Component
import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signIn({
        username: formData.username,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <TextField 
        label="Username" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
      />
      <TextField 
        label="Password" 
        type="password" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
      />
      <Button variant="contained" color="primary" onClick={login}>Login</Button>
    </Container>
  );
}

export default Login;
