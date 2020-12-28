import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Cadastrar from './Components/Cadastrar'
import {GlobalStorage} from './Components/GlobalContext'
import Header from './Components/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalStorage>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
          </Routes>
        </GlobalStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
