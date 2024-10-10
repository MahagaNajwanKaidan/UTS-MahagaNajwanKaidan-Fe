import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const halaman = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        textAlign: 'center' 
      }}
    >
      <Typography variant="h3" gutterBottom>
      </Typography>
      <Typography variant="body1" gutterBottom>
      </Typography>
      <Link to="/home" style={{}}>
        <Button>
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default halaman;
