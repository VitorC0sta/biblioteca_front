import { Link } from "react-router-dom"

export const Categories = () => {
  return (
    <div>
      <h1>Categorias</h1>
      <p>aqui tera os livros e suas categorias
      </p>
      <div className="book-recomendation">
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
        <div 
          className="wrap-book" 
          style={{
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            justifyContent: "space-evenly",   }}
          >
          <div style={{height: '15rem', width: '10rem', background: 'red'}}></div>
          <div style={{height: '15rem', width: '10rem', background: 'red'}}></div>
          <div style={{height: '15rem', width: '10rem', background: 'red'}}></div>
          <div style={{height: '15rem', width: '10rem', background: 'red'}}></div>
          
        </div>
      </div><video src=""></video>
    </div>
  )
}