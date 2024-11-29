import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from 'recharts';
import { Card, Typography } from '@mui/material';
import { CardStyled } from '../../modules/components/card';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from '@mui/icons-material/Book';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { get } from '../../api';

export const Dashboard = () => {

  const [cardsData, setCardsData] = useState({
    totalBooks: 0,
    borrowBooks: 0,
    overdueBooks: 0,
  });

  const getCardsData = async () => {
    const response = await get('/livros');
    let totalBooks = response?.length;
    let overdueBooks = 0;
    let borrowBooks = 0;
    
    response?.forEach((book) => {
      book.statusLivro === "emprestado" ? borrowBooks+=1 : '';
      book.statusLivro === "vencido" ? overdueBooks+=1 : '';
    });
    
    setCardsData({
      totalBooks,
      borrowBooks,
      overdueBooks
    });
  }

  useEffect(()=> {
    getCardsData();
  }, [])

  const data = [
    { name: 'Segunda', 'empréstimos': 4, 'devoluções': 2 },
    { name: 'Terça', 'empréstimos': 3, 'devoluções': 13 },
    { name: 'Quarta', 'empréstimos': 6, 'devoluções': 9 },
    { name: 'Quinta', 'empréstimos': 2, 'devoluções': 3 },
    { name: 'Sexta', 'empréstimos': 18, 'devoluções': 4 },
  ];

  const dataBarAnual = [
    { name: 'Janeiro', 'empréstimos': 18, 'devoluções': 4, perdidos: 4, vencidos: 5 },
    { name: 'Fevereiro', 'empréstimos': 22, 'devoluções': 6, perdidos: 3, vencidos: 7 },
    { name: 'Março', 'empréstimos': 20, 'devoluções': 5, perdidos: 2, vencidos: 6 },
    { name: 'Abril', 'empréstimos': 25, 'devoluções': 8, perdidos: 3, vencidos: 4 },
    { name: 'Maio', 'empréstimos': 30, 'devoluções': 10, perdidos: 5, vencidos: 8 },
    { name: 'Junho', 'empréstimos': 28, 'devoluções': 7, perdidos: 4, vencidos: 5 },
    { name: 'Julho', 'empréstimos': 23, 'devoluções': 6, perdidos: 3, vencidos: 7 },
    { name: 'Agosto', 'empréstimos': 19, 'devoluções': 5, perdidos: 2, vencidos: 4 },
    { name: 'Setembro', 'empréstimos': 21, 'devoluções': 8, perdidos: 3, vencidos: 6 },
    { name: 'Outubro', 'empréstimos': 24, 'devoluções': 7, perdidos: 4, vencidos: 5 },
    { name: 'Novembro', 'empréstimos': 27, 'devoluções': 9, perdidos: 5, vencidos: 6 },
    { name: 'Dezembro', 'empréstimos': 29, 'devoluções': 10, perdidos: 4, vencidos: 7 },
  ];

  return (
    <div style={{ padding: '2rem 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1>Dashboard</h1>
        <p>Visão Geral da Biblioteca – Monitore o acervo, acompanhe os empréstimos e veja as últimas atividades em um só lugar.</p>
      </header>

      {/* Cards com as informações principais */}
      <div className="cards-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <CardStyled title="Quantidade de livros" value={cardsData.totalBooks} icon={<CollectionsBookmarkIcon />} />
        <CardStyled title="Livros emprestados" value={cardsData.borrowBooks} icon={<LocalLibraryIcon />} iconColor={'#2ecc71'} />
        <CardStyled title="Livros vencidos" value={cardsData.overdueBooks} icon={<AssignmentLateIcon />} iconColor={'#e74c3c'} />
      </div>

      {/* Card principal com gráficos */}
      <Card
        sx={{
          height: 'auto',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem'
        }}
      >
        <div className="title">
          <Typography variant="h5" component="h2">
            Visão Geral da Biblioteca
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Acompanhe os empréstimos, devoluções e o status do acervo em tempo real.
          </Typography>
        </div>

        {/* Gráfico de linha semanal (Empréstimos e Devoluções) */}
        <Typography variant="h6" component="h3" sx={{ marginBottom: '1rem' }}>
          Empréstimos e Devoluções - Semanal
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="empréstimos" stroke="#D81B60" strokeWidth={3} />
            <Line type="linear" dataKey="devoluções" stroke="#1E88E5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        {/* Gráfico de barras anual (Empilhado) */}
        <Typography variant="h6" component="h3" sx={{ marginBottom: '1rem' }}>
          Empréstimos, Devoluções, Perdidos e Vencidos - Anual
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataBarAnual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="empréstimos" stackId="a" fill="#8884d8" />
            <Bar dataKey="devoluções" stackId="a" fill="#82ca9d" />
            <Bar dataKey="perdidos" stackId="a" fill="#ffc658" />
            <Bar dataKey="vencidos" stackId="a" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
