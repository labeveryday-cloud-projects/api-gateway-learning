// the Dashboard
import React, { useEffect, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Button, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [summaries, setSummaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const { tokens } = await fetchAuthSession();
      const token = tokens.idToken.toString();
      const response = await get({
        apiName: 'YourAPIGatewayAPI',
        path: '/summaries',
        options: {
          headers: { Authorization: token },
        }
      });
      setSummaries(response.data.summaries);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    try {
      await uploadData({
        key: file.name,
        data: file,
        options: {
          contentType: file.type
        }
      });
      alert('File uploaded successfully!');
      // Optionally, trigger backend processing
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Dashboard</Typography>
      <Button variant="contained" component="label" style={{ marginTop: '20px' }}>
        Upload Transcript
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>

      <Typography variant="h5" style={{ marginTop: '40px' }}>Your Summaries</Typography>
      <List>
        {summaries.map((summary) => (
          <ListItem button key={summary.id} onClick={() => navigate(`/summary/${summary.id}`)}>
            <ListItemText primary={summary.title} secondary={new Date(summary.date).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Dashboard;