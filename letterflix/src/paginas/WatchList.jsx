import React from 'react';
import Navbar from '../componentes/Navbar';
import { Rodape } from '../componentes/Rodape';
import { Container, Typography, Grid, Paper } from '@mui/material';

export const WatchList = ({ dadosFilmes }) => {
  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      <Navbar hideSearchBar />
      <Container>
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '16px' }}>
            Minha WatchList
          </Typography>
          <Grid container spacing={2}>
            {dadosFilmes.map((filme, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Paper
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '16px',
                    padding: '8px',
                  }}
                >
                  <img
                    src={filme.posterFilme}
                    alt={filme.nome}
                    style={{ width: '150px', height: '220px', objectFit: 'cover' }}
                  />
                  <Typography variant="h6" align="center" style={{ marginTop: '8px' }}>
                    {filme.nome}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
      <Rodape />
    </div>
  );
};
