<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Vue from 'vue'
import Game from './components/Game.vue'

document.title = 'Types Quiz'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style>
#app {
  font-family: 'Consolas', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
