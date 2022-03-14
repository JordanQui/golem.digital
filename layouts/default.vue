<template>
  <div class="ac-layoutWrapper">
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  name: 'default',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
</style>