<template>
  <div class="game">
    <h1>Hello, this is the Game component</h1>
    <p>
      {{ ct }}
    </p>
    <button @click="reload">
      Reload
    </button>
  </div>
</template>

<script>
export default {
  name: 'Game',

  data() {
    return {
      ct: this.randomNumber() 
    }
  },

  methods: {
    randomNumber() {
      return Math.floor( Math.random() * 250)
    },
    reload() {
      this.ct = this.randomNumber()
    }
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
