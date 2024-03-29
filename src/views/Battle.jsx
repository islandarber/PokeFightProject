import React, { useState, useEffect } from 'react'
import axios from 'axios';
// state for round - state for score (base vs base) -for winner, for loser and for the draw game
// how to send it to the back end
const Battle = ({Pokemon1, Pokemon2}) => {

  const [pokemonData1, setPokemonData1] = useState(null);
  const [pokemonData2, setPokemonData2] = useState(null);
  const [round, setRound] = useState(1);	
  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');

  const [error, setError] = useState('');




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
      }
    };

    fetchData();
  }, [Pokemon1, Pokemon2]);
  

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!pokemonData1 || !pokemonData2) { // if pokemonData1 or pokemonData2 is null
    return <div>Loading...</div>
  }

  const handleAttack = () => {

    const mathRandom = Math.floor(Math.random() * 10);
    console.log('mathRandom:', mathRandom);
   

    setRound((prev) => prev + 1);
    setPokemonData1((prev) => ({ ...prev, base: { ...prev.base, HP: prev.base.HP - 10 } }));
  };


  return (
    <div className='BATTLe'>
      <h1>Battle</h1>
        <h2>Round: {round}</h2>
      <div className='pokemonsBAttle'>
          <div className='pokemoninBattle'>
            <h2>{pokemonData1.name.english}</h2>
            <p>Type: {pokemonData1.type.join(', ')}</p>
            <h2>Base HP: {pokemonData1.base.HP}</h2>
              {Object.entries(pokemonData1.base).map(([stat, value]) => (
                <p key={stat}>
                  <strong>{stat}:</strong> {value}
                </p>
              ))}
        
          </div>
          VS
          <div className='pokemoninBattle'>
            <h2>{pokemonData2.name.english}</h2>
            <p>Type: {pokemonData2.type.join(', ')}</p>
            <h2>Base HP: {pokemonData2.base.HP}</h2>
        
              {Object.entries(pokemonData2.base).map(([stat, value]) => (
                <p key={stat}>
                  <strong>{stat}:</strong> {value}
                </p>
              ))}
        
          </div>
      </div>
        <button onClick={handleAttack}>Attack</button>
      </div>
  )
}

export default Battle;