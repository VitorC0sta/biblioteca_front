import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider, Paper } from '@mui/material';
import { Alert } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { get } from '../../../api';

const overdueBooks = [
  { title: '1984', user: 'Alice', dueDate: '2024-11-05', isProfessor: false },
  { title: 'O Senhor dos Anéis', user: 'Bob', dueDate: '2024-11-03', isProfessor: true },
  { title: 'Moby Dick', user: 'Charlie', dueDate: '2024-11-01', isProfessor: false },
];

export const OverdueBooksList = () => {
  const [emprestimosData, setEmprestimosData] = React.useState([]);
  const [lending, setLending] = React.useState();

  const handleGetLending = async () => {
    try {
      const response = await get('/emprestimos');
      setLending(response);
    } catch ( error ) {
      throw error
    }
  }

  React.useEffect(() => {
    handleGetLending();
  }, [])
  
  const generateEmprestimos = () => {
    const emprestimos = lending?.map(emprestimo => {
      return {
        id: emprestimo.idEmprestimo,
        idUsuario: emprestimo.usuarioId.idUsuario,
        idLivro: emprestimo.livroId.idLivro,
        nome: emprestimo.usuarioId.nomeUsuario,
        isProfessor: emprestimo.usuarioId.tipoUsuario === "professor",
        title: emprestimo.livroId.tituloLivro,
        status: emprestimo.statusEmprestimo,
        statusLivro: emprestimo.livroId.statusLivro,
        dueDate: emprestimo.dataPrevistaDevolução
      }
    })

    setEmprestimosData(emprestimos);
  }

  useEffect(() => {
    generateEmprestimos();
  }, [])

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Livros em Atraso
      </Typography>
      {emprestimosData?.length > 0 ? (
        <List>
          {overdueBooks.map((emprestimo, index) => (
            <div key={index}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar style={{background: '#e74c3c'}}>
                    <BookIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {emprestimo.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {`Usuário: ${emprestimo.nome}${book.isProfessor ? ' (Professor)' : ''}`}
                      </Typography>
                      <br />
                      <Typography variant="body2">
                        {`Data de Devolução: ${emprestimo.dueDate}`}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < overdueBooks.length - 1 && <Divider variant="inset" component="li" />}
            </div>
          ))}
        </List>
      ) : (
        <Alert severity="info">Nenhum livro em atraso no momento.</Alert>
      )}
    </Paper>
  );
};
