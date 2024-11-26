import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider, Paper } from '@mui/material';
import { Alert } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

const overdueBooks = [
  { title: '1984', user: 'Alice', dueDate: '2024-11-05', isProfessor: false },
  { title: 'O Senhor dos Anéis', user: 'Bob', dueDate: '2024-11-03', isProfessor: true },
  { title: 'Moby Dick', user: 'Charlie', dueDate: '2024-11-01', isProfessor: false },
];

export const OverdueBooksList = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Livros em Atraso
      </Typography>
      {overdueBooks.length > 0 ? (
        <List>
          {overdueBooks.map((book, index) => (
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
                      {book.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {`Usuário: ${book.user}${book.isProfessor ? ' (Professor)' : ''}`}
                      </Typography>
                      <br />
                      <Typography variant="body2">
                        {`Data de Devolução: ${book.dueDate}`}
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
