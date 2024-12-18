import { Link } from "react-router-dom"
import { LendingTable } from "../../modules/lending/lending-control"
import { OverdueBooksList } from "../../modules/lending/lending-overdue"
import { useEffect, useState } from "react"
import { get } from "../../api"

export const Lending = () => {
  

  return (
    <div style={{
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <header>
        <h1>Empréstimos</h1>
        <p>Controle de Empréstimos – Acompanhe os livros emprestados, registre novas transações e monitore devoluções.</p>
      </header>
      <div>
        <LendingTable/>
      </div>
      <div>
        <OverdueBooksList/>
      </div>
    </div>
  )
}