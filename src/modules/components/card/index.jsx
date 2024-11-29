import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

export const CardStyled = ({ title, value, icon, iconColor }) => {
  return (
    <Card
      sx={{
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" color="text.secondary">
          {title || 'Titulo'}
        </Typography>
        <Typography variant="h4" component="div">
          {String(value).padStart(4, '0') || '0000'}
        </Typography>
      </Box>
      <Box sx={{ marginLeft: 2 }}>
        {React.cloneElement(icon || <FontDownloadIcon />, { 
          sx: {
              color: iconColor || 'primary.main',  
              fontSize: '3.4rem'
            } })}
      </Box>
    </Card>
  );
};
