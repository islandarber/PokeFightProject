import React, { useEffect , useState} from 'react'
import axios from 'axios';

export const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://poke-fight-high-score.onrender.com/game/leaderboard');
        setLeaderboard(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching the leaderboard data',error)
      }
    };
    fetchData();
  }, []);




  return (
    <div className='leaderboard'>
      <h1>Leaderboard</h1>
      <div className='game-card'>
        {leaderboard.map((leaderboard) => (
          <div key={leaderboard._id} className='scores1'>
            <p>Date: {leaderboard.date}</p>
            <p>Rounds: {leaderboard.rounds}</p>
            <hr />
            <p>Winner: {leaderboard.winner}</p>
            <p>Score: {leaderboard.scorewinner}</p>
            <hr />
            <p>Loser: {leaderboard.loser} </p>
            <p>Score: {leaderboard.scoreloser}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
  
}
