const Pokedex = require('pokeapi-js-wrapper')
const P = new Pokedex.Pokedex()
import fetch from 'isomorphic-unfetch'

const Page = ({ pokemon }) => 
    <div>
        <span>
            Name: {pokemon.name}
        </span>
        <div>
            <img src={pokemon.sprites.front_default} />
        </div>
        <span>
            Types:
            {displayTypes(pokemon.types)}
        </span>
    </div>

Page.getInitialProps = async ({ req }) => {

    const id = getRandomInt(1, 802)
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    const obj = await res.json()

    console.log(obj.name)
    console.log(obj.types)

    return { pokemon: obj }
}

function getChoices(answer) {
    const types = new Set ([ 'normal', 'fire', 'fighting', 'water', 'flying', 'grass', 'poison', 'electric', 'ground', 'psychic', 'rock', 'ice', 'bug', 'dragon', 'ghost', 'dark', 'steel', 'fairy' ])
    const choices = new Set ([])
    
    for (i = 0; i < 3; i++) {
        
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayTypes(types) {
    const typesList = types.map((type) => 
        <li>{type.type.name}</li>
    )

    return (
        <ul>
            {typesList}
        </ul>
    )
}
export default Page