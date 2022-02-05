let allPokemon = [];
let tabFin = [];

const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

function fetchPokeBase(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(allPoke => {
        console.log(allPoke);

        allPoke.results.forEach(pokemon => {
            fetchPokemonComplet(pokemon);
        });
    })
}

function fetchPokemonComplet(pokemon){
    
    let objPokemonFull = {};
    let url = pokemon.url;
    let namePoke = pokemon.name;

    fetch(url)
    .then(response => response.json())
    .then(pokeData => {
        console.log(pokeData);
        objPokemonFull.pic = pokeData.sprites.front_default;
        objPokemonFull.type = pokeData.types[0].type.name;
        objPokemonFull.id = pokeData.id;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePoke}`)
        .then(response => response.json())
        .then(pokeData => {

            objPokemonFull.name = pokeData.names[4].name;
            allPokemon.push(objPokemonFull);

            if(allPokemon.length === 151) {
                tabFin = allPokemon.sort((a,b) => {
                    return a.id - b.id;
                }).slice(0, 21);

                createCard(tabFin);
                chargement.style.display = 'none';
            }

        })

    })
}


// Creation des cartes
function createCard(tab){

    for(let i = 0; i < tab.length; i++){

        const card = document.createElement('li');
        const txtCard = document.createElement('h5');
        const idCard = document.createElement('p');
        const imgCard = document.createElement('img');
        let couleur = types[tab[i].type];
        card.style.background = couleur;
        txtCard.innerText = tab[i].name;
        idCard.innerText = `ID #${tab[i].id}`;
        imgCard.src = tab[i].pic;

        card.appendChild(imgCard);
        card.appendChild(txtCard);
        card.appendChild(idCard);

        listePoke.appendChild(card);

    }

}

fetchPokeBase();

// Scroll Infini 

window.addEventListener('scroll', () => {

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    //ScrollTop = scroll depuis de le top
    //scrollHeight = scroll total
    //clientHeight = hauteur de la fenetre

    if(clientHeight + scrollTop >= scrollHeight -20){
        addPoke(6);
    }
    
})


let index = 21;

function addPoke(nb){

    if(index > 151){
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}


// Recherche

//recherche dynamique 
searchInput.addEventListener('keyup', recherche);

// Recherche au bouton
// const formRecherche = document.querySelector('form');
// formRecherche.addEventListener('submit', (e) => {
//     e.preventDefault();
//     recherche();
// })


function recherche(){

    if(index < 151){
        addPoke(130);
    }

    let filter, allLi, titleValue, allTitles;

    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');

    for(let i = 0; i < allLi.length; i++){

        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1){
            allLi[i].style.display = 'flex';

        }else {
            allLi[i].style.display = 'none';
        }
    }

}


// Animation input

searchInput.addEventListener('input', (e) => {
    
    if(e.target.value !== ''){
        e.target.parentNode.classList.add('active-input');
    }else if(e.target.value === ''){
        e.target.parentNode.classList.remove('active-input');

    }

})