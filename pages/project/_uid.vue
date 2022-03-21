<template>
  <section ref="projectwrapper" class="ac-pageWrapper ac-project" :style="{height: $route.name != 'index' ? '100vh' : '0px'}">
    <h2>{{ document.data.title[0].text }}</h2>
    <span @click="scrollToGrid" class="ac-project_toGrid icon-menu"></span>
    <div class="ac-project_caroussel">
      <div ref="caroussel" class="ac-project_caroussel-wrapper">
        <div v-for="slide in document.data.caroussel" :key="slide.id" class="ac-project_caroussel-item">
          <img v-if="slide.image01.url" :data-src="slide.image01.url" :alt="slide.image01.alt" v-lazy-load>
          <video 
            v-else-if="slide.video.url" 
            webkit-playsinline playsinline autoplay controls="false" loop 
            :src="slide.video.url"
            style="pointer-events: none"
            v-lazy-load
          ></video>
          <div v-else-if="slide.embed" class="ac-project_caroussel-item">
            {{ slide.embed }}
          </div>
        </div>
      </div>
      <div class="ac-project_caroussel-pagination">
          <span @click="prevSlide()" class="ac-project_caroussel-pagination-left"></span>
          <span @click="nextSlide()" class="ac-project_caroussel-pagination-right"></span>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Project',
  layout: 'default',
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID('project', params.uid)

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    prevSlide() {
      console.log('prev', this.$refs.caroussel)
      this.$refs.caroussel.scrollLeft = '0px'
    },
    nextSlide() {
      console.log('next', this.$refs.caroussel)
      this.$refs.caroussel.scrollLeft = '1500px'
    },
    handleScroll(e) {
      
    },
    handleResize() {
      this.setProjectHeigh()
    },
    setProjectHeigh() {
      this.$refs.projectwrapper.style.height = window.innerHeight + 'px'  
    },
    scrollToGrid() {
      document.documentElement.scrollTop = window.innerHeight
    }
  },
  mounted () {
    // this.setProjectHeigh()
    this.$refs.caroussel.addEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss">
@import '@/css/project.scss';

</style>

