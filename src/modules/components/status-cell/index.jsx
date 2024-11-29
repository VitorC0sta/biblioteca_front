import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StatusBadge = styled(Box)(({ status }) => {
  let backgroundColor;
  switch (status) {
    case 'disponivel':
      backgroundColor = '#2ecc71';
      break;
    case 'finalizado':
      backgroundColor = '#2ecc71';
      break;
    case 'emprestado':
      backgroundColor = '#3498db';
      break;
    case 'ativo':
      backgroundColor = '#3498db';
      break;
    case 'perdido':
      backgroundColor = '#e67e22';
      break;
    case 'vencido':
      backgroundColor = '#e74c3c';
      break;
    default:
      backgroundColor = '#bdc3c7';
  }

  return {
    width: '7rem',
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor,
  };
});


export const StatusCell = ({ status }) => (
  <StatusBadge status={status}>
    {status?.charAt(0).toUpperCase() + status?.slice(1)}
  </StatusBadge>
);

