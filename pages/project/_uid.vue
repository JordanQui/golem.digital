<template>
  <section ref="projectwrapper" class="ac-pageWrapper ac-project">
    <h2>{{ document.data.title[0].text }}</h2>
    <div class="ac-project_caroussel">
      <div ref="caroussel" class="ac-project_caroussel-wrapper">
        <div v-for="slide in document.data.caroussel" :key="slide.id" class="ac-project_caroussel-item">
          <img v-if="slide.image01.url" :src="slide.image01.url" alt="">
          <video autoplay muted loop v-else-if="slide.video.url" :src="slide.video.url"></video>
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
          this.setProjectHeigh()
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
    this.$refs.caroussel.addEventListener('resize', this.handleResize);
  },
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-project {
  background: black;
  height: 100%;
  overflow: hidden;

  h2 {
    color: white;
    font-size: 24px;
    padding: 10px 3%;
    font-style: italic;
    font-weight: 800;
  }

  &_caroussel {
    width: 100%;
    margin: auto;
    height: 94%;

    &-wrapper {
      position: relative;
      width: 100vw;
      height: 100%;
      display: flex;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      &::-webkit-scrollbar {
        display: none;
      }

      img, video {
        object-fit: contain;
        height: 100%;
        margin: auto;
        pointer-events: none;
      }
    }

    &-item {
      scroll-snap-align: center;
      flex-shrink: 0;
      height: 100%;
      width: 100%;
      padding: 0 8% 100px;
      margin: auto;
    }
  }

  &_pagination {
    display: none;
  }
}

@include media(m) {
  .ac-project {
    h2 {
      font-size: 38px;
    }

    &_caroussel-pagination {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      pointer-events: none;

      &-left,
      &-right {
        pointer-events: all;
        width: 10%;
        height: 100%;
      }
    }
  }
}
</style>

