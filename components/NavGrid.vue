<template>
  <div class="ac-navgrid">
    <div class="ac-navgrid_wrapper">
      <section class="ac-navgrid_bandeau">
        <span>{{ this.bannertitle }}</span>
      </section>
      <section class="ac-navgrid_grid">
        <div v-for="project in document.results" :key="project.id" class="ac-navgrid_grid-item">
          <nuxt-link :to="`/project/${project.uid}`" class="ac-navgrid_grid-itemWrapper">
            <img :src="project.data.caroussel[0].image01.url" alt="">
            <div class="ac-navgrid_grid-item-legend">
              <span class="ac-navgrid_grid-item-legend-text">{{ project.data.title[0].text }}</span>
            </div>
          </nuxt-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavGrid',
  data() {
    return {
      document: {},
      bannertitle: '',
    }
  },
  async fetch() {
    this.document = await this.$prismic.api.query([
      this.$prismic.predicates.at('document.type','project'),
      this.$prismic.predicates.not('my.project.uid', 'home')
    ])
  },
  mounted() {
    console.log('nav grid document', this.document)
    this.bannertitle = 'golem golem golem golem golem golem golem golem golem golem golem golem golem golem golem golem'
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-navgrid {
  
  &_wrapper {
    position: relative;
    padding: 0 5%;
    overflow: hidden;
  }

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
      white-space: nowrap;
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
        .ac-navgrid_grid-item-legend {
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
  .ac-navgrid_grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@include media(s) {
  .ac-navgrid_wrapper {
    padding: 0 1%;
  }
  .ac-navgrid_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include media (m) {
  .ac-navgrid_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include media (l) {
  .ac-navgrid_wrapper {
    padding: 50px 8%;
  }
  .ac-navgrid_grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .ac-navgrid_grid-itemWrapper img {
    height: 100%;
  }
  .ac-navgrid_bandeau {
    position: absolute;
    font-size: 42px;
    transform: translate(-20vw, 0vw) rotate(-90deg);
    width: 130%;
    left: -42%;
    top: 50%;
  }
}
</style>