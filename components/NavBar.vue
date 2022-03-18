<template>
  <div class="ac-navigation">
    <ul class="ac-navigation-wrapper">
      <li class="ac-navigation-item"><span class="icon icon-mail"></span></li>
      <li @click="$nuxt.$emit('open-modale-about')" class="ac-navigation-item"><span class="icon icon-info-home"></span></li>
      <li class="ac-navigation-item"><span class="icon icon-info"></span></li>
    </ul>
    <!-- <span @click="scrollDown" class="ac-navigation-grid">grid</span> -->
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    scrollDown() {
      console.log('clicked', document.body)
    }
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
  padding: 10px;
  z-index: 20 !important;
  mix-blend-mode: difference;

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
    margin: 25px 1%;
    width: auto;
    height: 150px;

     &-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }
  }
}
</style>