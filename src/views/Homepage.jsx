import React from 'react'
import { useNavigate } from 'react-router'


function Homepage() {

  const navigate = useNavigate()

  return (

    <div className='homepage'>
      <h1>Welcome to PokeFight</h1>
      <p>Ready to face the storm? Let the Pokémon showdown begin!</p>
      <p>Press FIGHT to start!</p>
      <button onClick={() => navigate('/chooseYourPokemon')}>FIGHT !</button>
    </div>

  )
}

export default Homepage