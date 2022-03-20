<template>
  <div class="ac-mail_container">
    <div class="ac-mail_container">
      <div class="ac-mail_label">instagram</div>
      <prismic-link :field="document.data.instagram" target="_blank" class="ac-mail_link">@golem.digital</prismic-link>
    </div>

    <div class="ac-mail_container">
      <div class="ac-mail_label">
        renseignements
      </div>
      <prismic-link :field="document.data.instagram" target="_blank" class="ac-mail_link">contact@golem.digital</prismic-link>
    </div>

    <div class="ac-mail_container">
      <div class="ac-mail_label">ariel claudet</div>
      <prismic-link :field="document.data.instagram" target="_blank" class="ac-mail_link">ariel@golem.digital</prismic-link>
    </div>

    <div class="ac-mail_container">
      <div class="ac-mail_label">instagram</div>
      <prismic-link :field="document.data.instagram" target="_blank" class="ac-mail_link">
        1 rue Bonaparte, <br>
        75006 - Paris <br>
        France
      </prismic-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mail',
  data() {
    return {
      document: {}
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    }
  },
  async fetch() {
    this.document = await this.$prismic.api.getSingle('contact')
    console.log('data mail', this.document)
  },
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-mail {
  &_content {
    font-size: 18px;
  }
  &_label {
    font-weight: 800;
    font-size: 22px;
  }
  &_link {
    text-decoration: underline;
    font-size: 22px;
    color: #a88bf5;
  }
  &_container {
    margin: 20px;
  }
  &_mail {
    text-transform: uppercase;
  }
}
</style>