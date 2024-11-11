export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Aqui sera a home</p>
      <div className="cards-wrap">
        <div className="cards">Quantidade de livros</div>
        <div className="cards">Livros emprestados</div>
        <div className="cards">Livros vencidos</div>
      </div>

      <div
        style={{
          height: '20rem',
          background: 'red',
          borderRadius: '8px'
        }}
      >

      </div>
      
      <div className="last-activity"
        style={{
          height: '10rem',
          background: 'red'
        }}
      >
      </div>
      
    </div>
  )
}         