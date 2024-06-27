import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Box} from '@mui/material';
import Certificates from './Certificates'; // Import Certificates component

const CSRDetails = () => {
  const { id } = useParams();
  const [csr, setCsr] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchCSR = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/csrs/${id}`);
        setCsr(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching CSR details:', error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCSR();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>; // Display error message
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">CSR Details</Typography>
      <Typography variant="h6">Username: {csr.username}</Typography>
      <Typography variant="body2">Organization: Cinezo </Typography>
      <Typography variant="body2">Status: {csr.status}</Typography>
      <Box sx={{ mt: 3 }}>
        <Certificates />
      </Box>
    </Box>
  );
};

export default CSRDetails;
/*     
import { Typography, Box, Button } from '@mui/material';

        <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => {
          // Add your logic for authorizing the CSR here
          console.log('Authorize CSR', csr._id);
        }}
      >
        Authorize CSR
      </Button>
      */