import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Battle = ({ Pokemon1, Pokemon2 }) => {
  const [pokemonData1, setPokemonData1] = useState(null);
  const [pokemonData2, setPokemonData2] = useState(null);

  const [pokemon1Image, setPokemon1Image] = useState('');
  const [pokemon2Image, setPokemon2Image] = useState('');

  const [round, setRound] = useState(1);
  const [scorePokemon1, setScorePokemon1] = useState(0);
  const [scorePokemon2, setScorePokemon2] = useState(0);

  const [gameover, setGameover] = useState(false);
  const navigate = useNavigate();

  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');
  const [error, setError] = useState('');

  const getPicture = async (pokemon) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      return response.data.sprites.front_default;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPicture(Pokemon1).then((data) => setPokemon1Image(data));
    getPicture(Pokemon2).then((data) => setPokemon2Image(data));
  }, []);




  const checkifZero = (hp1, hp2) => {
  
      if (hp1 <= 0 ) {
        setGameover(true);
        setWinner(pokemonData2.name.english);
        setLoser(pokemonData1.name.english);
        setRound(0);
      } else if (hp2 <= 0) {
        setGameover(true);
        setWinner(pokemonData1.name.english);
        setLoser(pokemonData2.name.english);
        setRound(0);
      }
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
            const fetchImage = await getPicture(pokemon2Data.name.english);
            setPokemon2Image(fetchImage);
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

    useEffect(() => {
      // Check HP values when they change
      checkifZero(pokemonData1?.base.HP, pokemonData2?.base.HP);
    }, [pokemonData1, pokemonData2]);
    

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pokemonData1 || !pokemonData2) {
    return <div>Loading...</div>;
  }

  const compareStats = (attackStat, defenseStat) => {
    if (pokemonData1.base[attackStat] > pokemonData2.base[defenseStat]) {
      const diffenrence = pokemonData1.base[attackStat] - pokemonData2.base[defenseStat];
      setScorePokemon1((prev) => prev + diffenrence);
      setPokemonData2((prev) => ({ ...prev, base: { ...prev.base, HP: prev.base.HP - diffenrence } }));
    } else if (pokemonData1.base[attackStat] < pokemonData2.base[defenseStat]) {
      const difference = pokemonData2.base[defenseStat] - pokemonData1.base[attackStat];
      setScorePokemon2((prev) => prev + difference);
      setPokemonData1((prev) => ({ ...prev, base: { ...prev.base, HP: prev.base.HP - difference } }));
    } else {
      alert('Draw');
    }
  };

  

  const handleAttack = () => {
    if (round === 1) {
      compareStats('Attack', 'Defense');
    } else if (round === 2) {
      compareStats('Defense', 'Attack');
    } else if (round === 3) {
      compareStats('Speed', 'Speed');
    }else if (round === 4){
      if (scorePokemon1 > scorePokemon2) {
        setWinner(pokemonData1.name.english);
        setLoser(pokemonData2.name.english);
        setGameover(true);
      } else if (scorePokemon1 < scorePokemon2) {
        setWinner(pokemonData2.name.english);
        setLoser(pokemonData1.name.english);
        setGameover(true);
      } else {
        alert('Draw');
        setGameover(true);
      }
    } else if (round === 5) {
      setGameover(true);
      setWinner(pokemonData1.name.english);
      setLoser(pokemonData2.name.english);
    }

    
    console.log(scorePokemon1, scorePokemon2, round)
    setRound((prev) => prev + 1);
  };


  const handleSavescores = () => {

    let scorewinner = 0;
    let scoreloser = 0;
    
    if (scorePokemon1 > scorePokemon2) {
      scorewinner = scorePokemon1;
      scoreloser = scorePokemon2;
    } else if (scorePokemon1 < scorePokemon2) {
      scorewinner = scorePokemon2;
      scoreloser = scorePokemon1;
    } else {
      scorewinner = 0;
    }

    const scores = {
      winner: winner,
      loser: loser,
      scorewinner: scorewinner,
      scoreloser: scoreloser,
      rounds: round-1,
    };

    const postScores = async () => {  
      try {
        const response = await axios.post('https://poke-fight-high-score.onrender.com/game/save', scores);
        alert('Scores saved');
      } catch (error) {
        console.error(error);
      }
    }
    postScores();
    
  };


  return (
    <div>
      {gameover
      ?
    <div className='GAMEOVER'>
      <h1>Rounds : {round}</h1>
      <div className='winner-loser'>
        <h1>Winner: <p className='winner'>{winner}</p> Score: <p>{winner === pokemonData2.name.english ? scorePokemon2 : scorePokemon1}</p>
        </h1>
        <h1>Loser:<p className='loser'> {loser}</p> Score:<p> {winner === pokemonData1.name.english ? scorePokemon2 : scorePokemon1}</p></h1>
      </div>
      <button onClick={()=>navigate('/chooseYourPokemon')}>Play Again</button>
      <button onClick={handleSavescores}>Save Scores</button>
    </div>
      :
    <div className='BATTLe'>
      <h1>Battle</h1>
      <h2>Round: {round}</h2>
      <div className='pokemonsBAttle'>
        <div className='pokemoninBattle'>
          <h2>{pokemonData1.name.english}</h2>
          <img src={pokemon1Image} alt={pokemonData1.name.english} />
          <p>Type: {pokemonData1.type.join(', ')}</p>
          <h2>Base HP: {pokemonData1.base.HP}</h2>
          {Object.entries(pokemonData1.base).map(([stat, value]) => (
            <p key={stat}>
              <strong>{stat}:</strong> {value}
            </p>
          ))}
        </div>
        {round === 1 ? <h2><strong>{pokemonData1.name.english}</strong> is attacking and on defense <strong>{pokemonData2.name.english}</strong></h2> : round === 2 ? <h2><strong>{pokemonData2.name.english}</strong> is attacking and on defense <strong>{pokemonData1.name.english}</strong></h2> : round === 3 ? <h2><strong>{pokemonData1.name.english}</strong>VS <strong>{pokemonData2.name.english}</strong>on Speed</h2> : round === 4 ? <h2>Who is the weakest?</h2> : <h2>Game Over</h2>}
        <div className='pokemoninBattle'>
          <h2>{pokemonData2.name.english}</h2>
          <img src={pokemon2Image && pokemon2Image} alt={pokemonData2.name.english} />
          <p>Type: {pokemonData2.type.join(', ')}</p>
          <h2>Base HP: {pokemonData2.base.HP}</h2>
          {Object.entries(pokemonData2.base).map(([stat, value]) => (
            <p key={stat}>
              <strong>{stat}:</strong> {value}
            </p>
          ))}
        </div>
      </div>
      <button onClick={handleAttack}>Attack!</button>
    </div>}
    </div>
  );
};

export default Battle;
