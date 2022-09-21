<template>
  <section ref="projectwrapper" class="ac-pageWrapper ac-project">
    <LoadSpinner v-if="showHideSpinner" />
    <h2>{{ document.data.title[0].text }}</h2>
    <span :class="{ 'inactive': !this.showGridLink }" @click="scrollToGrid" class="ac-project_toGrid icon-menu"></span>
    <div class="ac-project_progression"></div>
    <div class="ac-project_caroussel">
      <div ref="caroussel" class="ac-project_caroussel-wrapper">
        <div v-for="slide in document.data.caroussel" :key="slide.id" class="ac-project_caroussel-item">
          <nuxt-img v-if="slide.image01.url" :src="slide.image01.url" preload />
          <video 
            v-else-if="slide.video.url" 
            :src="slide.video.url"
            webkit-playsinline playsinline autoplay controls="hidden" loop muted
            style="pointer-events: none"
          ></video>
          <div v-else-if="slide.embed" v-html="slide.embed.html" class="ac-project_caroussel-item-embed"></div>
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
import LoadSpinner from '~/components/LoadSpinner.vue'

export default {
  name: 'Project',
  layout: 'default',
  components: {
    LoadSpinner
  },
  data() {
    return {
      scrollPos: 0,
      showGridLink: true,
      showHideSpinner: true
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
      this.$refs.caroussel.scroll({left: this.scrollPos - window.innerWidth, behavior: 'smooth'})
    },
    nextSlide() {
      this.$refs.caroussel.scroll({left: this.scrollPos + window.innerWidth, behavior: 'smooth'})
    },
    handleScroll(e) {
      this.scrollPos = e.target.scrollLeft
    },
    handleResize() {
      this.setProjectHeigh()
    },
    setProjectHeigh() {
      if(this.$mq === 'sm' || this.$mq === 'md') {
        this.$refs.projectwrapper.style.height = window.innerHeight + 'px'
      } else {
        this.$refs.projectwrapper.style.height = 'calc(var(--vh, 1vh) * 100)'
      }
    },
    scrollToGrid() {
      document.documentElement.scroll({top: window.innerHeight, left: 0, behavior: 'smooth'})
    },
    setShowGridLink(e) {
      this.showGridLink = e.target.documentElement.scrollTop < 10
    }
  },
  mounted () {
    this.showHideSpinner = false
    this.setProjectHeigh()
    window.addEventListener('scroll', this.setShowGridLink)
    this.$refs.caroussel.addEventListener('scroll', this.handleScroll)
  },
  beforeCreate() {
    this.showHideSpinner = true
  }
}
</script>

<style lang="scss">
@import '@/css/project.scss';

</style>

