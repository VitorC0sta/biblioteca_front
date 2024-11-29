import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Paper, Typography, Alert, IconButton } from '@mui/material';
import { useAuth } from '../../contexts/authorization';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { post } from '../../api';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Função para o efeito de digitação (opcional)
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
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar mensagens de erro
  const [showPassword, setShowPassword] = useState(false);

  // Função chamada ao submeter o formulário de login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await post('/gerentes/login', { email, senha: password });

      console.log(response)
      if (response.message === "Login bem-sucedido!") {
        login({ email,  password}); 
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('Credenciais inválidas ou erro de conexão.');
      console.error('Erro no login:', error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Alternar entre visível e invisível
  };

  // Redirecionar para a página principal se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
        <Paper elevation={3} sx={{ width: '100%', padding: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom textAlign="center" color="text.primary">
            Login
          </Typography>

          {/* Mostrar mensagem de erro se houver */}
          {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}

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
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
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
