<template>
  <div ref="mainwrapper" class="ac-layoutWrapper">
    <span class="ac-layoutBackground"></span>
    <NavBar />
    <Nuxt />
    <NavGrid />
    <About />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import NavGrid from '../components/NavGrid.vue'
import About from '../components/About.vue'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export default {
  name: 'default',
  components: {
    NavBar,
    NavGrid,
    About,
  },
  data() {
    return {
      st: {},
    }
  },
  methods: {
    createScrollTrigger() {
      this.st = gsap.to(".ac-layoutBackground", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".ac-layoutBackground",
          start: `top top`,
          end: `${window.innerHeight} top`,
          scrub: true,
          markers: true,
        }
      })
    }
  }, 
  mounted() {
    this.createScrollTrigger()
  }
}
</script>

<style lang="scss" scoped>
.ac-layoutWrapper {
  position: relative;
  transition: background-color .2s ease-in;

  & > * {
    z-index: 10;
  }
}

.ac-layoutBackground {
  position: absolute;
  will-change: opacity;
  z-index: 1;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  background-color: #000;
}
</style>