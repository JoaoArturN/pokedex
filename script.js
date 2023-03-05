const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse  = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await APIResponse.json();
    return data;
}


const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading'
    pokemonName.style.color = 'black'
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokemonName.style.color = 'rgb(66, 248, 76)'
        searchPokemon = data.id;
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = `${data.id} -`
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }else{
        pokemonName.innerHTML = 'Nothing Found :('
        pokemonNumber.innerHTML = ''
    }
    
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    input.value = '';
})


buttonPrev.addEventListener('click' ,()=>{
    if(searchPokemon > 1){
        searchPokemon --;
        renderPokemon(searchPokemon);
    }
})
buttonNext.addEventListener('click' ,()=>{
    searchPokemon ++;
    renderPokemon(searchPokemon);
})
renderPokemon('1');