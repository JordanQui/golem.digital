<template>
  <section ref="projectwrapper" class="ac-pageWrapper ac-project">
    <h2>{{ document.data.title[0].text }}</h2>
    <div class="ac-project_caroussel">
      <div ref="caroussel" class="ac-project_caroussel-wrapper">
        <div v-for="slide in document.data.caroussel" :key="slide.id" class="ac-project_caroussel-item">
          <img v-if="slide.image01.url" :src="slide.image01.url" alt="">
          <video  webkit-playsinline playsinline autoplay controls="false" muted loop v-else-if="slide.video.url" :src="slide.video.url"></video>
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
var lastScrollTop = 0;

export default {
  name: 'Project',
  layout: 'default',
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID('project', params.uid)
    console.log('data caroussel', document.data.caroussel)
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
      console.log('scrolled', e.target)
      var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > lastScrollTop){
          // downscroll code
      } else {
          // upscroll code
          // this.setProjectHeigh()
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    handleResize() {
      this.setProjectHeigh()
    },
    setProjectHeigh() {
      this.$refs.projectwrapper.style.height = window.innerHeight + 'px'  
    }
  },
  mounted () {
    this.setProjectHeigh()
    this.$refs.caroussel.addEventListener('scroll', this.handleScroll);
  },
}
</script>

<style lang="scss">
@import '@/css/project.scss';
</style>

