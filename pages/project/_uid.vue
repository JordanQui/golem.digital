<template>
  <section ref="projectwrapper" class="ac-pageWrapper ac-project">
    <h2>{{ document.data.title[0].text }}</h2>
    <span @click="scrollToGrid" class="ac-project_toGrid icon-menu"></span>
    <div class="ac-project_progression"></div>
    <div class="ac-project_caroussel">
      <div ref="caroussel" class="ac-project_caroussel-wrapper">
        <div v-for="slide in document.data.caroussel" :key="slide.id" class="ac-project_caroussel-item">
          <img v-if="slide.image01.url" :data-src="slide.image01.url" :alt="slide.image01.alt" v-lazy-load>
          <video 
            v-else-if="slide.video.url" 
            :src="slide.video.url"
            webkit-playsinline playsinline autoplay controls="hidden" loop muted
            style="pointer-events: none"
          ></video>
          <div v-else-if="slide.embed" v-html="slide.embed.html" class="ac-project_caroussel-item-embed">
          </div>
        </div>
      </div>
      <!-- <div class="ac-project_caroussel-pagination">
        <span @click="prevSlide()" class="ac-project_caroussel-pagination-left"></span>
        <span @click="nextSlide()" class="ac-project_caroussel-pagination-right"></span>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'Project',
  layout: 'default',
  data() {
    return {
      scrollPos: 0
    }
  },
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
      console.log('prev', [this.$refs.caroussel.scrollLeft, window.innerWidth, this.scrollPos])
      this.$refs.caroussel.scrollLeft = this.scrollPos - 500
    },
    nextSlide() {
      console.log('next', [this.$refs.caroussel.scrollLeft, window.innerWidth, this.scrollPos])
      this.$refs.caroussel.scrollLeft = this.scrollPos + 500
    },
    handleScroll(e) {
      this.scrollPos = e.target.scrollLeft
    },
    handleResize() {
      this.setProjectHeigh()
    },
    setProjectHeigh() {
      if(this.$device.isMobile) {
        this.$refs.projectwrapper.style.height = window.innerHeight + 'px'
      } else {
        this.$refs.projectwrapper.style.height = '100vh'
      }
    },
    scrollToGrid() {
      document.documentElement.scroll({top: window.innerHeight, left: 0, behavior: 'smooth'})
    }
  },
  mounted () {
    this.setProjectHeigh()
    this.$refs.caroussel.addEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss">
@import '@/css/project.scss';

</style>

