<template>
  <div id="app">
    <div>
      <Scene />
    </div>
  </div>
</template>

<script>
import Scene from './components/Scene.vue'

export default {
  name: 'app',
  components: {
    Scene
  }
}
</script>

<style>
html, body {
  margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
