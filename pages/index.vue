<template>
  <div class="ac-pagesWrapper">
    <section class="ac-homeGrid">
      <div v-for="project in projects" :key="project.id" class="ac-homeGrid_item">
        <nuxt-link :to="`/project/${project.uid}`" class="ac-homeGrid_itemWrapper">
          <img :src="project.data.caroussel[0].image01.url" alt="">
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
  },
  data() {
    return {
      projects: []
    }
  },
  async asyncData({ $prismic, params, error }) {
    const documents = await $prismic.api.query([
      $prismic.predicates.at('document.type', 'project'),
    ])
    if (documents) {
      return { documents }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  mounted() {
    this.projects = this.documents.results
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-homeGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);

  &_item {
    height: 260px;
  }

  &_itemWrapper {
    display: block;
    grid-column: 1;
    grid-row: 1;
    height: 100%;

    img {
      object-fit: cover;
      height: 100%;
    }
  }
}

@include media(xs) {
  .ac-homeGrid {
    grid-template-columns: repeat(1, 1fr);
  }
}

</style>