import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Pokemons from './views/Pokemons';
import PokemonOne from './views/PokemonOne';
import PokemonInfo from './views/PokemonInfo';
import Battle from './views/Battle';
import ChooseYourPokemon from './views/ChooseYourPokemon';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/chooseYourPokemon" element={<ChooseYourPokemon />} />
        <Route path="/:id" element={<PokemonOne />} />
        <Route path="/:id/:info" element={<PokemonInfo />} />
      </Routes>
    </>
  );
}

export default App;
