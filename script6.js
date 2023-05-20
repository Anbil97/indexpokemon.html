const pokemonContainer=document.getElementById('pokemonContainer');
const paginationContainer=document.getElementById('paginationContainer');
const limit=50;
const apiUrl=`https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
//function to fetch the data from the API
async function fetchData(url){
    try{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error('unable to fetch data from the API');
        }
        const data=await response.json();
        return data;
    } catch (error){
        console.error(error);
    }
        }
    //function to display pokemon data
    function displayPokemon(pokemonData) {
        pokemonContainer.innerHTML = ''; // Clear previous content
        
        pokemonData.results.forEach(async (pokemon) => {
          const { name, url } = pokemon;
          const pokemonInfo = await fetchData(url);
          const abilities = pokemonInfo.abilities.map((ability) => ability.ability.name).join(', ');
          const moves = pokemonInfo.moves.map((move) => move.move.name).join(', ');
          const weight = pokemonInfo.weight;
          const pokemonElement = document.createElement('div');
          pokemonElement.innerHTML = `
            <h3>${name}</h3>
            <p>Abilities: ${abilities}</p>
            <p>Moves: ${moves}</p>
            <p>Weight: ${weight}</p>
          `;
          pokemonContainer.appendChild(pokemonElement);
        });
      }

    //function to handle pagination
    function handlePagination(pokemonData){
        paginationContainer.innerHTML='';
        const totalpages=Math.ceil(pokemonData.count/limit);
        for(let i=1;i<=totalpages;i++){
            const button=document.createElement('button');
            button.textcontent=i;
            button.addEventListener('click',async()=>{
                const newUrl=`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(i - 1) * limit}`;

                const newpokemonData=await fetchData(newUrl);
                displayPokemon(newpokemonData);
             });
             paginationContainer.appendChild(button);
        }
    }

    //fetch data from API and display the initial pokemon list
    fetchData(apiUrl)
  .then((pokemonData) => {
    displayPokemon(pokemonData);
    handlePagination(pokemonData);
  })
  .catch((error) => {
    console.error(error);
  });