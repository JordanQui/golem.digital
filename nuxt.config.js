export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  head: {
    title: 'GOLEM',
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
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,200;0,300;0,600;1,700;1,900&display=swap' }
    ],
    script: [
      { defer: true, src: 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js' }
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
    { src: "@/plugins/clickoutside", ssr: false }
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
    ['@nuxtjs/device',
      {defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36'}
    ],
    ['nuxt-lazy-load', {
      directiveOnly: true,
      defaultImage: 'default.png',
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
  }
}
