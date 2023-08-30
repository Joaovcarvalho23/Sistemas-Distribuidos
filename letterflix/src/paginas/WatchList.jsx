import React from 'react'
import Navbar from '../componentes/Navbar'
import { Rodape } from '../componentes/Rodape'

export const WatchList = ({dadosFilmes}) => {
  return (
    <>
      <Navbar hideSearchBar/>
      Minha WatchList
      <Rodape/>
    </>
  )
}
