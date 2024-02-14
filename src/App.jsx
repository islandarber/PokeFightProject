import React, { useState } from 'react';
import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Pokemons from './views/Pokemons';
import PokemonOne from './views/PokemonOne';
import PokemonInfo from './views/PokemonInfo';
import Battle from './views/Battle';
import ChooseYourPokemon from './views/ChooseYourPokemon';
import Homepage from './views/Homepage';
import { Leaderboard } from './views/Leaderboard';


function App() {
  const [Pokemon1, setPokemon1] = useState('');
  const [Pokemon2, setPokemon2] = useState('');

  return (
    <>
        <nav className='navbar'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pokemons">Pokemons</NavLink>
          <NavLink to="/chooseYourPokemon">Battle</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>

        </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/battle" element={<Battle Pokemon1={Pokemon1} Pokemon2= {Pokemon2} />} />
        <Route path="/chooseYourPokemon" element={<ChooseYourPokemon setPokemon1={setPokemon1} setPokemon2={setPokemon2} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/pokemons/:id" element={<PokemonOne />} />
        <Route path="/pokemons/:id/:info" element={<PokemonInfo />} />
      </Routes>
    </>
  );
}

export default App;
