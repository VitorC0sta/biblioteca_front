import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CardStyled } from "../../modules/components/card";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from '@mui/icons-material/Book';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

import { Card } from "@mui/material";

export const Dashboard = () => {
  const data = [
    {
      name: "Segunda",
      "empréstimos": 4,
      "devoluções": 2,
    },
    {
      name: "Terça",
      "empréstimos": 3,
      "devoluções": 13,
    },
    {
      name: "Quarta",
      "empréstimos": 6,
      "devoluções": 9,
    },
    {
      name: "Quinta",
      "empréstimos": 2,
      "devoluções": 3,
    },
    {
      name: "Sexta",
      "empréstimos": 18,
      "devoluções": 4,
    },
  ];

  return (
    <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1>Dashboard</h1>
        <p>Visão Geral da Biblioteca – Monitore o acervo, acompanhe os empréstimos e veja as últimas atividades em um só lugar.</p>
      </header>

      <div className="cards-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <CardStyled
          title="Quantidade de livros"
          icon={<CollectionsBookmarkIcon/>}
        />
        <CardStyled
          title="Livros emprestados"
          icon={<LocalLibraryIcon/>}
          iconColor={'#2ecc71'}
        />
        <CardStyled
          title="Livros vencidos"
          icon={<AssignmentLateIcon/>}
          iconColor={'#e74c3c'}
        />
      </div>

      <Card sx={{
        height: '24rem', 
        width: '100%', 
        borderRadius: '8px',
        display: "flex", 
        flexDirection: 'column', 
        gap: '1rem', 
        padding: "1rem" 
      }}
      >
        <div className="title">
          <h2>Visão Geral da Biblioteca</h2>
          <p>Acompanhe os empréstimos, devoluções e o status do acervo em tempo real.</p>
        </div>
       <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="empréstimos" stroke="#D81B60"  strokeWidth={3}/>
            <Line type="linear" dataKey="devoluções" stroke="#1E88E5"  strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer> 
      </Card>


      <div className="last-activity" style={{ height: '10rem', background: 'red', borderRadius: '8px' }}>

      </div>
    </div>
  );
};
