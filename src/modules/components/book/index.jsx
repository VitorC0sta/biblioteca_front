import { Box, Typography } from "@mui/material";
import BookComponent from "./book-image";

export const Book = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        height: '20rem',
        width: '12rem',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          '& .overlay': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Exibe a capa estilizada do livro */}
      <BookComponent/>

      {/* Overlay com título e subtítulo */}
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'opacity 0.3s ease',
          padding: '1rem',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {title || 'Título desconhecido'}
        </Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
          {subtitle || 'Subtítulo não disponível'}
        </Typography>
      </Box>
    </Box>
  );
};