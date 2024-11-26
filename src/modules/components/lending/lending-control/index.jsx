import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  IconButton,
  Modal
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { StatusCell } from '../../status-cell';

const createData = (id, title, borrower, isProfessor, createdAt, status, loanCount) => {
  return { id, title, borrower, isProfessor, createdAt, status, loanCount };
};

const rows = [
  createData(1, 'O Senhor dos Anéis', 'João Silva', true, '2024-11-05', 'emprestado', 5),
  createData(2, '1984', 'Maria Oliveira', false, '2024-11-03', 'devolvido', 2),
  createData(3, 'Dom Quixote', 'Carlos Pereira', true, '2024-10-30', 'emprestado', 3),
  createData(4, 'A Origem das Espécies', 'Ana Costa', false, '2024-10-28', 'devolvido', 1),
  createData(5, 'Moby Dick', 'Pedro Souza', false, '2024-11-01', 'emprestado', 7),
];

export const LendingControl = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const activeLoans = rows.filter((row) => row.status === 'emprestado');

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título do Livro</TableCell>
              <TableCell>Empréstimo</TableCell>
              <TableCell>Professor</TableCell>
              <TableCell>Número de Empréstimos</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeLoans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} hover onClick={() => handleRowClick(row)}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.borrower}</TableCell>
                <TableCell>{row.isProfessor ? 'Sim' : 'Não'}</TableCell>
                <TableCell>{row.loanCount}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <StatusCell status={row.status}/>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => { e.stopPropagation(); handleRowClick(row); }}>
                    <FilterListIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activeLoans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: '10% auto', width: 400 }}>
          <Typography variant="h6">Detalhes do Empréstimo</Typography>
          {selectedItem && (
            <Box>
              <Typography>Título: {selectedItem.title}</Typography>
              <Typography>Empréstimo por: {selectedItem.borrower}</Typography>
              <Typography>Professor: {selectedItem.isProfessor ? 'Sim' : 'Não'}</Typography>
              <Typography>Data de Criação: {selectedItem.createdAt}</Typography>
              <Typography>Status: {selectedItem.status}</Typography>
              <Typography>Número de Empréstimos: {selectedItem.loanCount}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
