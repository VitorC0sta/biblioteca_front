import { Link } from "react-router-dom"
import { EnhancedTable } from "../../modules/components/table"
import { Book } from "../../modules/components/book"

export const Library = () => {
  return (
    <div style={{
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <header>
        <h1>Acervo</h1>
        <p>aqui tera os livros e tabela</p>
      </header>
      <div className="book-recomendation"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div 
          className="recomendation-title" 
          style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}
        >
          <h2>Recomendação de livro</h2>
          
          <Link to="/library">
            Veja todos
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent:'space-evenly'}}>
          <Book 
            imageUrl="https://m.media-amazon.com/images/I/719tQReMWdS._AC_UF1000,1000_QL80_.jpg" 
            title="Capes Online Omnibus"
            subtitle="LucasFlint"
          />
          <Book 
            imageUrl="https://m.media-amazon.com/images/I/918P97i4uVL._UF1000,1000_QL80_.jpg"
            title="The Book of Never"
            subtitle="Ashley Capes"
          />
          <Book
            imageUrl="https://www.booketybookbooks.co.nz/cdn/shop/files/9781398713055.jpg?v=1726554529"
            title="GIRLS"
            subtitle="Kirst Capes"
          />
          <Book 
            imageUrl="https://lamplightbooks.co.nz/cdn/shop/files/9781526362896.jpg?v=1714132884"
            title="Not All Heroes Wear Capes"
            subtitle="Nigel Baines"
          />
        </div>
        <div className="library-content">
            <div
              className="content-header"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <h2>Tabela de livros</h2>
            </div>
            <div 
              className="library-table"
              style={{height: '22rem', background: 'red', borderRadius: '8px', marginTop: '1rem'}}
            >
              <EnhancedTable />
            </div>
        </div>
      </div>
    </div>
  )
}