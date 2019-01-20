<template>
  <div id="game">
    <md-content class="score">
      <h1>Your Score: {{ score }}</h1>
    </md-content>
    <md-content class="main">
      <h2>{{ current.name }}</h2>

      <img :src="current.sprite" height=150 width=150 />

      <div>
        <md-button class="md-raised" v-bind:class="choices[0]" @click="select(choices[0])">
          {{ choices[0] }}
        </md-button>
        <md-button class="md-raised" v-bind:class="choices[1]" @click="select(choices[1])">
          {{ choices[1] }}
        </md-button>
        <md-button class="md-raised" v-bind:class="choices[2]" @click="select(choices[2])">
          {{ choices[2] }}
        </md-button>
      </div>
    </md-content>
  </div>
</template>

<script>
export default {
  name: 'Game',

  data() {
    return {
      dash: null,
      ct: null,
      score: 0,
      current: {
        sprite: null,
        name: null,
        types: null
      },
      P: null,
      t: null,
      choices: [ 
        null, 
        null, 
        null 
      ],
      answer: null
    }
  },

  methods: {
    getRandomNumber() {
      return this.dash.random(1, 802)
    },
    select(selected) {
      if (this.current.types[0] == selected || this.current.types[1] == selected) {
        alert('You are correct!')
        this.score++
      } else {
        alert('Sorry! It\'s ' + this.answer + '!')
      }
      this.reload()
    },
    reload() {
      this.ct = this.getRandomNumber()
      this.fetch()
    },
    generateChoices(types) {
      var answer = null
      if (types.length == 2) {
        const id = this.dash.random(0, 1)
        answer = types[id]
      } else {
        answer = types[0]
      }
      this.answer = answer

      const allTypes = [ 'normal', 'fire', 'fighting', 'water', 'flying', 'grass', 'poison', 'electric', 'ground', 'psychic',
'rock', 'ice', 'bug', 'dragon', 'ghost', 'dark', 'steel', 'fairy' ]
      
      var shuffled = this.dash.shuffle(allTypes)
      while (shuffled[0] == answer || shuffled[1] == answer) {
       shuffled = this.dash.shuffle(allTypes)
      }
      var choices = [ answer, shuffled[0], shuffled[1] ]

      return this.dash.shuffle(choices)
    },
    fetch() {
      var t = this
      this.P.resource('/api/v2/pokemon/' + this.ct + '/')
      .then(function(response) {
        t.current.name = t.dash.capitalize(response.name)
        t.current.sprite =  response.sprites.front_default, 

        t.current.types = [ response.types[0].type.name ]
        if (response.types.length > 1) {
          t.current.types.push(response.types[1].type.name)
        }

         t.choices = t.generateChoices(t.current.types)
      }
    )
    }
  },

  mounted() {
    const dash = require('lodash')
    const Pokedex = require('pokeapi-js-wrapper')
    const P = new Pokedex.Pokedex({
      protocol: 'https'
    })
    this.P = P
    this.dash = dash
    this.ct = this.getRandomNumber()
    
    this.fetch(this.ct)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#game {
  background-color: #f4f4f4;
  width: 75%;
  margin: auto;
  padding: 15px;
}
.score {
  padding: 5px;
}
.md-button-content {
  text-shadow: 0 .25em 0.25em rgba(0,0,0,0.65) !important;
  color: white;
}
.normal { background-color: #A8A77A; }
.fire { background-color: #EE8130; }
.water { background-color: #6390F0; }
.electric { background-color: #F7D02C; }
.grass { background-color: #7AC74C; }
.ice { background-color: #96D9D6; }
.fighting { background-color: #C22E28; }
.poison { background-color: #A33EA1; }
.ground { background-color: #E2BF65; }
.flying { background-color: #A98FF3; }
.psychic { background-color: #F95587; }
.bug { background-color: #A6B91A; }
.rock { background-color: #B6A136; }
.ghost { background-color: #735797; }
.dragon { background-color: #6F35FC; }
.dark { background-color: #705746; }
.steel { background-color: #B7B7CE; }
.fairy { background-color: #D685AD; }
</style>
