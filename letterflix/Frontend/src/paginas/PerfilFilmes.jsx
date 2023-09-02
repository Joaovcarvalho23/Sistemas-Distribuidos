import React from 'react';
import Navbar from '../componentes/Navbar';
import { Rodape } from '../componentes/Rodape';
import { Box, Container, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const styles = {
  root: {
    color: 'white',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    backgroundColor: 'rgba(1, 0, 0, 0.7)',
    padding: 26,
    borderRadius: 8,
  },
  infoBox: {
    padding: 8,
  },
  movieImage: {
    width: '100%',
    borderRadius: 8
  },
  starContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  starIcon: {
    color: '#FFD700',
    marginRight: 14,
  },
};

const RatingStars = ({ rating }) => {
  const starIcons = [];
  const maxEstrelas = 10;

  for (let i = 1; i <= maxEstrelas; i++) {
    starIcons.push(
      <StarIcon
        key={i}
        className={styles.starIcon}
        style={{ opacity: rating >= i ? 1 : 0.5 }}
      />
    );
  }

  return <div className={styles.starContainer}>{starIcons}</div>;
};

export const PerfilFilmes = ({ dadosFilmes }) => {
  const image_path = 'https://image.tmdb.org/t/p/w500';
  const backgroundImage = `url(${image_path + dadosFilmes.backdrop_path})`;

  return (
    <div style={{ ...styles.root, backgroundImage }}>
      <Navbar hideSearchBar />
      <Container maxWidth="md" style={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box style={styles.infoBox}>
              <img
                src={image_path + dadosFilmes.poster_path}
                alt={dadosFilmes.original_title}
                style={styles.movieImage}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box style={styles.infoBox}> <p/>
              <Typography variant='h4'>Título original: {dadosFilmes.original_title}</Typography><p/>
              <Typography variant='h6' fontStyle='italic' gutterBottom>
                Sinopse: {dadosFilmes.overview}
              </Typography><p/>
              <Typography variant='h5'>Data de estréia: {dadosFilmes.release_date}</Typography><p/>
              <Typography variant='h4'>Avaliação: {dadosFilmes.vote_average}</Typography><p/>
              <RatingStars rating={dadosFilmes.vote_average} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Rodape />
    </div>
  );
};
