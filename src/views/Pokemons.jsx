import React, { useState, useEffect } from 'react';
import '../App.css'
import { getPokemons } from '../components/getPokemons.js'
import { useNavigate } from 'react-router';



const Pokemons = () => {
  const [pokemons, setPokemons] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getPokemons().then((data) => {
      setPokemons(data)
    })
  }, [])


  return (
    <div className="homepage-pokemons">
      <h1>Pokemons</h1>
      <div className='pokemons-grid'>
        {pokemons.map((pokemon) => (
            <a className='pokemon-card' key={pokemon.id} href={`/${pokemon.id}`}>{pokemon.name.english}</a>
        ))}
        </div>
    </div>
  )
}

export default Pokemons