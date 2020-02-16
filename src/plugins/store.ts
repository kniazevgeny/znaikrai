// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import { Place } from '../models/place'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export interface State {
  place?: Place
  snackbar: SnackbarState
  language?: String
  dark: Boolean,
  apibase: String
}

interface LocalizedError {
  en: string
  ru: string
}

interface SnackbarState {
  message: String | LocalizedError
  active: Boolean
  color: String
}

const storeOptions = {
  state: {
    place: {region: '', fsin_organization: '', full_name: ''},
    snackbar: {
      message: '',
      active: false,
      color: 'success',
    },
    language: undefined,
    dark: true,
    apibase: "http://8b2b0c6c.ngrok.io"
  },

  mutations: {/*
    setUser(state: State, user: User) {
      state.user = user
    },
    logout(state: State) {
      state.user = undefined
    },*/
    setSnackbar(state: State, snackbar: SnackbarState) {
      state.snackbar = snackbar
    },
    setLanguage(state: State, language: String) {
      state.language = language
    },
    setDark(state: State, dark: Boolean) {
      state.dark = true
    },
  },
  getters: {
    place: (state: State) => state.place,
    snackbar: (state: State) => state.snackbar,
    language: (state: State) => state.language,
    dark: (state: State) => true,
    apibase: (state: State) => state.apibase
  },
  plugins: [createPersistedState()],
}

export const store = new Vuex.Store<State>(storeOptions)

// Getters
const getters = store.getters

export const place = () => getters.place as Place | undefined
export const snackbar = () => getters.snackbar as SnackbarState
export const language = () => getters.language as string | undefined
export const dark = () => true
export const apibase = () => getters.apibase as string | undefined

// Mutations
/*
export const setUser = (user: User) => {
  store.commit('setUser', user)
}
*/
export const setSnackbar = (snackbar: SnackbarState) => {
  store.commit('setSnackbar', snackbar)
}
export const hideSnackbar = () => {
  store.commit('setSnackbar', { ...store.state.snackbar, active: false })
}
export const setLanguage = (language: String) => {
  store.commit('setLanguage', language)
}
export const setDark = (dark: Boolean) => {
  store.commit('setDark', true)
}
