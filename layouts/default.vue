<template>
  <div ref="mainwrapper" class="ac-layoutWrapper">
    <span ref="bg" v-if="isBgVisible" class="ac-layoutBackground"></span>
    <LoadSpinner v-if="showHideSpinner" />
    <NavBar />
    <Nuxt />
    <NavGrid />
    <Modale>
      <About v-show="$store.state.modale === 'about'" />
      <Info v-show="$store.state.modale === 'info'" />
      <Mail v-show="$store.state.modale === 'mail'" />
    </Modale>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import NavGrid from '../components/NavGrid.vue'
import Modale from '../components/Modale.vue'
import About from '../components/About.vue'
import Info from '../components/Info.vue'
import Mail from '../components/Mail.vue'
import LoadSpinner from '../components/LoadSpinner.vue'

import { gsap, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export default {
  name: 'default',
  components: {
    NavBar,
    NavGrid,
    Modale,
    About,
    Info,
    Mail,
    LoadSpinner
  },
  data() {
    return {
      st: false,
      showHideSpinner: true
    }
  },
  methods: {
    createScrollTrigger() {
      this.st = gsap.to(".ac-layoutBackground", {
        opacity: 0,
        ease: Power4.easeOut,
        scrollTrigger: {
          trigger: ".ac-layoutBackground",
          start: `100px top`,
          end: `${window.innerHeight + 500}px top`,
          scrub: 0.7
        }
      })
    }
  }, 
  computed: {
    isBgVisible() {
      return this.$route.name !== 'index'
    }
  },
  watch: {
    $route() {
      if(!this.st) {
        setTimeout(() => {
          this.createScrollTrigger()
        }, 500)
      }
    }
  },
  mounted() {
    this.showHideSpinner = false;
    if(this.$route.name !== 'index' && !this.st) {
      this.createScrollTrigger()
    }
  },
  beforeCreate() {
    this.showHideSpinner = true;
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