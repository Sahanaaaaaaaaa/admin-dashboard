import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';

const Certificates = () => {
  const [cas, setCas] = useState([]);
  const [selectedCa, setSelectedCa] = useState('');
  const [newCa, setNewCa] = useState('');
  const [showNewCaInput, setShowNewCaInput] = useState(false);

  useEffect(() => {
    const fetchCas = async () => {
      try {
        const response = await axios.get('/api/cas');
        setCas(response.data);
      } catch (error) {
        console.error('Error fetching CAs:', error);
      }
    };

    fetchCas();
  }, []);

  /*const handleCreateCa = async () => {
    try {
      const response = await axios.post('/api/cas', { name: newCa });
      setCas([...cas, response.data]);
      setNewCa('');
      setShowNewCaInput(false);
    } catch (error) {
      console.error('Error creating CA:', error);
    }
  };*/
  
  const handleIssueCertificate = async () => {
    try {
      const response = await axios.post('/api/issue-certificate', { ca: selectedCa });
      console.log('Certificate issued:', response.data);
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }
  };

  const handleNewCaFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/ca/add', { commonName: newCa });
      alert('Certificate Authority created successfully');
      setNewCa(''); // Clear input after successful submission if needed
      setShowNewCaInput(false);
    } catch (error) {
      console.error('Error creating CA', error);
      alert('Error creating Certificate Authority');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Manage Certificates</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="ca-label">Choose Existing CA or Enter New One</InputLabel>
        <Select
          labelId="ca-label"
          value={selectedCa}
          onChange={(e) => setSelectedCa(e.target.value)}
          label="Choose Existing CA or Enter New One"
        >
          {cas.map((ca) => (
            <MenuItem key={ca.id} value={ca.name}>{ca.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={() => setShowNewCaInput(!showNewCaInput)}
        sx={{ mb: 2 }}
      >
        {showNewCaInput ? 'Cancel' : 'Create New CA'}
      </Button>

      {showNewCaInput && (
        <Box sx={{ mb: 2 }}>
  <TextField
    fullWidth
    label="New CA Common Name"
    value={newCa}
    onChange={(e) => setNewCa(e.target.value)}
    sx={{ mb: 2 }}
  />
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Button variant="contained" type="submit">Create</Button>
    <Button
      variant="contained"
      onClick={() => setShowNewCaInput(false)}
    >
      Cancel
    </Button>
  </Box>
</Box>
      )}

      <Button variant="contained" color="primary" onClick={handleIssueCertificate}>Issue Certificate</Button>
    </Box>
  );
};

export default Certificates;
