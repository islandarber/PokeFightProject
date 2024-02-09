import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getPokemons } from '../components/getPokemons'
import '../App.css'


const PokemonInfo = () => {
  const [pokemon, setPokemon] = useState({})
  const { id } = useParams()


  useEffect(() => {
    getPokemons(id).then(data => setPokemon(data))
  }, [])

  return (

    <div>
      <h1>Pokemon Detailed Info</h1>
      <h2>Names</h2>
      {pokemon.name && <ul>
        <li>English: {pokemon.name.english}</li>
        <li>Japanese: {pokemon.name.japanese}</li>
        <li>Chinese: {pokemon.name.chinese}</li>
        <li>French: {pokemon.name.french}</li>
      </ul>}
      <h2>Types</h2>
      {pokemon.type && <ul>
        {pokemon.type.map((type, index) => <li key={index}>{type}</li>)}
      </ul>}

      <h2>Base</h2>
      {pokemon.base && <ul>
        <li>HP: {pokemon.base.HP}</li>
        <li>Attack: {pokemon.base.Attack}</li>
        <li>Defense: {pokemon.base.Defense}</li>
        <li>Sp. Attack: {pokemon.base["Sp. Attack"]}</li>
        <li>Sp. Defense: {pokemon.base["Sp. Defense"]}</li>
        <li>Speed: {pokemon.base.Speed}</li>
      </ul>}
      </div>

  )
}

//{"id":1,"name":{"english":"Bulbasaur","japanese":"フシギダネ","chinese":"妙蛙种子","french":"Bulbizarre"},"type":["Grass","Poison"],"base":{"HP":45,"Attack":49,"Defense":49,"Sp. Attack":65,"Sp. Defense":65,"Speed":45}}

export default PokemonInfo