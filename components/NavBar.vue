<template>
  <div class="ac-navigation" :class="{'black': this.$route.name !== 'index'}">
    <ul class="ac-navigation-wrapper">
      <li v-if="this.$route.name === 'index'" class="ac-navigation-item inactive"><span class="icon icon-info"></span></li>
      <li class="ac-navigation-item"><span class="icon icon-mail"></span></li>
      <li class="ac-navigation-item"><span class="icon icon-info-home"></span></li>
      <li v-if="this.$route.name !== 'index'" class="ac-navigation-item"><span class="icon icon-info"></span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-navigation {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background: white;
  padding: 10px;
  z-index: 1;

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
    color: black;
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