import { Box, Typography } from '@mui/material';

export const Book = ({ imageUrl, title, subtitle }) => {
  const hasImage = imageUrl && imageUrl.startsWith('http');

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
        backgroundColor: !hasImage ? '#f0f0f0' : undefined, 
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          '& .image': {
            opacity: 0.3, 
          },
          '& .overlay': {
            opacity: 1,
          },
        },
      }}
    >

      {hasImage ? (
        <img
          src={imageUrl}
          alt="Book Cover"
          className="image"
          style={{
            objectFit: 'cover', 
            width: '100%', 
            height: '100%',
            transition: 'all 0.3s ease', 
          }}
        />
      ) : (
        <Box
          sx={{
            height: '100%', 
            width: '100%', 
            backgroundColor: '#e0e0e0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="textSecondary">Sem imagem</Typography>
        </Box>
      )}

 
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
