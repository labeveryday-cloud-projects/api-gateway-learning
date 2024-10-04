// Displaying the Summary
import React, { useEffect, useState } from 'react';
import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Container, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

function SummaryView() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, [id]);  // Add id as a dependency

  const fetchSummary = async () => {
    try {
      const { tokens } = await fetchAuthSession();
      const token = tokens.idToken.toString();
      const response = await get({
        apiName: 'YourAPIGatewayAPI',
        path: `/summary/${id}`,
        options: {
          headers: { Authorization: token }
        }
      });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  if (!summary) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4">{summary.title}</Typography>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Original Transcript:</Typography>
        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{summary.transcript}</Typography>
      </Paper>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Summary:</Typography>
        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{summary.summary}</Typography>
      </Paper>
    </Container>
  );
}

export default SummaryView;
