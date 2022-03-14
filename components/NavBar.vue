<template>
  <div class="ac-navigation">
    <ul>
      <li>mail</li>
      <li>about</li>
      <li>info</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style lang="scss" scoped>
.ac-navigation {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background: white;

  ul {
    display: flex;
    justify-content: space-between;
    margin: 0 5%;
  }
}
</style>