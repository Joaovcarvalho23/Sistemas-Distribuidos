import React, { useState, useEffect } from 'react';
import CardFilmes from '../componentes/CardFilmes';
import Navbar from '../componentes/Navbar';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const styles = {
  backgroundColor: 'Yellow',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
};

export default function Menu({setDadosFilmes}) {
  const [filmes, setFilmes] = useState([]);
  const [filtro, setFiltro] = useState('');

  const navigate = useNavigate();

  const image_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    getFilmes();
  }, []);

  const getFilmes = () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=332bf3a464fa6e428a995701bd2d29f2&language=pt-BR&page=1')
      .then((result) => setFilmes(result.data.results))
      .catch((err) => console.log(err));
  };

  const moviePickHandler = (filmeData) =>{
    setDadosFilmes(filmeData)
    navigate('/perfilFilmes')
    console.log(filmeData)
  }
  return (
    <div>
      <Navbar setFiltro={setFiltro} />
      <Container maxWidth="xg" style={styles}>
        <Grid container spacing={3}>

          {filmes.filter((filme) => filme.title.toLowerCase().includes(filtro.toLowerCase())).map((filme) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={filme.id}>

              <Box onClick ={() => moviePickHandler(filme)}>
                <CardFilmes
                  nome={filme.title}
                  dataEstreia={filme.release_date}
                  posterFilme={image_path + filme.poster_path}
                />
              </Box>

            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
