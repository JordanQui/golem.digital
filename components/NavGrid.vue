<template>
  <div class="ac-navgrid">
    <div class="ac-navgrid_wrapper">
      <section class="ac-navgrid_bandeau">
        <span v-for="n in 30" :key="n.id">golem</span>
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
    }
  },
  async fetch() {
    this.document = await this.$prismic.api.query([
      this.$prismic.predicates.at('document.type','project'),
      this.$prismic.predicates.not('my.project.uid', 'home')
    ])
  },
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-navgrid {
  position: relative;
  
  &_wrapper {
    position: relative;
    padding: 0 5%;
    overflow: hidden;
  }

  &_bandeau {
    position: relative;
    height: 60px;
    font-size: 30px;
    font-family: "Raleway";
    font-weight: 800;
    font-style: italic;
    text-transform: uppercase;
    line-height: 60px;
    overflow: hidden;
    width: 100%;

    span {
      // position: absolute;
      // top: 0;
      // animation: defile 10s infinite alternate;
      // white-space: nowrap;
      padding-right: 10px;
      float: left;
    }
  }

  &_grid {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 80px;

    &-item {
      position: relative;
      height: 240px;

      &:hover {
        .ac-navgrid_grid-item-legend {
          opacity: 1;
        }
      }

      &-legend {
        line-height: 33px;
        padding: 5px 0;
        transition: opacity .3s ease-in;
        opacity: 0;
        font-size: 20px;
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
        object-position: center;
        height: 100%;
        width: 100%;
      }
    }
  }
}

@keyframes defile {
  0% { left: -1500px; }
  100% { left: 1500px; }
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
  .ac-navgrid_wrapper {
    padding: 0 1%;
  }
  .ac-navgrid_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include media (l) {
  .ac-navgrid_wrapper {
    padding: 50px 8%;
  }
  .ac-navgrid_grid {
    grid-gap: 50px;
    grid-template-columns: repeat(3, 1fr);
  }
  .ac-navgrid_grid-item-legend {
    font-size: 30px;
    line-height: 43px;
  }
  .ac-navgrid_bandeau {
    position: absolute;
    font-size: 42px;
    transform: translate(-20vw, 0vw) rotate(-90deg);
    width: 130%;
    left: -42%;
    top: 50%;

    span {
      animation: defile 30s infinite alternate;
    }
  }
  .ac-navgrid_grid-item-legend {
    font-size: 38px;
  }
  @keyframes defile {
    0% { left: -1500px; }
    100% { left: 1500px; }
  }
}
</style>