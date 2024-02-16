import React, { useState, useEffect } from 'react';
import '../App.css'
import { getPokemons } from '../components/getPokemons.js'
import { useNavigate } from 'react-router';



const Pokemons = () => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    getPokemons().then((data) => {
      setPokemons(data)
      setLoading(false);
    })
  }, [])


  return (
    <div className="homepage-pokemons">
      <h1>Pokemons</h1>
      {!loading ?<div className='pokemons-grid' >
        {pokemons.map((pokemon) => (
            <button className='pokemon-card' key={pokemon.id} onClick={()=>navigate(`/pokemons/${pokemon.id}`)} >{pokemon.name.english}</button>
        ))}
        </div>
        : <p>Loading...</p>}
    </div>
  )
}

export default Pokemons