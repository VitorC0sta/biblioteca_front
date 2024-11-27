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
import { Button, Modal, TextField, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StatusCell } from '../../components/status-cell/index';

// Dados de empréstimos
const createData = (id, title, borrower, isProfessor, status, loanCount) => {
  return {
    id,
    title,
    borrower,
    isProfessor,
    status,
    loanCount,
  };
};

const rows = [
  createData(1, 'O Senhor dos Anéis', 'João Silva', true, 'emprestado', 5),
  createData(2, '1984', 'Maria Oliveira', false, 'devolvido', 2),
  createData(3, 'Dom Quixote', 'Carlos Pereira', true, 'emprestado', 3),
  createData(4, 'A Origem das Espécies', 'Ana Costa', false, 'devolvido', 1),
  createData(5, 'Moby Dick', 'Pedro Souza', false, 'emprestado', 7),
  createData(6, 'O Pequeno Príncipe', 'Lucas Silva', true, 'devolvido', 4),
  createData(7, 'A Metamorfose', 'Renata Costa', false, 'perdido', 2),
  createData(8, 'Crime e Castigo', 'Carlos Pereira', true, 'emprestado', 1),
  createData(9, 'Ulisses', 'Maria Oliveira', false, 'devolvido', 8),
  createData(10, 'Guerra e Paz', 'Ana Costa', true, 'perdido', 6),
];

// Função para comparar os dados
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Função para obter o comparador
const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]); // Mapeando cada item com seu índice
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]); // Compara os valores
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1]; // Se os valores forem iguais, preserva a ordem original
  });
  return stabilizedThis.map((el) => el[0]); // Retorna apenas os elementos sem os índices
};

// Cabeçalhos da tabela
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
    label: 'Número de Empréstimos',
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

// Componente para cabeçalho da tabela
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

// Componente da toolbar
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

// Componente principal da tabela
export const LendingTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('loanCount');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null); // Item para edição no modal
  const [newStatus, setNewStatus] = React.useState('');
  const [isProfessor, setIsProfessor] = React.useState('');

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClickEdit = (row) => {
    setSelectedItem(row); // Preenche o item selecionado no modal
    setOpen(true); // Abre o modal
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenLoanModal = () => {
    setOpen(true);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleProfessorChange = (e) => {
    setIsProfessor(e.target.value)
  }

  const handleGenerateLoan = () => {
    // Lógica para gerar empréstimo no banco de dados
    console.log("Empréstimo gerado");
    handleClose();
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" padding="normal">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.borrower}</TableCell>
                    <TableCell align="left">{row.isProfessor ? 'Sim' : 'Não'}</TableCell>
                    <TableCell align="left">{row.loanCount}</TableCell>
                    <TableCell align="left"><StatusCell status={row.status} /></TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleClickEdit(row)} 
                        variant="text"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal de Edição */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedItem && (
            <>
              <Typography variant="h6">Editar Empréstimo</Typography>
              <div className="wrapper">
                <TextField
                  label="ID"
                  disabled
                  fullWidth
                  defaultValue={selectedItem.id}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Título do Livro"
                  fullWidth
                  defaultValue={selectedItem.title}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Empréstimo por"
                  fullWidth
                  defaultValue={selectedItem.borrower}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Professor</InputLabel>
                  <Select
                    value={isProfessor !== '' ? isProfessor : selectedItem.isProfessor}
                    onChange={handleProfessorChange}
                    label="Professor"
                  >
                    <MenuItem value={true}>Sim</MenuItem>
                    <MenuItem value={false}>Não</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Número de Empréstimos"
                  fullWidth
                  type="number"
                  defaultValue={selectedItem.loanCount}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newStatus || selectedItem.status}
                    onChange={handleStatusChange}
                    label="Status"
                  >
                    <MenuItem value="emprestado">Emprestado</MenuItem>
                    <MenuItem value="perdido">Perdido</MenuItem>
                  </Select>
                </FormControl>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" onClick={handleGenerateLoan}>Salvar</Button>
                  <Button variant="outlined" onClick={handleClose}>Fechar</Button>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </Box>
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
  width: '400px',
};
