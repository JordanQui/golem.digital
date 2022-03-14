<template>
  <div class="ac-home">
    <section class="ac-home_bandeau">
      <span v-for="n in 30" :key="n.id">golem</span>
    </section>
    <section class="ac-home_grid">
      <div v-for="project in projects" :key="project.id" class="ac-home_grid-item">
        <nuxt-link :to="`/project/${project.uid}`" class="ac-home_grid-itemWrapper">
          <img :src="project.data.caroussel[0].image01.url" alt="">
          <div class="ac-home_grid-item-legend">
            <span class="ac-home_grid-item-legend-text">{{ project.data.title[0].text }}</span>
          </div>
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

.ac-home {
  padding: 0 5%;
  overflow: hidden;

  &_bandeau {
    font-size: 30px;
    font-family: "Raleway";
    font-weight: 800;
    font-style: italic;
    text-transform: uppercase;
    line-height: 60px;
    transform: translateX(-15vw);
    overflow: hidden;
    width: 300%;

    span {
      padding-right: 10px;
    }
  }

  &_grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5%;
    margin-bottom: 320px;

    &-item {
      position: relative;
      height: 240px;

      &:hover {
        .ac-home_grid-item-legend {
          opacity: 1;
        }
      }

      &-legend {
        transition: opacity .3s ease-in;
        opacity: 0;
        font-size: 22px;
        font-weight: 800;
        font-style: italic;
        color: white;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
        background: black;
        display: flex;
        justify-content: center;

        &-text {
          text-align: center;
        }
      }
    }

    &-itemWrapper {
      display: block;
      grid-column: 1;
      grid-row: 1;
      height: 100%;
      overflow: hidden;

      img {
        object-fit: cover;
        height: 100%;
      }
    }
  }
}

@include media(xs) {
  .ac-home_grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@include media(s) {
  .ac-home {
    padding: 0 1%;
  }
  .ac-home_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include media (m) {
  .ac-home_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include media (l) {
  .ac-home {
    padding: 50px 8%;
  }
  .ac-home_grid {
    grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: repeat(15, 25vw);
    // grid-auto-rows: minmax(25vw, auto);
  }
  .ac-home_grid-itemWrapper img {
    height: 100%;
  }
  .ac-home_bandeau {
    font-size: 42px;
    transform: translate(-20vw, 0vw) rotate(-90deg);
    width: 130%;
    left: -42%;
    top: 50%;
    position: fixed;
  }
}

</style>