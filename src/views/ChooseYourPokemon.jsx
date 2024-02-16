import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemons } from '../components/getPokemons';
import axios from 'axios';

const SelectPokemon = ({ label, options, onSelectChange }) => {
  const handleClickRandom = (e) => {
    e.preventDefault();

    const randomPokemon = options[Math.floor(Math.random() * options.length)];
    onSelectChange(randomPokemon.name.english);
  };

  return (
    <div className='select-player'>
      <h2>{label}</h2>
      <form>
        <select onChange={(e) => onSelectChange(e.target.value)}>
        <option value="" disabled selected>Select a Pokemon</option>
          {options.map((pokemon) => (
            <option key={pokemon.name.english} value={pokemon.name.english}>
              {pokemon.name.english}
            </option>
          ))}
        </select>
        <button onClick={(e) => handleClickRandom(e)}>Random</button>
      </form>
    </div>
  );
};

const PokemonDetails = ({ pokemon, image }) => (
  <div className="pokemon-details">
    <img src={image} alt={pokemon.name.english} />
    <ul>
      <li>
        <h2>{pokemon.name.english}</h2>
        <p>Type: {pokemon.type.join(', ')}</p>
        <h2>Base HP: {pokemon.base.HP}</h2>
        <div className='stats-list'>
          {Object.entries(pokemon.base).map(([stat, value]) => (
            <p key={stat} className='stats-list'>
              <strong>{stat}:</strong> {value}
            </p>
          ))}
        </div>
      </li>
    </ul>
  </div>
);

const ChooseYourPokemon = ({setPokemon1, setPokemon2}) => {
  const [pokemons, setPokemons] = useState([]);
  const [player, setPlayer] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedPokemon2, setSelectedPokemon2] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');
  const [pokemonImage2, setPokemonImage2] = useState('');
  const navigate = useNavigate();


  const handleConfirmClick = () => {
    if (selectedPokemon === selectedPokemon2){
      return alert('You cannot fight against yourself, go to therapy instead!');
    }
    if (player === 1) {
      setPokemon1(selectedPokemon);
    } else {
      setPokemon1(selectedPokemon);
      setPokemon2(selectedPokemon2);
    }
    navigate('/battle');
  }

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

  useEffect(() => {
    try {
      const fetchPokemon = async () => {
        if (selectedPokemon) {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}`);
          setPokemonImage(response.data.sprites.front_default);
        }
      };
      fetchPokemon();
    } catch (error) {
      console.error(error);
    }
  }, [selectedPokemon]);

  useEffect(() => {
    try {
      const fetchPokemon = async () => {
        if (selectedPokemon2) {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon2.toLowerCase()}`);
          setPokemonImage2(response.data.sprites.front_default);
        }
      };
      fetchPokemon();
    } catch (error) {
      console.error(error);
    }

  }, [selectedPokemon2])
  

  const handlePlayerSelect = (value) => {
    setPlayer(parseInt(value));
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleSelectPokemon2 = (pokemon) => {
    setSelectedPokemon2(pokemon);
  };

  return (
    <div className='choose-your-pokemon'>
      <h1>Choose your Pokemon</h1>
      <form>
        <label htmlFor="1-2player">How many players:</label>
        <select onChange={(e) => handlePlayerSelect(e.target.value)}>
          <option value="1">1 Player</option>
          <option value="2">2 Players</option>
        </select>
      </form>

      {player === 1 ? (
        <div>
          <SelectPokemon label="Select your Pokemon" options={pokemons} onSelectChange={(pokemon) => handleSelectPokemon(pokemon, setPokemonImage)} />
          {selectedPokemon && <PokemonDetails pokemon={pokemons.find((p) => p.name.english === selectedPokemon)} image={pokemonImage} />}
        </div>
      ) : (
        <>
          <div className='selected-pokemonDisplay'>
            <SelectPokemon label="Player 1 select your Pokemon" options={pokemons} onSelectChange={(pokemon) => handleSelectPokemon(pokemon)} />
            {selectedPokemon && <PokemonDetails pokemon={pokemons.find((p) => p.name.english === selectedPokemon)} image={pokemonImage} />}
            <SelectPokemon label="Player 2 select your Pokemon" options={pokemons} onSelectChange={(pokemon) => handleSelectPokemon2(pokemon)} />
            {selectedPokemon2 && <PokemonDetails pokemon={pokemons.find((p) => p.name.english === selectedPokemon2)} image={pokemonImage2} />}
          </div>
        </>
      )}
      <button onClick={() => handleConfirmClick()}>Start!</button>
    </div>
  );
};

export default ChooseYourPokemon;
