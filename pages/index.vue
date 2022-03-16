<template>
  <section ref="projectwrapper" class="ac-pageWrapper ac-project">
    <h2 class="ac-project_homeTitle">{{ document.data.title[0].text }}</h2>
    <div class="ac-project_caroussel">
      <div ref="caroussel" class="ac-project_caroussel-wrapper">
        <div class="ac-project_caroussel-item">
          <img v-if="document.data.caroussel[0].image01.url" :src="document.data.caroussel[0].image01.url" :alt="document.data.caroussel[0].image01.alt">
          <video  webkit-playsinline playsinline autoplay controls="false" muted loop v-else-if="document.data.caroussel[0].video.url" :src="document.data.caroussel[0].video.url"></video>
        </div>
      </div>
    </div>
  </section>  
</template>

<script>


export default {
  name: 'Home',
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID('project', 'home')
    console.log('home doccc', document.data.caroussel[0])
    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    setProjectHeigh() {
      this.$refs.projectwrapper.style.height = window.innerHeight + 'px'  
    }
  },
  mounted () {
    this.setProjectHeigh()
    this.$refs.caroussel.addEventListener('resize', this.handleResize);
  },
}
</script>

<style lang="scss">
@import '@/css/project.scss';


</style>