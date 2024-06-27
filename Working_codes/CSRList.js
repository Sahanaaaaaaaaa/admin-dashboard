/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import WebSocket from 'isomorphic-ws'; // Install using npm install isomorphic-ws

const CSRList = () => {
  const [csrs, setCsrs] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const fetchCSRs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/csrs');
        setCsrs(response.data);
      } catch (error) {
        console.error('Error fetching CSRs:', error);
      }
    };

    fetchCSRs();

    const socket = new WebSocket('ws://localhost:5000');

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'newCSR') {
        fetchCSRs();
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const authorizeCSR = async (csrId) => {
    try {
      await axios.post(`http://localhost:5000/authorize/${csrId}`);
      setCsrs(csrs.map((csr) => (csr._id === csrId ? { ...csr, status: 'Authorized' } : csr)));
    } catch (error) {
      console.error('Error authorizing CSR:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Pending CSRs</Typography>
      {csrs.map((csr) => (
        <Card key={csr._id} style={{ margin: '10px 0' }}>
          <CardContent>
            <Typography variant="h6">Username: {csr.username}</Typography>
            <Typography variant="body2">Organization: {csr.organization}</Typography>
            <Typography variant="body2">Status: {csr.status}</Typography>
            {csr.status === 'Pending' && (
              <Button variant="contained" color="primary" onClick={() => authorizeCSR(csr._id)}>
                Authorize
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CSRList;
 */
/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CSRList = () => {
  const [csrs, setCsrs] = useState([]);

  useEffect(() => {
    const fetchCSRs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/csrs');
        setCsrs(response.data);
      } catch (error) {
        console.error('Error fetching CSRs:', error);
      }
    };

    fetchCSRs();
  }, []);

  const authorizeCSR = async (csrId) => {
    try {
      await axios.post(`http://localhost:5000/authorize/${csrId}`);
      setCsrs(csrs.map((csr) => (csr._id === csrId ? { ...csr, status: 'Authorized' } : csr)));
    } catch (error) {
      console.error('Error authorizing CSR:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Pending CSRs</Typography>
      {csrs.map((csr) => (
        <Card key={csr._id} style={{ margin: '10px 0' }}>
          <CardContent>
            <Typography variant="h6">Username: {csr.username}</Typography>
            <Typography variant="body2">Organization: {csr.organization}</Typography>
            <Typography variant="body2">Status: {csr.status}</Typography>
            {csr.status === 'Pending' && (
              <Button variant="contained" color="primary" onClick={() => authorizeCSR(csr._id)}>
                Authorize
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CSRList; */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const CSRList = () => {
  const [csrs, setCsrs] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCSRs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/csrs');
        setCsrs(response.data);
      } catch (error) {
        console.error('Error fetching CSRs:', error);
      }
    };

    fetchCSRs();
  }, []);

  const handleAuthorizeClick = (csrId) => {
    navigate(`/csr-details/${csrId}`);
  };

  return (
    <div>
      <Typography variant="h4">Pending CSRs</Typography>
      {csrs.map((csr) => (
        <Card key={csr._id} style={{ margin: '10px 0' }}>
          <CardContent>
            <Typography variant="h6">Username: {csr.username}</Typography>
            <Typography variant="body2">Organization: {csr.organization}</Typography>
            <Typography variant="body2">Status: {csr.status}</Typography>
            {csr.status === 'Pending' && (
              <Button variant="contained" color="primary" onClick={() => handleAuthorizeClick(csr._id)}>
                Authorize
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CSRList;




