import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListaAlbum from './ListaAlbum'
import ListaPlayList from './ListaPlayList'

const Listagem = () => {
  return (
      <Routes>
        <Route path="album" element={< ListaAlbum/>} />
        <Route path="album" element={< ListaPlayList/>} />
      </Routes>
    
  )
}

export default Listagem
