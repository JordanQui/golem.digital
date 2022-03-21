<template>
  <div class="ac-mail_wrapper">
    <div class="ac-mail_container">
      <div class="ac-mail_label">instagram</div>
      <prismic-link :field="document.data.instagram" target="_blank" class="ac-mail_link">@golem.digital</prismic-link>
    </div>

    <div class="ac-mail_container">
      <div class="ac-mail_label">
        <span v-if="lang === 'FR'">renseignements</span>  
        <span v-if="lang === 'EN'">general enquiries</span>  
      </div>
      <prismic-link :field="document.data.mail" target="_blank" class="ac-mail_link">contact@golem.digital</prismic-link>
    </div>

    <div class="ac-mail_container">
      <div class="ac-mail_label">ariel claudet</div>
      <prismic-link :field="document.data.contact" target="_blank" class="ac-mail_link">ariel@golem.digital</prismic-link>
    </div>

    <div class="ac-mail_container">
      <div class="ac-mail_label">
        <span v-if="lang === 'FR'">agence</span>  
        <span v-if="lang === 'EN'">studio</span>  
      </div>
      <prismic-link :field="document.data.bureau" target="_blank" class="ac-mail_link">
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
  },
}
</script>

<style lang="scss" scoped>
@import '@/css/main.scss';

.ac-mail {
  &_wrapper {
    height: 48vh;
    overflow-y: scroll;
  }
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