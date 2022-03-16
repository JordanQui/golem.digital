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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export default {
  name: 'default',
  components: {
    NavBar,
    NavGrid
  },
  mounted() {
   gsap.to(".ac-layoutWrapper", {
      backgroundColor: '#FFFF',
      scrollTrigger: {
        trigger: ".ac-navgrid",
        start: `-${window.innerHeight / 3} top`,
        end: `top top`,
        scrub: true,
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.ac-layoutWrapper {
  will-change: auto;
  background-color: #000;
  transition: background-color .2s ease-in;
}
</style>