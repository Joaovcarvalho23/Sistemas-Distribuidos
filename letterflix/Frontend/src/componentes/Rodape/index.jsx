import React from 'react'
import { Box, Typography } from '@mui/material'

export const Rodape = () => {
  return (
    <Box sx={{ backgroundColor: 'Black', padding: '20px', textAlign: 'center' }}>
      <Typography variant="body2" color="white">
        © {new Date().getFullYear()} LetterFlix. Todos os direitos reservados.
                                     <p>Criado por: Haga Fedra Brito e João Victor Carvalho.</p>
                                     <p>Nosso repositório com código fonte: https://github.com/Joaovcarvalho23/Sistemas-Distribuidos</p>
      </Typography>
    </Box>
  )
}
