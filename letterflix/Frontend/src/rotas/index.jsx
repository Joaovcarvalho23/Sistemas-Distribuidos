import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PerfilFilmes } from '../paginas/PerfilFilmes'
import Menu from '../paginas/Menu'
import { WatchList } from '../paginas/WatchList'
import TelaLogin from '../paginas/TelaLogin'
import { TelaCadastro } from '../paginas/TelaCadastro'
import { EditarPerfil } from '../paginas/EditarPerfil'


export const RotasDoApp = () => {
  const [dadosFilmes, setDadosFilmes] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<TelaLogin />}/>
            <Route path='/cadastrar' element={<TelaCadastro />}/>
            <Route path = '/menu' element={<Menu setDadosFilmes={setDadosFilmes} />} />
            <Route path = '/perfilFilmes' element={<PerfilFilmes dadosFilmes={dadosFilmes}/>} />
            <Route path="/watchList" element={<WatchList dadosFilmes={dadosFilmes} />} />
            <Route path='/editarPerfil' element={<EditarPerfil/>}/>
        </Routes>
    </BrowserRouter>
  )
}
