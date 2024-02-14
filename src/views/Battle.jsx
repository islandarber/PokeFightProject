import React, { useState, useEffect } from 'react'
import axios from 'axios';
// state for round - state for score (base vs base) -for winner, for loser and for the draw game
// how to send it to the back end
const Battle = ({Pokemon1, Pokemon2}) => {

  const [pokemonData1, setPokemonData1] = useState(null);
  const [pokemonData2, setPokemonData2] = useState(null);
  const [error, setError] = useState('');

  const logData = (data, message) => {
    console.log(message, data);
    return null; 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
        const pokemon1Data = response.data.find(pokemon => pokemon.name.english === Pokemon1);
        
        let pokemon2Data;
        
        if (Pokemon2) { 
          pokemon2Data = response.data.find(pokemon => pokemon.name.english === Pokemon2);
        } else {
          const randomIndex = Math.floor(Math.random() * response.data.length); // random number between 0 and the length of the array
          pokemon2Data = response.data[randomIndex]; // get a random pokemon
        }
    
        console.log('poke 1 ready fetched:', pokemon1Data);
        console.log('poke 2 ready fetched', pokemon2Data);
    
        setPokemonData1(pokemon1Data);
        setPokemonData2(pokemon2Data);

      } catch (error) {

        setError(error.message);
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Pokemon1, Pokemon2]);
  console.log("WILSOOOOOOOOOOOOOOOOOOOOOOOOOOON:", Pokemon1, Pokemon2)
  

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!pokemonData1 || !pokemonData2) { // if pokemonData1 or pokemonData2 is null
    return <div>Loading...</div>
  }


  return (
    <div>
      <h1>Battle</h1>
      
      <div>
        <h2>{pokemonData1.name.english}</h2>
        {logData(pokemonData1, 'ARE YOU THEERE MATE')}
        <p>Type: {pokemonData1.type.join(', ')}</p>
        <h2>Base HP: {pokemonData1.base.HP}</h2>
        <ul>
          {Object.entries(pokemonData1.base).map(([stat, value]) => (
            <li key={stat}>
              <strong>{stat}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      VS
      <div>
        <h2>{pokemonData2.name.english}</h2>
        {logData(pokemonData2, 'IS THERE ANYONE ALIVE OUT THERE?')}
        <p>Type: {pokemonData2.type.join(', ')}</p>
        <h2>Base HP: {pokemonData2.base.HP}</h2>
        <ul>
          {Object.entries(pokemonData2.base).map(([stat, value]) => (
            <li key={stat}>
              <strong>{stat}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Battle;