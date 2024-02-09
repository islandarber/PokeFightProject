import  React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom'; 
import { getPokemons } from '../components/getPokemons';  

const PokemonOne = () => {
  const { id } = useParams(); 
  const [pokemon, setPokemon] = useState(null); 
  useEffect(() => {
    getPokemons(id).then((data) => {   
      setPokemon(data);
      console.log('your results are: ' + data);
    });
  }, [id]); 

  if(!pokemon) {
    return <div><img src='./loading.gif' alt='Loading...'/></div>
  }

  return (
    
    <div>PokemonOne
      <h1>{pokemon.name.english}</h1>
      <p>Type: {pokemon.type.join(', ')}</p>
      <h2>Base HP: {pokemon.base.HP}</h2>
      <ul>
        {Object.entries(pokemon.base).map(([stat, value]) => ( 
            <li key={stat}>
              <strong>{stat}:</strong> {value}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonOne;