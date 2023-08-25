import React, { useState, useEffect } from 'react';
import CardFilmes from '../componentes/CardFilmes';
import Navbar from '../componentes/Navbar';
import { Container, Grid } from '@mui/material';
import axios from 'axios';

const styles = {
  backgroundColor: 'Yellow',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
};

export default function Menu() {
  const [filmes, setFilmes] = useState([]);

  const image_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    getFilmes();
  }, []);

  const getFilmes = () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=332bf3a464fa6e428a995701bd2d29f2&language=pt-US&page=1')
      .then((result) => setFilmes(result.data.results))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="xg" style={styles}>
        <Grid container spacing={3}>
          {filmes.map((filme) => (
            <Grid item xs={3} key={filme.id}>
              <CardFilmes
                nome={filme.title}
                dataEstreia={filme.release_date}
                posterFilme={image_path + filme.poster_path}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
