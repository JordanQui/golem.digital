<template>
  <div ref="modaleAbout" class="ac-modale ac-about" :class="theme">
    <span @click="closeModale" class="ac-modale_close icon-close"></span>
    <div class="ac-modale_wrapper">
      <div class="ac-modale_lang">
        <span>EN</span><span>/</span><span>FR</span>
      </div>
      <div>
        <prismic-rich-text :field="document.data.content" class="ac-about_content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModaleAbout',
  data() {
    return {
      document: {},
      theme: 'light'
    }
  },
  async fetch() {
    this.document = await this.$prismic.api.getSingle('about')
    console.log('data about', this.document.data.content)
  },
  methods: {
    closeModale() {
      this.$refs.modaleAbout.classList.remove('active')
      document.documentElement.classList.remove('no-scroll')
    }
  },
  mounted() {
    document.addEventListener('scroll', () => {
      window.scrollY > window.innerHeight ? this.theme = 'dark' : this.theme = 'light'
    })
  },
  created() {
    this.$nuxt.$on('open-modale-about', () => {
      console.log('event modale about fired')
      document.documentElement.classList.add('no-scroll')
      this.$refs.modaleAbout.classList.add('active')
   })
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-about {
  &_content {
    padding: 10%;
    font-size: 24px;
  }
}

</style>