import React from 'react'
import CardFilmes from '../componentes/CardFilmes'
import Navbar from '../componentes/Navbar'
import { Container, Grid } from '@mui/material'

export default function Menu() {
  return (
    <div>
        <Navbar/>

        <Container maxWidth="xg">
            <Grid container>
                <Grid item xs={3}>
                    <CardFilmes/>
                </Grid>
                <Grid item xs={3}>
                    <CardFilmes/>
                </Grid>
                <Grid item xs={3}>
                    <CardFilmes/>
                </Grid>
            </Grid>
        </Container>
    </div>
  )
}
