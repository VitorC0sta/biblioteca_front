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
import { Button, Modal, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StatusCell } from '../../components/status-cell/index';

// Dados de livros
const createData = (id, title, author, year, status) => {
  return {
    id,
    title,
    author,
    year,
    status,
  };
};

const rows = [
  createData(1, 'O Senhor dos Anéis', 'J.R.R. Tolkien', 1954, 'disponivel'),
  createData(2, '1984', 'George Orwell', 1949, 'emprestado'),
  createData(3, 'Dom Quixote', 'Miguel de Cervantes', 1605, 'disponivel'),
  createData(4, 'A Origem das Espécies', 'Charles Darwin', 1859, 'disponivel'),
  createData(5, 'Moby Dick', 'Herman Melville', 1851, 'emprestado'),
  createData(6, 'O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 1943, 'disponivel'),
  createData(7, 'A Metamorfose', 'Franz Kafka', 1915, 'disponivel'),
  createData(8, 'Crime e Castigo', 'Fiódor Dostoévski', 1866, 'emprestado'),
  createData(9, 'Ulisses', 'James Joyce', 1922, 'disponivel'),
  createData(10, 'Guerra e Paz', 'Liev Tolstói', 1869, 'perdido'),
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
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Autor',
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Ano de Publicação',
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
const EnhancedTableToolbar = () => (
  <Toolbar>
    <Typography variant="h6" component="div" margin="-0.5rem">
      Livros
    </Typography>
  </Toolbar>
);

// Componente principal da tabela
export const LibraryTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('year');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null); // Item para edição no modal

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort} 
            />
            <TableBody sx={{}}>
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
                    <TableCell align="left">{row.author}</TableCell>
                    <TableCell align="left">{row.year}</TableCell>
                    <TableCell align="left"><StatusCell status={row.status} /></TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleClickEdit(row)} 
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
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
        <Box sx={{ ...modalStyle }}>
          {selectedItem && (
            <>
              <Typography variant="h6">Editar Livro</Typography>
              <div className="wrapper">
                <TextField
                  label="Id"
                  disabled
                  fullWidth
                  defaultValue={selectedItem.id}
                  sx={{ mb: 2,  }}
                />
                <TextField
                  label="Título"
                  fullWidth
                  defaultValue={selectedItem.title}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Autor"
                  fullWidth
                  defaultValue={selectedItem.author}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Ano"
                  fullWidth
                  defaultValue={selectedItem.year}
                  sx={{ mb: 2 }}
                />
                <div className="button-wrapp" style={{display: "flex", justifyContent: "space-between"}}>
                  <Button variant="contained" onClick={handleClose}>Salvar</Button>
                  <Button onClick={handleClose} variant="outlined">Close</Button>
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
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: 24,
  background: "#565656"
};
