import React, { useState } from 'react';
import { Container, Typography, TextField, Box, Paper, Stack, IconButton, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, nome: 'João Silva', tipo: 'aluno', emprestimos: [{ nome: 'O Senhor dos Anéis', vencimento: '2024-12-01' }] },
    { id: 2, nome: 'Maria Oliveira', tipo: 'professor', emprestimos: [] },
    { id: 3, nome: 'Carlos Pereira', tipo: 'aluno', emprestimos: [{ nome: '1984', vencimento: '2024-11-25' }] },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ nome: '', tipo: 'aluno' });

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
    setNewUser({ nome: '', tipo: 'aluno' });
  };

  const handleAddUser = () => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { id: prevUsers.length + 1, nome: newUser.nome, tipo: newUser.tipo, emprestimos: [] },
    ]);
    handleCloseAddUserModal();
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom style={{display: "flex", justifyContent:"space-between", }}>
          Usuários
          <Button variant="contained" onClick={handleOpenAddUserModal} sx={{ ml: 2 }}>
            Novo Usuário
          </Button>
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="tabela de usuários">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Empréstimos</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.tipo}</TableCell>
                  <TableCell sx={{ color: user.emprestimos.length > 0 ? 'red' : 'inherit' }}>
                    {user.emprestimos.length > 0 ? `Vencidos (${user.emprestimos.length})` : 'Nenhum'}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenModal(user)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal de Usuário */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {selectedUser && (
            <>
              <Typography variant="h6" color="white">Detalhes do Usuário</Typography>
              <TextField
                label="ID"
                value={selectedUser.id}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nome"
                value={selectedUser.nome}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Tipo"
                value={selectedUser.tipo}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{ mb: 2 }}
              />
              {selectedUser.emprestimos.length > 0 && (
                <Box>
                  <Typography variant="h6" color="white" gutterBottom>Empréstimos Vencidos</Typography>
                  <TableContainer>
                    <Table size="small" aria-label="empréstimos vencidos">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'white' }}>Nome do Empréstimo</TableCell>
                          <TableCell sx={{ color: 'white' }}>Data de Vencimento</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedUser.emprestimos.map((emprestimo, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>{emprestimo.nome}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{emprestimo.vencimento}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              <Button variant="outlined" onClick={handleCloseModal} fullWidth sx={{ mt: 2, color: 'white', borderColor: 'white' }}>
                Fechar
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal de Adicionar Usuário */}
      <Modal open={openAddUserModal} onClose={handleCloseAddUserModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" color="white">Adicionar Usuário</Typography>
          <TextField
            label="Nome"
            name="nome"
            value={newUser.nome}
            onChange={handleNewUserChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Tipo"
            name="tipo"
            select
            value={newUser.tipo}
            onChange={handleNewUserChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="aluno">Aluno</MenuItem>
            <MenuItem value="professor">Professor</MenuItem>
          </TextField>
          <div className="button-wrap" style={{display: "flex", justifyContent:"space-between"}}>
            <Button variant="contained" onClick={handleAddUser}  sx={{ mt: 2 }}>
              Adicionar
            </Button>
            <Button variant="outlined" onClick={handleCloseAddUserModal}  sx={{ mt: 2, color: 'white', borderColor: 'white' }}>
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
};

// Estilos para o modal
const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: 24,
  background: '#565656',
  width: '500px',
};