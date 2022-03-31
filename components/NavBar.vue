<template>
  <div class="ac-navigation">
    <ul class="ac-navigation-wrapper">
      <li @click="openModaleInfo" class="ac-navigation-item" :class="{ 'inactive': isHome }">
        <span ref="iconnav1" class="icon icon-info"></span>
      </li>
      <li @click="openModaleAbout" class="ac-navigation-item">
        <span ref="iconnav2" class="icon icon-info-home"></span>
      </li>
      <li @click="openModaleMail" class="ac-navigation-item">
        <span ref="iconnav3" class="icon icon-mail"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isHome() {
      return this.$route.name === "index"
    }
  },
  methods: {
    openModaleAbout(event) {
      event.target.classList.add('active')
      this.$store.commit('changeModale', 'about')
      $nuxt.$emit('open-modale')
    },
    openModaleInfo(event) {
      if(!this.isHome) {
        event.target.classList.add('active')
        this.$store.commit('changeModale', 'info')
        $nuxt.$emit('open-modale')
      }
    },
    openModaleMail(event) {
      event.target.classList.add('active')
      this.$store.commit('changeModale', 'mail')
      $nuxt.$emit('open-modale')
    },
    scrollDown() {
      console.log('clicked', document.body)
    }
  },
  created() {
    this.$nuxt.$on('remove-hold-active', () => {
      this.$refs.iconnav1.classList.remove('active')
      this.$refs.iconnav2.classList.remove('active')
      this.$refs.iconnav3.classList.remove('active')
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-navigation {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 20px 10px 20px 10px;
  z-index: 20 !important;
  mix-blend-mode: difference;

  &-item:first-child {
      order: 3;
    } 

    &-item:nth-child(2) {
      order: 2;
    } 

    &-item:nth-child(3) {
      order: 1;
    } 

  &-grid {
    position: fixed;
    top: 0;
    right: 0;
    color: white;
    cursor: pointer;
  }

  &.black {
    background: transparent;
    .icon {
      color: white;

        &:hover {
        color: black;

        &:after {
          opacity: 1;
        }
      }

      &:after {
        content: "";
        background: white;
      }
    }
  }

  &-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 5%;
  }
  
  &-item {
    &.inactive {
      .icon {
        pointer-events: none;
        color: gray;
      }
    }
  }

  .icon {
    font-size: 36px;
    color: white;
    position: relative;
    cursor: pointer;
    transition: color .3s ease-in;

    &:hover {
      color: white;

      &:after {
        opacity: 1;
      }
    }

    &:before {
      position: relative;
      z-index: 10;
    }

    &:after {
      content: "";
      opacity: 0;
      transition: opacity .3s ease-in;
      position: absolute;
      top: 1px;
      right: 1px;
      width: 95%;
      height: 95%;
      background: black;
      border-radius: 100%;
    }
  }
}

@include media(l) {
  .ac-navigation {
    background: transparent;
    position: fixed; 
    top: 0;
    right: 0;
    margin: 25px 13px;
    width: auto;
    height: 150px;

    &-item:first-child {
      order: 1;
    } 

    &-item:nth-child(2) {
      order: 2;
    } 

    &-item:nth-child(3) {
      order: 3;
    } 

     &-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }
  }
}
</style>