const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')
const audioSlash = document.querySelector('.audioSlash')


let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }
}

const clickAudio = async () => {
    audioSlash.src = "./Audios/click_button.mp3";
    audioSlash.play();
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data){
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id
    inputSearch.value = '';
    }else {
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = ''
        pokemonImage.style.display = 'none'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {

    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }

});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
  });

renderPokemon(searchPokemon);
