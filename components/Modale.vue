<template>
  <div ref="modale" class="ac-modale ac-about" :class="theme">
    <span @click="closeModale" class="ac-modale_close icon-close"></span>
    <div ref="modaleWrapper" class="ac-modale_wrapper">
      <div class="ac-modale_lang">
        <span @click="$store.commit('changeLang', 'EN')" :class="{ 'active': lang === 'EN' }">EN</span>
        <span>/</span>
        <span @click="$store.commit('changeLang', 'FR')" :class="{ 'active': lang === 'FR' }">FR</span>
      </div>
      <div class="ac-modale_content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modale',
  data() {
    return {
      document: {},
      theme: 'light',
      shadowHeight: false
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    }
  },
  methods: {
    closeModale() {
      this.$refs.modale.classList.remove('active')
      $nuxt.$emit('remove-hold-active')
      document.documentElement.classList.remove('no-scroll')
    }
  },
  mounted() {
    document.addEventListener('scroll', () => {
      window.scrollY > window.innerHeight ? this.theme = 'dark' : this.theme = 'light'
    })
  },
  created() {
    this.$nuxt.$on('open-modale', () => {
      document.documentElement.classList.add('no-scroll')
      this.$refs.modale.classList.add('active')
   })
  },
  beforeDestroy(){
    this.$nuxt.$off('open-modale')
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-modale {
  z-index: 20 !important;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  background: rgba(0,0,0,0.7);
  transition: opacity .3s ease-in,
    visibility .0s ease-in;

  &.active {
    visibility: visible;
    opacity: 1;
    transition: opacity .3s ease-in,
      visibility .0s ease-in;
  }

  &_content-wrapper {
    margin: 50px 0 20px;
  }

  &_wrapper {
    position: relative;
    z-index: 10;
    width: 85%;
    padding: 30px;
    max-height: 75vh;
    background-color: black;
    color: white;
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 20px 20px 0px -5px #555555;

    &::-webkit-scrollbar {
      display: none;
    }

    &-shadow {
      width: 92%; 
      position: absolute;
      height: 100%;
      top: 10px;
      left: 10px;
      z-index: 1;
      background: blue;
    }
  }

  &_close {
    position: absolute;
    font-size: 35px;
    text-align: right;
    padding: 15px;
    cursor: pointer;
    right: 0;
  }

  &_lang {
    cursor: pointer;
    text-align: right;
    font-weight: 400;
    font-size: 24px;

    span.active {
      font-weight: 800;
    }
  }

  &.light {
    .ac-modale_close {
      color: white;
    }
  }

  &.dark {
    .ac-modale_close {
      color: black;
    }
  }
}


@include media (m) {
  .ac-modale {
    &_wrapper {
      width: 70%;
    }
  }
}

@include media (l) {
  .ac-modale {
    &_content-wrapper {
      margin: 70px 0;
    }
    &_wrapper {
      top: 50%;
      width: 59%;
    }
    &_close {
      padding: 50px;
      right: 8%;
      top: 27px;
    }
    &_wrapper {
      max-height: 80vh;
    }
  }
}

@include media(xl) {
  .ac-modale {
    &_close {
      right: 13%;
    }
  }
}
</style>