// the Landing Page
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '10%' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Transcript Summarizer
      </Typography>
      <Typography variant="h6" gutterBottom>
        Easily upload transcripts and get concise summaries.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/signup" style={{ marginRight: '10px' }}>
        Sign Up
      </Button>
      <Button variant="outlined" color="primary" component={Link} to="/login">
        Login
      </Button>
    </Container>
  );
}

export default LandingPage;
