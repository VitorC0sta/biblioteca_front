import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Paper, Typography, createTheme, ThemeProvider } from '@mui/material';

// Função para o efeito de digitação
const TypeWriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typeWriter = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    const interval = setInterval(typeWriter, 100);

    return () => clearInterval(interval);
  }, [index, text]);

  return <Typography variant="h6" className="typewriter">{displayedText}</Typography>;
};

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
      <Container maxWidth="lg" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        {/* <Box sx={{ display: 'flex', width: '100%', height: '100%', borderRadius: '8px' }}>
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}>
            <TypeWriterEffect text="Entre no mundo dos livros!" />
          </Box> */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}>
            <Paper elevation={3} sx={{ width: '100%', padding: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom textAlign="center" color="text.primary">
                Login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Entrar
                </Button>
              </form>
            </Paper>
          </Box>
      </Container>
  );
};
