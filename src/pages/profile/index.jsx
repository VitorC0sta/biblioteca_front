import React from 'react';
import { Avatar, Button, Container, Typography, TextField, Box, Paper, Stack } from '@mui/material';

export const Profile = () => {
  const user = {
    name: 'Vitor Costa',
    email: 'vitor.costa@example.com',
    profileImage: '/path/to/image.jpg', // caminho da imagem de exemplo
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack direction="column" spacing={3} alignItems="center">
          <Avatar
            alt={user.name}
            src={user.profileImage}
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h5" component="h1">
            {user.name}
          </Typography>
          <TextField
            label="Email"
            value={user.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Trocar Imagem
          </Button>
          <Button variant="outlined" color="secondary" fullWidth>
            Trocar Senha
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};
