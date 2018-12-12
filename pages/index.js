const Pokedex = require('pokeapi-js-wrapper')
const shuffle = require('shuffle-array')
import fetch from 'isomorphic-unfetch'
import VoteButtons from './buttons'

const Page = ({ pokemon, choices, score, answer }) => 
    <div>
        <div>
            Score: { score }
        </div>
        <div>
            Name: { pokemon.name }
        </div>
        <div>
            <img src={ pokemon.sprites.front_default } />
        </div>
        <span>
            Types:
            { displayTypes(pokemon.types) }
        </span>

        <span>
            Choices:
            <VoteButtons choices={choices} cb={ callback } />
        </span>
    </div>

Page.getInitialProps = async ({ req }) => {

    const id = getRandomInt(1, 802)
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
    const obj = await res.json()
    const choices = getChoices(obj.types)
    const score = 0
    const answer = ''

    return { pokemon: obj, choices: choices, score: score, answer: answer }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function callback(selected) {
 
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

function displayTypes(types) {
    const typesList = types.map((type) => (
        <li key={type.type.name}>{type.type.name}</li>
    ))

    return (
        <ul>
            { typesList }
        </ul>
    )
}

export default Page