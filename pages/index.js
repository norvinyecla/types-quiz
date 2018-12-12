const Pokedex = require('pokeapi-js-wrapper')
const shuffle = require('shuffle-array')
const P = new Pokedex.Pokedex()
import fetch from 'isomorphic-unfetch'
import { SIGHUP } from 'constants';

const Page = ({ pokemon, choices }) => 
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

        <span>
            Choices:
            {displayChoices(choices)}
        </span>
    </div>

Page.getInitialProps = async ({ req }) => {

    const id = getRandomInt(1, 802)
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    const obj = await res.json()
    const choices = getChoices(obj.types)
    return { pokemon: obj, choices: choices }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getChoices(types) {
    if (types.length == 2) {
        shuffle(types)
    }
    
    const answer = types[0].type.name

    const options = [ 'normal', 'fire', 'fighting', 'water', 'flying', 'grass', 'poison', 'electric', 'ground', 'psychic', 'rock', 'ice', 'bug', 'dragon', 'ghost', 'dark', 'steel', 'fairy' ]
    const choices = [ ]

    choices.push(answer)

    shuffle(options)
    
    while (options[0] == answer || options[1] == answer) {
        shuffle(options)
    }

    choices.push(options[0], options[1])

    shuffle(choices)

    return choices
}

function displayChoices(choices) {
    const choicesList = choices.map((choice) => 
        <li>{choice}</li>
    )

    return (
        <ul>
            {choicesList}
        </ul>
    ) 
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