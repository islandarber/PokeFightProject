import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Pokemons from './views/Pokemons';
import PokemonOne from './views/PokemonOne';
import PokemonInfo from './views/PokemonInfo';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/:id" element={<PokemonOne />} />
        <Route path="/:id/:info" element={<PokemonInfo />} />
      </Routes>
    </>
  );
}

export default App;
