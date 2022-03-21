<template>
  <section class="ac-info">
    <div class="ac-info_wrapper">
      <article class="ac-info_description">
        <prismic-rich-text v-if="lang === 'FR'" :field="document.data.descriptionfr" class="ac-info_content" />
        <prismic-rich-text v-else-if="lang === 'EN'" :field="document.data.descriptionen" class="ac-info_content" />
      </article>
      <article class="ac-info_meta">
        <div class="ac-info_meta-item">
          <div class="ac-info_meta-item-label">
            <span v-if="lang === 'FR'">programme</span>
            <span v-else-if="lang === 'EN'">program</span>
          </div>
          <span class="ac-info_meta-item-text">
            <prismic-rich-text :field="document.data.programme"  />
          </span>
        </div>

        <div class="ac-info_meta-item">
          <div class="ac-info_meta-item-label">
            <span>client</span>
          </div>
          <span class="ac-info_meta-item-text">
            <prismic-rich-text :field="document.data.client"  />
          </span>
        </div>

        <div class="ac-info_meta-item">
          <div class="ac-info_meta-item-label">
            <span v-if="lang === 'FR'">lieu</span>
            <span v-else-if="lang === 'EN'">place</span>
          </div>
          <span class="ac-info_meta-item-text">
            <prismic-rich-text :field="document.data.lieu"  />
          </span>
        </div>

        <div class="ac-info_meta-item">
          <div class="ac-info_meta-item-label">
            <span v-if="lang === 'FR'">année</span>
            <span v-else-if="lang === 'EN'">year</span>
          </div>
          <span class="ac-info_meta-item-text">
            <prismic-rich-text :field="document.data.annee"  />
          </span>
        </div>

        <div class="ac-info_meta-item">
          <div class="ac-info_meta-item-label">
            <span v-if="lang === 'FR'">lieu</span>
            <span v-else-if="lang === 'EN'">place</span>
          </div>
          <span class="ac-info_meta-item-text">
            <prismic-rich-text :field="document.data.lieu"  />
          </span>
        </div>

        <div class="ac-info_meta-item">
          <div class="ac-info_meta-item-label">
            <span v-if="lang === 'FR'">maitre d'oeuvre</span>
            <span v-else-if="lang === 'EN'">project manager</span>
          </div>
          <span class="ac-info_meta-item-text">
            <prismic-rich-text :field="document.data.maitrise"  />
          </span>
        </div>

        <div class="ac-info_meta-item">
          <div class="ac-info_meta-item-label">
            <span v-if="lang === 'FR'">collaborateur</span>
            <span v-else-if="lang === 'EN'">collaborater</span>
          </div>
          <span class="ac-info_meta-item-text">
            <prismic-rich-text :field="document.data.collaborateur"  />
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {
      document: {},
      uid: ''
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  watch: {
    $route(to, from) {
      this.uid = to.params.uid
      this.$fetch()
    }
  },
  async fetch() {
    this.document = await this.$prismic.api.getByUID('project', this.uid)
  },
  created() {
    this.uid = this.$route.params.uid ? this.$route.params.uid : 'home'
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-info {
  &_wrapper {
    display: flex;
    max-height: 50vh;
  }
  &_description {
    width: 80%;
    padding-right: 20px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  &_meta {
    padding-left: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    &-item {
      margin-bottom: 15px;

      &-label {
        span:first-child {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}

@include media(m) {
  .ac-info {
    &_wrapper {
      padding: 0 10px;
    }
    &_meta {
      padding-left: 25px;
    }
  }
}

@include media(l) {
  .ac-info {
    &_description {
      padding-right: 35px;
    }
    &_wrapper {
      padding: 0 80px;
    }
    &_meta {
      padding-left: 50px;
    }
    &-item {
      &-label {
        span:first-child {
          font-size: 18px;
        }
        span:nth-child(2) {
          font-size: 22px;
        }
      }
    }
  }
}
</style>