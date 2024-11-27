import { useState } from 'react';
import { Link } from "react-router-dom";

import { Book } from "../../modules/components/book";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { LibraryTable } from '../../modules/library/table';

export const Library = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', imageUrl: '' });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddBook = () => {
    console.log('Novo livro adicionado:', newBook);
    setOpenModal(false);
    setNewBook({ title: '', author: '', imageUrl: '' }); // Limpar campos após adicionar
  };

  return (
    <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1>Acervo</h1>
        <p>aqui tera os livros e tabela</p>
      </header>
      <div className="book-recomendation" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="recomendation-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Recomendação de livro</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-evenly' }}>
          <Book title="Capes Online Omnibus" subtitle="LucasFlint" />
          <Book title="The Book of Never" subtitle="Ashley Capes" />
          <Book title="GIRLS" subtitle="Kirst Capes" />
          <Book title="Not All Heroes Wear Capes" subtitle="Nigel Baines" />
        </div>
        <div className="library-content">
          <div className="content-header" style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Tabela de livros</h2>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>Adicionar Livro</Button>
          </div>
          <div className="library-table" style={{ height: '22rem', borderRadius: '8px', marginTop: '1rem' }}>
            <LibraryTable />
          </div>
        </div>
      </div>

      {/* Modal para adicionar livro */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Editar Livro</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Autor"
            variant="outlined"
            fullWidth
            margin="normal"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
          />
          <TextField
            label="Ano"
            variant="outlined"
            fullWidth
            margin="normal"
            name="imageUrl"
            value={newBook.imageUrl}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancelar</Button>
          <Button onClick={handleAddBook} color="primary">Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
