<template>
  <div class="game">
    <h1>{{ current.name }}</h1>

    <img :src="current.sprite" />

    <div>
      <button @click="reload">
        Reload
      </button>
    </div>
    <br/>

    {{ current }}    
  </div>
</template>

<script>
export default {
  name: 'Game',

  data() {
    return {
      _: null,
      ct: null,
      info: null,
      current: {
        sprite: null,
        name: null,
        types: null
      },
      P: null,
      t: null
    }
  },

  methods: {
    getRandomNumber() {
      return Math.floor( Math.random() * 802)
    },
    reload() {
      this.ct = this.randomNumber()
      this.fetch()
    },
    generateChoices(types) {
      return types
    },
    fetch() {
      var t = this
      this.P.resource('/api/v2/pokemon/' + this.ct + '/')
      .then(function(response) {
        t.current.name = t._.capitalize(response.name)
        t.current.sprite =  response.sprites.front_default, 

        t.current.types = [ response.types[0].type.name ]
        if (response.types.length > 1) {
          t.current.types.push(response.types[1].type.name)
        }

         var choices = t.generateChoices(t.current.types)
      }
    )
    }
  },

  mounted() {
    const _ = require('lodash')
    const Pokedex = require('pokeapi-js-wrapper')
    const P = new Pokedex.Pokedex({
      protocol: 'https'
    })
    this.P = P
    this._ = _
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
</style>
