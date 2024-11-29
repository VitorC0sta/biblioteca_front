import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Button, Modal, TextField, Grid, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StatusCell } from '../../components/status-cell/index';
import DeleteIcon from '@mui/icons-material/Delete';
import { del, get, post, put } from '../../../api';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
};

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Título do Livro',
  },
  {
    id: 'borrower',
    numeric: false,
    disablePadding: false,
    label: 'Empréstimo por',
  },
  {
    id: 'isProfessor',
    numeric: false,
    disablePadding: false,
    label: 'Professor',
  },
  {
    id: 'loanCount',
    numeric: true,
    disablePadding: false,
    label: 'Nº de Empréstimos',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Ações',
  }
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = ({ onOpenLoanModal }) => (
  <Toolbar>
    <Typography variant="h6" component="div" margin="-0.5rem" sx={{ flex: 1 }}>
      Empréstimos
    </Typography>
    <Button 
      variant="contained"
      onClick={onOpenLoanModal}
    >
      Gerar Empréstimo
    </Button>
  </Toolbar>
);

export const LendingTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('loanCount');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openLoanModal, setOpenLoanModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [isProfessor, setIsProfessor] = React.useState(false);
  const [isReservation, setIsReservation] = React.useState(false);  
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [newStatus, setNewStatus] = React.useState('');
  const [emprestimosData, setEmprestimosData] = React.useState([]);
  const [userLendingCount, setUserLendingCount] = React.useState({});
  const [disponibleBooks, setDisponibleBooks] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [lending, setLending] = React.useState([]);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [statusEmprestimo, setStatusEmprestimo] = React.useState('ativo');
  const [dataDevolucao, setDataDevolucao] = React.useState('');

  const [livros, setLivros] = React.useState([]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [livrosResponse, usuariosResponse, emprestimosResponse] = await Promise.all([
          get('/livros'),
          get('/usuarios'),
          get('/emprestimos')
        ]);
        
        setLivros(livrosResponse.filter((livro) => livro.statusLivro === 'disponivel'));
        setUsers(usuariosResponse);
        setEmprestimosData(emprestimosResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenUpdateModal = (row) => {
    setSelectedItem(row.id);
    setSelectedUser(row.usuarioId);
    setSelectedBook(row.livroId);
    setStatusEmprestimo(row.statusEmprestimo);
    setDataDevolucao(row.dataDevolucao);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedItem(null);
    setSelectedUser(null);
    setSelectedBook(null);
    setStatusEmprestimo('ativo');
    setDataDevolucao('');
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [livrosResponse, usuariosResponse, emprestimosResponse] = await Promise.all([
          get('/livros'),
          get('/usuarios'),
          get('/emprestimos')
        ]);
        
        setDisponibleBooks(livrosResponse.filter((book) => book.statusLivro === 'disponivel'));
        setUsers(usuariosResponse);
        setLending(emprestimosResponse);
        generateEmprestimos(emprestimosResponse);
        countLending(emprestimosResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const generateEmprestimos = (emprestimos) => { 
    const emprestimosFormatted = emprestimos?.map(emprestimo => {
      return {
        id: emprestimo.idEmprestimo,
        idUsuario: emprestimo.usuarioId.idUsuario,
        idLivro: emprestimo.livroId.idLivro,
        nome: emprestimo.usuarioId.nomeUsuario,
        isProfessor: emprestimo.usuarioId.tipoUsuario === "professor",
        title: emprestimo.livroId.tituloLivro,
        status: emprestimo.statusEmprestimo,
        statusLivro: emprestimo.livroId.statusLivro
      }
    })
    setEmprestimosData(emprestimosFormatted);
  }
  
  const countLending = (emprestimos) => {
    const userLendingCount = {};

    emprestimos.forEach((emprestimo) => {
      const usuarioId = emprestimo.usuarioId.idUsuario;

      if (!userLendingCount[usuarioId]) {
        userLendingCount[usuarioId] = {
          nome: emprestimo.usuarioId.nomeUsuario,
          count: 1
        };
      } else {
        userLendingCount[usuarioId].count += 1;
      }
    });
    setUserLendingCount(userLendingCount);
  };

  const handleOpenLoanModal = () => {
    setOpenLoanModal(true);
  };
  
  const handleCloseLoanModal = () => {
    setOpenLoanModal(false);
    setSelectedUser(null);
    setSelectedBook(null);
    setIsProfessor(false);
    setIsReservation(false);
  };
  
  const handleUserChange = (e) => {
    const user = users?.find((user) => user.idUsuario === e.target.value);
    if (user) {
      setSelectedUser(user);
      setIsProfessor(user.isProfessor);
    }
  };
  
  const handleBookChange = (e) => {
    const book = disponibleBooks?.find(
      (book) => book.idLivro === e.target.value
    );
    if (book) {
      setSelectedBook(book);
    } else {
      setSelectedBook(null);
    }
  };

  const handleGenerateLoan = async () => {
    const payload = {
      usuarioId: {
        idUsuario: selectedUser.idUsuario
      },
      livroId: {
        idLivro: selectedBook.idLivro
      }
    };
    
    try {
      const result = await post('/emprestimos', payload);
      console.log('Empréstimo gerado com sucesso:', result);
      generateEmprestimos(lending);
      handleCloseLoanModal();
    } catch (error) {
      console.error('Erro ao gerar empréstimo:', error);
    }
  };

  const handleDeleteEmprestimo = async () => {
    try {
      await del(`/emprestimos/${selectedItem}`);
      setEmprestimosData(emprestimosData.filter((item) => item.id !== selectedItem));
    } catch (error) {
      console.error('Erro ao deletar empréstimo:', error);
    }
    
    setOpen(false);
    
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleUpdateLoan = async () => {
    const payload = {
      usuarioId: { idUsuario: selectedUser.idUsuario },
      livroId: { idLivro: selectedBook.idLivro },
      statusEmprestimo: statusEmprestimo,
      dataDevolucao: dataDevolucao
    };

    try {
      const result = await put(`/emprestimos/${selectedItem}`, payload);
      console.log('Empréstimo atualizado com sucesso:', result);
      setEmprestimosData((prevState) => 
        prevState.map((item) =>
          item.id === selectedItem ? { ...item, statusEmprestimo, dataDevolucao } : item
        )
      );
      handleCloseUpdateModal();
    } catch (error) {
      console.error('Erro ao atualizar empréstimo:', error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar onOpenLoanModal={handleOpenLoanModal} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {emprestimosData?.length > 0 && stableSort(emprestimosData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.isProfessor ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>{userLendingCount[row.idUsuario]?.count || 0}</TableCell>
                    <TableCell>
                      <StatusCell status={row.status} statusLivro={row.statusLivro} />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        onClick={() => { setSelectedItem(row.id); setOpen(true); }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                        <IconButton onClick={() => handleOpenUpdateModal(row)}>
                      <EditIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={emprestimosData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal de Empréstimo */}
      <Modal
        open={openLoanModal}
        onClose={handleCloseLoanModal}
        aria-labelledby="modal-loan-title"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-loan-title" variant="h6" component="h2">
            Gerar Empréstimo
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-user-label">Selecione o Usuário</InputLabel>
                <Select
                  labelId="select-user-label"
                  value={selectedUser ? selectedUser.idUsuario : ''}
                  onChange={handleUserChange}
                  label="Selecione o Usuário"
                >
                  {users?.map((user) => (
                    <MenuItem key={user.idUsuario} value={user.idUsuario}>
                      {user.nomeUsuario}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-book-label">Selecione o Livro</InputLabel>
                <Select
                  labelId="select-book-label"
                  value={selectedBook ? selectedBook.idLivro : ''}
                  onChange={handleBookChange}
                  label="Selecione o Livro"
                >
                  {disponibleBooks?.map((book) => (
                    <MenuItem key={book.idLivro} value={book.idLivro}>
                      {book.tituloLivro}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={isProfessor} onChange={(e) => setIsProfessor(e.target.checked)} />}
                label="É Professor"
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleGenerateLoan} variant="contained" fullWidth>
                Gerar Empréstimo
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-delete-loan-title"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-delete-loan-title" variant="h6" component="h2">
            Confirmar Exclusão
          </Typography>
          <Typography>Tem certeza que deseja deletar esse empréstimo?</Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Button onClick={() => setOpen(false)} fullWidth>
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleDeleteEmprestimo} variant="contained" color="error" fullWidth>
                Excluir
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Modal de Atualização */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal} aria-labelledby="modal-update-loan">
        <Box sx={modalStyle}>
          <Typography id="modal-update-loan" variant="h6" component="h2">
            Atualizar Empréstimo
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-user-label">Selecione o Usuário</InputLabel>
                <Select
                  labelId="select-user-label"
                  value={selectedUser ? selectedUser.idUsuario : ''}
                  onChange={(e) => setSelectedUser(users.find(user => user.idUsuario === e.target.value))}
                  label="Selecione o Usuário"
                >
                  {users.map((user) => (
                    <MenuItem key={user.idUsuario} value={user.idUsuario}>
                      {user.nomeUsuario}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-book-label">Selecione o Livro</InputLabel>
                <Select
                  labelId="select-book-label"
                  value={selectedBook ? selectedBook.idLivro : ''}
                  onChange={(e) => setSelectedBook(livros.find(book => book.idLivro === e.target.value))}
                  label="Selecione o Livro"
                >
                  {livros.map((book) => (
                    <MenuItem key={book.idLivro} value={book.idLivro}>
                      {book.tituloLivro}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Data de Devolução"
                type="date"
                value={dataDevolucao}
                onChange={(e) => setDataDevolucao(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  label="Status do Empréstimo"
                  value={statusEmprestimo}
                  onChange={(e) => setStatusEmprestimo(e.target.value)}
                >
                  <MenuItem value="ativo">Ativo</MenuItem>
                  <MenuItem value="finalizado">Finalizado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleUpdateLoan} variant="contained" fullWidth>
                Atualizar Empréstimo
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

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
  width: '400px',
};
