<template>
  <app-products v-for="session in sessions"
                :key="session.id"
                :session="session"/>
</template>

<script>
import AppProducts from './components/Products.vue'
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    AppProducts
  },
  computed: {
    ...mapGetters({sessions: 'sessions'}),
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
