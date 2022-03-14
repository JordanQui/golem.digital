export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'arielclaudet.com',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '../css/main.scss',
    '../css/reset.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/prismic',
  ],
  
  prismic: {
    endpoint: 'https://arielclaudetcom.cdn.prismic.io/api/v2',
    modern: true,
    linkResolver: function(doc) {
      if (doc.isBroken) {
        return '/not-found';
      }
    
      if (doc.type === 'home') {
        return '/';
      }
    
      if (doc.type === 'project') {
        return '/project/' + doc.uid;
      }
    
      return '/not-found';
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
