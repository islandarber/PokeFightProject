import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemons } from '../components/getPokemons';
import axios from 'axios';


const SelectPokemon = ({ label, options, onSelectChange }) => {
  return (
    <div>
      <h2>{label}</h2>
      <form action="">
        <select name="pokemon" id="" onChange={(e) => onSelectChange(e.target.value)}>
          {options.map((pokemon) => (
            <option key={pokemon.name.english} value={pokemon.name.english}>
              {pokemon.name.english}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

const ChooseYourPokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [player, setPlayer] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedPokemon2, setSelectedPokemon2] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await getPokemons();
        setPokemons(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemons();
  }, []);

  const handlePlayerSelect = (value) => {
    setPlayer(parseInt(value));
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleSelect1Pokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleSelect2Pokemon = (pokemon) => {
    setSelectedPokemon2(pokemon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission as needed
  };

  useEffect(() => {
    try {
      const fetchPokemon = async () => {
        {const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}`);}
        setPokemonImage(response.data.sprites.front_default);
        
      };
      fetchPokemon();
      
    } catch (error) {
      
    }
  }, [selectedPokemon]);

  return (
    <div>
      <h1>Choose your pokemon</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="1-2player"></label>
        <select name="pokemon" id="" onChange={(e) => handlePlayerSelect(e.target.value)}>
          <option value="1">1 Player</option>
          <option value="2">2 Players</option>
        </select>
      </form>

      {player === 1 ? (
        <div>
          <SelectPokemon label="Select your pokemon" options={pokemons} onSelectChange={handleSelectPokemon} />
          <div>
            <img src={pokemonImage} alt={selectedPokemon} />
            <ul>
              <li>
              {pokemons&& pokemons.filter((pokemon) => (
                pokemon.name.english === selectedPokemon
              )).map((pokemon) => (
                <div>
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

              ))}
              </li>
              </ul>
          </div>
        </div>
      ) : (
        <>
          <SelectPokemon label="Player 1 select your pokemon" options={pokemons} onSelectChange={handleSelect1Pokemon} />
          <div>
            <h2>{selectedPokemon}</h2>
          </div>

          <SelectPokemon label="Player 2 select your pokemon" options={pokemons} onSelectChange={handleSelect2Pokemon} />
          <div>
            <h2>{selectedPokemon2}</h2>
          </div>
        </>
      )}
      <button onClick={() => navigate('/battle')}>Start</button>
    </div>
  );
};

export default ChooseYourPokemon;
