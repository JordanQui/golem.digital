<template>
  <div class="ac-about_container">
    <prismic-rich-text v-if="lang === 'FR'" :field="document.data.contentfr" class="ac-about_content" />
    <prismic-rich-text v-else-if="lang === 'EN'" :field="document.data.contenten" class="ac-about_content" />
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      document: {}
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    }
  },
  async fetch() {
    this.document = await this.$prismic.api.getSingle('about')
  },
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-about {
  &_content {
    font-size: 18px;
  }
  &_container {
    padding: 50px;
    overflow-y: scroll;
    // height: 47vh;
  }
}

@include media(l) {
  .ac-about {
    &_content {
      font-size: 24px;
    }
  }
}
</style>