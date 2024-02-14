import React from 'react'

export const Leaderboard = () => {

// the fetching from MONGO DB will be done here


  return (
    <div className='leaderboard'>
      <h1>Leaderboard</h1>
      <div className='game-card'>
        <p>Date: 12.02.2023</p>
        <p>Winner: Player 1, Pokemon : Pikachu, Score: 45</p>
        <p>Looser: Player 2, Pokemon : Bulbasaur Score: 25</p>
      </div>
      
    </div>
  )
}
