<template>
  <div class="ac-navgrid">
    <div class="ac-navgrid_wrapper">
      <section class="ac-navgrid_bandeau">
        <span v-for="n in 60" :key="n.id">golem</span>
      </section>
      <section class="ac-navgrid_grid">
        <div v-for="project in sortProjects" :key="project.id" class="ac-navgrid_grid-item">
          <nuxt-link :to="`/project/${project.uid}`" @click.native="scrollUp(project.uid)" class="ac-navgrid_grid-itemWrapper">
            <nuxt-img
              v-if="project.heroImage"
              preload
              :src="project.heroImage.url"
              :alt="project.heroImage.alt"
              sizes="sm:300px md:50vw lg:800px xl:1600px"
              format="webp"
            />
            <div class="ac-navgrid_grid-item-legend">
              <span class="ac-navgrid_grid-item-legend-text">{{ projectTitle(project) }}</span>
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
      currentRoute: '',
    }
  },
  async fetch() {
    this.document = await this.$prismic.api.query([
      this.$prismic.predicates.at('document.type','project'),
      this.$prismic.predicates.not('my.project.uid', 'home')
    ])
  },
  watch: {
    $route(to, from) {
      setTimeout(() => {
        this.currentRoute = to.path
      }, 1000)
    }
  },
  methods: {
    scrollUp(project) {
      if(this.currentRoute.includes(project)) {
        console.log('click on same')
        document.documentElement.scroll({top: 0, behavior: 'smooth'})
      }
    },
    isOnSame(project) {
      return this.$route.path.includes(project)
    },
    projectTitle(project) {
      return project?.data?.title?.[0]?.text || ''
    }
  },
  computed: {
    sortProjects() {
      const results = this.document?.results ?? []
      const list = []

      results.forEach((doc) => {
        const order = parseInt(doc?.data?.orderid, 10)

        if (Number.isFinite(order) && order > 0) {
          list[order - 1] = doc
        } else {
          list.push(doc)
        }
      })

      return list
        .filter((project) => project?.data?.caroussel?.[0]?.image01?.url)
        .map((project) => ({
          ...project,
          heroImage: {
            url: project.data.caroussel[0].image01.url,
            alt: project.data.caroussel[0].image01.alt || project.data?.title?.[0]?.text || '',
          },
        }))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-navgrid {
  position: relative;
  font-family: "Raleway";
  
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
    width: 3380px;
    transform: translateX(-80%);
    mix-blend-mode: difference;
    animation: 34s linear 0s infinite defile_mobile;

    @include media(l) {
      animation: 3s linear 0s infinite defile_large;
    }

    span {
      padding-right: 10px;
      float: left;
    }
  }

  &_grid {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 20px;

    &-item {
      position: relative;
      height: 60vw;

      &:hover {
        .ac-navgrid_grid-item-legend {
          opacity: 1;
          transition: opacity .3s ease-in;
        }
      }
      &-legend.active {
          opacity: 1;
          color: black;
          background: white;
          mix-blend-mode: difference;
          transition: opacity .3s ease-in;
      }

      &-legend {
        line-height: 33px;
        word-break: break-word;
        padding: 5px 0 2px;
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
          padding: 0 20px;
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

@keyframes defile_mobile {
  0% { transform: translateX(-80%); }
  100% { transform: translateX(0%); }
}

@keyframes defile_large {
  0% { transform: translate(4px, 0%) rotate(-90deg); }
  100% { transform: translate(4px, -260%) rotate(-90deg); }
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
  .ac-navgrid_grid-item-legend {
    font-size: 25px;
    line-height: 38px;
  }
}

@include media (m) {
  .ac-navgrid_wrapper {
    padding: 0 1%;
  }
  .ac-navgrid_grid-item-legend {
    font-size: 35px;
    line-height: 41px;
  }
  .ac-navgrid_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@include media (l) {
  .ac-navgrid_wrapper {
    padding: 50px 80px 25px;
  }
  .ac-navgrid_grid {
    grid-gap: 50px;
    grid-template-columns: repeat(3, 1fr);

    &-item {
      height: 17vw;
    }
  }
  .ac-navgrid_grid-item-legend {
    font-size: 30px;
    line-height: 43px;
  }
  .ac-navgrid_bandeau {
    position: absolute;
    font-size: 42px;
    transform-origin: top left;
    width: 250%;
    top: 130%;
    left: 0.5vw;

    span {
      animation: defile 30s infinite alternate;
    }
  }
  .ac-navgrid_grid-item-legend {
    font-size: 34px;
  }
  @keyframes defile {
    0% { left: -1500px; }
    100% { left: 1500px; }
  }
}

// @include media(xl) {
//   .ac-navgrid_bandeau {
//     left: -42.8vw;
//   }
// }
</style>