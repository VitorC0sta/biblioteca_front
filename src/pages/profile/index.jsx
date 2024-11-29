import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Importando o axios
import { Container, Typography, TextField, Box, Paper, Stack, IconButton, Button, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { get, put } from '../../api';

export const Profile = () => {
  // Estado do perfil do gerente
  const [gerente, setGerente] = useState({
    nome: 'Vitor Costa',
    email: 'vitor.costa@example.com',
    senha: 'senhaAntiga123', 
  });

  const [senhaData, setSenhaData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [message, setMessage] = useState('');

  const gerenteId = 1; // Substitua pelo id do gerente que você deseja atualizar, ex: 1, 2, 3...

  // Função para buscar os dados do gerente
  const fetchGerente = async () => {
    try {
      const response = await get(`/gerentes/${gerenteId}`);
      setGerente(response.data);
    } catch (error) {
      console.error("Erro ao buscar gerente:", error);
      setMessage('Erro ao carregar os dados do gerente.');
    }
  };

  // Função para atualizar os dados do gerente
  const handleGerenteDataChange = async () => {
    if (senhaData.oldPassword !== gerente.senha) {
      setMessage('A senha antiga está incorreta.');
      return;
    }

    if (senhaData.newPassword.length < 8) {
      setMessage('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }


    setGerente((prevGerente) => ({
      ...prevGerente,
      senha: senhaData.newPassword,
    }));


    const updatedGerente = {
      ...gerente,
      senha: senhaData.newPassword, 
    };

    try {

      await put(`gerentes/${gerenteId}`, updatedGerente);
      setMessage('Dados alterados com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar gerente:", error);
      setMessage('Erro ao atualizar os dados do gerente.');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setGerente((prevGerente) => ({
      ...prevGerente,
      [name]: value,
    }));
  };

  // Função para fazer a requisição e buscar os dados do gerente quando o componente for montado
  useEffect(() => {
    fetchGerente();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack direction="column" spacing={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Typography variant="h5" component="h1">
              {gerente.nome}
            </Typography>
          </Box>

          {message && <Alert severity={message.includes('sucesso') ? 'success' : 'error'}>{message}</Alert>}

          <TextField
            label="Nome"
            name="nome"
            value={gerente.nome}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Email"
            value={gerente.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Senha Antiga"
            name="oldPassword"
            type="password"
            value={senhaData.oldPassword}
            onChange={(e) => setSenhaData({ ...senhaData, oldPassword: e.target.value })}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Nova Senha"
            name="newPassword"
            type="password"
            value={senhaData.newPassword}
            onChange={(e) => setSenhaData({ ...senhaData, newPassword: e.target.value })}
            fullWidth
            variant="outlined"
          />

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleGerenteDataChange}
          >
            Alterar Dados
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};
