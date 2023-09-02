import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardFilmes({ nome, dataEstreia, posterFilme, addToWatchlist, moviePickHandler }) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={moviePickHandler}> {/* Use o prop aqui */}
        <CardMedia component="img" height="400" image={posterFilme} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data de estréia: {dataEstreia}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={() => addToWatchlist({ nome, dataEstreia, posterFilme })}
        >
          Adicionar à WatchList
        </Button>
      </CardActions>
    </Card>
  );
}
