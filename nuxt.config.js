export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  head: {
    title: 'Ariel Claudet',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,200;0,300;0,600;1,700;1,900&display=swap' },
    ]
  },

  loading: {
    color: 'white',
    height: '5px'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '../css/icomoon.scss',
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
    preview: false,
    modern: true,
    linkResolver: function(doc) {
      if (doc.isBroken) {
        return '/not-found';
      }
    
      if (doc.uid === 'home') {
        return '/project/home';
      }
    
      if (doc.type === 'project') {
        return '/project/' + doc.uid;
      }
    
      return '/not-found';
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/device',
    ['nuxt-lazy-load', {
      directiveOnly: true,
    }],
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'sm',
        breakpoints: {
          sm: 600,
          md: 1200,
          lg: Infinity
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "gsap"
    ]
  },

  server: {     
    host: '0.0.0.0', // default: localhost   
  }, 
}
