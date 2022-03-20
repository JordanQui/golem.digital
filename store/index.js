export const state = () => ({
  lang: 'EN',
  modale: '',
})

export const mutations = {
  changeLang(state, lang) {
    state.lang = lang
  },
  changeModale(state, modale) {
    state.modale = modale
  }
}