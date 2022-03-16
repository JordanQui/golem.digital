<template>
  <div ref="mainwrapper" class="ac-layoutWrapper">
    <NavBar />
    <Nuxt />
    <NavGrid />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import NavGrid from '../components/NavGrid.vue'

export default {
  name: 'default',
  components: {
    NavBar,
    NavGrid
  },
  methods: {
    handleBackground() {
      let s = document.documentElement.scrollTop / 3.2
      this.$refs.mainwrapper.style.backgroundColor = `rgba(${s},${s},${s})`
    }
  },
  mounted() {
    console.log('mounted layout')
    window.addEventListener('scroll', () => { this.handleBackground() } ) 
  }
}
</script>

<style lang="scss" scoped>
.ac-layoutWrapper {
  will-change: auto;
  background-color: rgb(0,0,0);
  transition: background-color .2s ease-in;
}
</style>