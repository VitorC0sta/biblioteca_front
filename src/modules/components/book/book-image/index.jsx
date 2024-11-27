import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Estilização para o container do livro
const BookContainer = styled(Box)(({ theme }) => ({
  width: '220px',
  height: '320px',
  position: 'relative',
  perspective: '1000px', // Adiciona perspectiva 3D
}));

// Estilização da capa do livro, incluindo frente, dorso e parte de trás
const BookCover = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s ease',
}));

const FrontCover = styled(Box)(({ theme }) => ({
  width: '70%',
  backgroundColor: '#f4a261', // Cor da capa
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px 0 0 10px',
  zIndex: 2,
}));

const Spine = styled(Box)(({ theme }) => ({
  width: '15%',
  backgroundColor: '#2a9d8f', // Cor do dorso
  boxShadow: '1px 0 5px rgba(0, 0, 0, 0.2)',
  zIndex: 1,
}));

const BackCover = styled(Box)(({ theme }) => ({
  width: '70%',
  backgroundColor: '#264653', // Cor da parte de trás
  left: '70%',
  borderRadius: '0 10px 10px 0',
  zIndex: 0,
}));

// Componente Book
const BookComponent = () => {
  return (
    <BookContainer
      onMouseEnter={(e) => (e.currentTarget.querySelector('.book-cover').style.transform = 'rotateY(10deg)')}
      onMouseLeave={(e) => (e.currentTarget.querySelector('.book-cover').style.transform = 'rotateY(0deg)')}
    >
      <BookCover className="book-cover">
        <FrontCover>
        </FrontCover>
        <Spine />
        <BackCover />
      </BookCover>
    </BookContainer>
  );
};

export default BookComponent;
