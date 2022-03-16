<template>
  <div class="ac-layoutWrapper">
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
  }
}
</script>

<style lang="scss" scoped>
</style>