// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {findIndex} from "vee-validate/dist/types/utils";

Vue.use(Vuex);

export interface State {
    places: object[];
    isPlace : boolean[];
    snackbar: SnackbarState
    language?: String
    dark: Boolean,
    apibase: String,
    infowindow: Boolean
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
        snackbar: {
            message: '',
            active: false,
            color: 'success',
        },
        language: undefined,
        dark: false,
        apibase: '',
        infowindow: false,
        places: [],
        isPlace: []
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
            state.dark = dark
        },
        setInfowindow(state: State, infowindow: Boolean) {
            state.infowindow = infowindow
        },
        setPlaces(state: State, places: object[]) {
            state.places = places;
            let tmp = [];
            state.isPlace = [];
            for (let i  = 0; i < places.length; i++) {
                tmp.push(false);
            }
            state.isPlace = tmp;
        },
        setPlace(state: State, place: object) {
            state.isPlace[findIndex_((place as any)._id)] = true;
            state.places[findIndex_((place as any)._id)] = place;
        }
    },
    getters: {
        snackbar: (state: State) => state.snackbar,
        language: (state: State) => state.language,
        dark: (state: State) => state.dark,
        apibase: (state: State) => 'https://api-znaikrai.herokuapp.com',
        infowindow: (state: State) => state.infowindow,
        places: (state: State) => state.places,
        place: (state: State) => (id: string) => state.places[findIndex_(id)] as object,
        isPlace: (state: State) => (id: string) => state.isPlace[findIndex_(id)] as boolean,

    },
    plugins: [createPersistedState()],
}

export const store = new Vuex.Store<State>(storeOptions)

// Getters
const getters = store.getters

export const snackbar = () => getters.snackbar as SnackbarState
export const language = () => getters.language as string | undefined
export const dark = () => getters.dark as boolean
export const apibase = () => getters.apibase as string | undefined
export const infowindow = () => getters.infowindow as boolean
export const places = () => getters.places as object
export function place(id: string) {
    return getters.place(id) as object
}
export function isPlace(id: string) {
    return getters.isPlace(id) as boolean
}
export function findIndex_(id: string) {
    // @ts-ignore
    return getters.places.findIndex(s => s._id === id);
}
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
    store.commit('setSnackbar', {...store.state.snackbar, active: false})
}
export const setLanguage = (language: String) => {
    store.commit('setLanguage', language)
}
export const setDark = (dark: Boolean) => {
    store.commit('setDark', dark);
}
export const setInfowindow = (infowindow: Boolean) => {
    store.commit('setInfowindow', infowindow);
}
export const setPlaces = (places: object) => {
    store.commit('setPlaces', places);
}
export const setPlace = (place: object) => {
    store.commit('setPlace', place);
}