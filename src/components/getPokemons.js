export const getPokemons = async (id=null) => {
  try { 
    if (id) {
      const response = await fetch(`https://pokemonfightalecris.onrender.com/pokemons/${id}`)
      const data = await response.json();
      return data;
    }
    const response = await fetch('https://pokemonfightalecris.onrender.com/pokemons')
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data', error);
  }
};

//{"id":1,"name":{"english":"Bulbasaur","japanese":"フシギダネ","chinese":"妙蛙种子","french":"Bulbizarre"},"type":["Grass","Poison"],"base":{"HP":45,"Attack":49,"Defense":49,"Sp. Attack":65,"Sp. Defense":65,"Speed":45}}