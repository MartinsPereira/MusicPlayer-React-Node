import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Cadastrar from './Components/Cadastrar/Cadastrar'
import {GlobalStorage} from './Components/GlobalContext'
import Header from './Components/Header';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import PlayerFooter from './Components/PlayerFooter';
import Listagem from './Components/Listagem/Listagem';
import PlayListIndividual from './Components/PlayListIndividual';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStorage>
          <Header/>
          <Routes>
            <ProtectedRoute path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <ProtectedRoute path="/lista/*" element={<Listagem />} />
            <ProtectedRoute path="/playlist/:id" element={<PlayListIndividual />} />
            <ProtectedRoute path="/Album/:id" element={<PlayListIndividual />} />
            <ProtectedRoute path="/cadastrar/*" element={<Cadastrar />} />
          </Routes>
          <PlayerFooter />
        </GlobalStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
