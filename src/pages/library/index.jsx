import { useEffect, useState } from "react";
import { get } from "../../api";
import { Book } from "../../modules/components/book";
import { LibraryTable } from '../../modules/library/table';

export const Library = () => {
  

  return (
    <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1>Acervo</h1>
        <p>Gestão Completa do Acervo: Organize, Atualize e Acesse Seus Livros com Facilidade</p>
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
          </div>
          <div className="library-table" style={{ height: '22rem', borderRadius: '8px', marginTop: '1rem' }}>
            <LibraryTable/>
          </div>
        </div>
      </div>
    </div>
  );
};
