<template>
  <section class="ac-pageWrapper ac-project">
    <h2>{{ document.data.title[0].text }}</h2>
    <div class="ac-project_caroussel">
      <div class="ac-project_caroussel-wrapper">
        <div v-for="slide in document.data.caroussel" :key="slide.id" class="ac-project_caroussel-item">
          <img :src="slide.image01.url" alt="">
          <!-- {{ slide.image01.url }} -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  layout: 'default',
  async asyncData({ $prismic, params, error }) {
    const document = await $prismic.api.getByUID('project', params.uid)
    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss" scoped>
.ac-project {
  background: black;
  height: 100vh;
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
    height: 94%;

    &-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      &::-webkit-scrollbar {
        display: none;
      }

      img {
        object-fit: contain;
        height: 100%;
        margin: auto;
      }
    }

    &-item {
      scroll-snap-align: center;
      flex-shrink: 0;
      height: 100%;
      width: 100vw;
    }
  }
}
</style>

