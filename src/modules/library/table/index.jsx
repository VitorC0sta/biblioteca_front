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
import {Modal, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StatusCell } from '../../components/status-cell/index';
import { del, get, post, put } from '../../../api';
import DeleteIcon from '@mui/icons-material/Delete';

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
    id: 'idLivro',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'tituloLivro',
    numeric: false,
    disablePadding: true,
    label: 'Título do Livro',
  },
  {
    id: 'autorLivro',
    numeric: false,
    disablePadding: false,
    label: 'Autor',
  },
  {
    id: 'anoPublicacao',
    numeric: true,
    disablePadding: false,
    label: 'Ano de Publicação',
  },
  {
    id: 'statusLivro',
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
            width={headCell.id === "tituloLivro"? "": "15%"}
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
const EnhancedTableToolbar = ({handleOpenModal}) => (
  <Toolbar style={{display:"flex", justifyContent: "space-between"}}>
    <Typography variant="h6" component="div" margin="-0.5rem">
      Livros
    </Typography>
    <Button variant="contained" onClick={handleOpenModal}>Adicionar Livro</Button>
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
  const [openCreateBookModal, setOpenCreateBookModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({id: 0, tituloLivro: '', autorLivro: '', anoPublicacao: '' }); // Item para edição no modal
  const [newBook, setNewBook] = React.useState({ tituloLivro: '', autorLivro: '', anoPublicacao: '' });
  const [booksData, setBooksData] = React.useState();


  
  const getBooksData = async () => {
    try {
      const response = await get('/livros');
      setBooksData(response);
    } catch (error) {
      console.error("Erro ao buscar livros", error);
    }

  }

  const handleOpenCreateBookModal = () => setOpenCreateBookModal(true);
  const handleCloseCreateBookModal = () => setOpenCreateBookModal(false);
  
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };
  
  const handleAddBook = async () => {
    try {
      await post('/livros', newBook);
      console.log('Novo livro adicionado:', newBook);
      getBooksData();
    } catch (error) {
      alert('Falha ao cadastrar livro');
    }
    setOpenCreateBookModal(false);
    setNewBook({ title: '', author: '', imageUrl: '' }); 
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleUpdateBookModal = async () => {
    try {
      const updatedBook = { 
          tituloLivro: selectedItem.tituloLivro,
          autorLivro: selectedItem.autorLivro,
          anoPublicacao: selectedItem.anoPublicacao
      }

      await put(`/livros/${selectedItem.id}`, updatedBook);
      console.log("Livro atualizado: " + selectedItem);
      getBooksData();
    } catch (error) {
      alert('Falha ao cadastrar livro');
    }
    setOpen(false);
    setSelectedItem({id: 0, tituloLivro: '', autorLivro: '', anoPublicacao: '' });
  }
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleClickEdit = (row) => {
    console.log(row);
    setSelectedItem({
      id: row.idLivro,
      tituloLivro: row.tituloLivro,
      autorLivro: row.autorLivro,
      anoPublicacao: row.anoPublicacao,
    });
    setOpen(true);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteBook = async () => {
    const isConfirmed = window.confirm(`Tem certeza que deseja deletar o livro "${selectedItem?.tituloLivro}"?`);

    if (isConfirmed) {
      try {
        if (selectedItem) {
          await del(`/livros/${selectedItem.id}`);
          console.log("Livro Deletado:", selectedItem.tituloLivro);
          getBooksData();
        }
      } catch (error) {
        alert('Falha ao excluir o livro');
      }
    } else {
      console.log("Exclusão cancelada");
    }

    setOpen(false);
    setSelectedItem({id: 0, tituloLivro: '', autorLivro: '', anoPublicacao: '' });
  };
  
  React.useEffect(() => {
    getBooksData();
  }, [])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, booksData?.length - page * rowsPerPage);
  return (
    <Box sx={{ width: '100%',  }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar handleOpenModal={handleOpenCreateBookModal}/>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort} 
            />
            <TableBody sx={{}}>
              {booksData && stableSort(booksData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.idLivro+"book"}>
                    <TableCell component="th" scope="row" padding="normal" width="15%">
                      {row.idLivro}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="normal">
                      {row.tituloLivro}
                    </TableCell>
                    <TableCell align="left" padding="normal" width="15%">{row.autorLivro}</TableCell>
                    <TableCell align="left" padding="normal" width="15%">{row.anoPublicacao}</TableCell>
                    <TableCell align="left" padding="normal" width="15%"><StatusCell status={row.statusLivro} /></TableCell>
                    <TableCell align="left" padding="normal" width="15%">
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
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={booksData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal para adicionar livro */}
      <Dialog open={openCreateBookModal} onClose={handleCloseCreateBookModal}>
        <DialogTitle>Adicionar Livro</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            margin="normal"
            name="tituloLivro"
            value={newBook.tituloLivro}
            onChange={handleInputChange}
          />
          <TextField
            label="Autor"
            variant="outlined"
            fullWidth
            margin="normal"
            name="autorLivro"
            value={newBook.autorLivro}
            onChange={handleInputChange}
          />
          <TextField
            label="Ano"
            variant="outlined"
            fullWidth
            margin="normal"
            name="anoPublicacao"
            value={newBook.anoPublicacao}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateBookModal} color="secondary">Cancelar</Button>
          <Button onClick={handleAddBook} color="primary">Adicionar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Edição */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}>
          {selectedItem && (
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Editar Livro</Typography>
                <Button onClick={handleDeleteBook} color="error"><DeleteIcon /></Button>
              </Box>
              <div className="wrapper">
                <TextField
                  label="Id"
                  disabled
                  fullWidth
                  onChange={handleUpdateInputChange}
                  defaultValue={selectedItem.id}
                  sx={{ mb: 2,  }}
                />
                <TextField
                  label="Título"
                  fullWidth
                  name="tituloLivro"
                  onChange={handleUpdateInputChange}
                  defaultValue={selectedItem.tituloLivro}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Autor"
                  fullWidth
                  name="autorLivro"
                  onChange={handleUpdateInputChange}
                  defaultValue={selectedItem.autorLivro}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Ano"
                  fullWidth
                  name="anoPublicacao"
                  onChange={handleUpdateInputChange}
                  defaultValue={selectedItem.anoPublicacao}
                  sx={{ mb: 2 }}
                />
                <div className="button-wrapp" style={{display: "flex", justifyContent: "space-between"}}>
                  <Button variant="contained" onClick={handleUpdateBookModal}>Salvar</Button>
                  <Button onClick={handleClose} variant="outlined">Close</Button>
                </div>
              </div>
            </>
          )
          }
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
