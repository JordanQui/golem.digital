# golem.digital

## Development

This project now targets Node.js 22. Use the provided `.nvmrc` file or run `nvm use` to align your local environment before installing dependencies.

```bash
nvm use
npm install
npm run dev
```

The npm scripts automatically set `NODE_OPTIONS=--openssl-legacy-provider` to ensure that the webpack 4 based Nuxt 2 build remains compatible with OpenSSL 3 shipped in Node.js 22.
