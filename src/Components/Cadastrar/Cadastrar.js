import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './Cadastrar.css'
import CadastrarAlbum from './CadastrarAlbum'
import CadastrarMusica from './CadastrarMusica'

const Cadastrar = () => {
  
  return (
    <div>
      <Routes>
        <Route path="album" element={<CadastrarAlbum />} />
        <Route path="musica" element={<CadastrarMusica />} />
      </Routes>
    </div>
  )
}

export default Cadastrar

