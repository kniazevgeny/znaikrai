// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export interface State {
    places: object[];
    isPlace: boolean[];
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
            for (let i = 0; i < places.length; i++) {
                // @ts-ignore
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
export const forms = () => [
    // 0 additional information form
    [
        {
            name: "name_of_fsin",
            question: "О каком учреждении ФСИН вы рассказываете?",
            required: true,
            requires: "",
            type: "textfield",
            values: null,
            hint: "СИЗО 1",
            button: ""
        },
        {
            name: "status",
            question: "Какой ваш статус?",
            required: true,
            requires: "",
            type: "choose_one",
            values: [
                "Бывший заключенный",
                "Родственник заключенного",
                "Заключенный в настоящее время",
                "Адвокат",
                "другое"
            ],
            hint: "",
            button: ""
        },
        {
            name: "time_of_offence",
            question: "Укажите когда, произошли нарушения, о которых вы хотите рассказать:",
            required: true,
            requires: "",
            type: "textfield",
            values: null,
            hint: "2015-2018",
            button: ""
        },
        {
            name: "additional_information",
            question: "Если ли у вас есть дополнительная информация, которой вы готовы поделиться с нами, то ее можно написать здесь:",
            required: false,
            requires: "",
            type: "textarea",
            values: null,
            hint: "",
            button: ""
        },
        {
            name: "contacts_sure",
            question: "Готовы ли вы сообщить свое имя и контакты?",
            required: false,
            requires: "",
            type: "choose_one",
            values: [
                "Да",
                "Нет"
            ],
            hint: "",
            button: ""
        },
        {
            name: "contacts",
            question: "Ваши контакты:",
            required: false,
            requires: "contacts_sure",
            type: "textfield",
            values: null,
            hint: "Мамонтов Власий Демьянович, 89001112233",
            button: ""
        },
        {
            name: "processing_personal_data",
            question: "Согласны ли вы на обработку Ваших персональных данных?",
            required: true,
            requires: "",
            type: "choose_one",
            values: [
                "Да"
            ],
            hint: "",
            button: ""
        },],
    // 1 corona form
    [
        {
            name: "name_of_fsin",
            question: "О каком учреждении ФСИН вы рассказываете?",
            required: true,
            requires: "",
            type: "textfield",
            values: null,
            hint: "СИЗО 1",
            button: ""
        },
        {
            name: "status",
            question: "Какой ваш статус?",
            required: true,
            requires: "",
            type: "choose_one",
            values: [
                "Бывший заключенный",
                "Родственник заключенного",
                "Заключенный в настоящее время",
                "Адвокат",
                "Журналист",
                "другое"
            ],
            hint: "",
            button: ""
        },
        {
            name: "info",
            question: "Расскажите о ситуации с коронавирусом",
            required: true,
            requires: "",
            type: "textarea",
            values: null,
            hint: "",
            button: ""
        },
        {
            name: "contacts_sure",
            question: "Готовы ли вы сообщить свое имя и контакты?",
            required: false,
            requires: "",
            type: "choose_one",
            values: [
                "Да",
                "Нет"
            ],
            hint: "",
            button: ""
        },
        {
            name: "contacts",
            question: "Ваши контакты:",
            required: false,
            requires: "contacts_sure",
            type: "textfield",
            values: null,
            hint: "Мамонтов Власий Демьянович, 89001112233",
            button: ""
        },
        {
            name: "processing_personal_data",
            question: "Согласны ли вы на обработку Ваших персональных данных?",
            required: true,
            requires: "",
            type: "choose_one",
            values: [
                "Да"
            ],
            hint: "",
            button: ""
        },],
    // 2 report mistake
    [
        {
            name: "fsin_organization",
            question: "О каком учреждении ФСИН вы рассказываете?",
            required: true,
            requires: "",
            type: "textfield",
            values: null,
            hint: "СИЗО 1",
            button: ""
        },
        {
            name: "email",
            question: "Адрес электронной почты",
            required: true,
            requires: "",
            rules: [v => !!v || 'Это поле обязательно к заполнению', // /^\w*@\w+$/.test(v)
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(v) || 'Проверьте корректность написания'],
            type: "textfield",
            values: null,
            hint: "",
            button: ""
        },
        {
            name: "bug",
            question: "Опишите ошибку",
            required: true,
            requires: "",
            type: "textarea",
            values: null,
            hint: "",
            button: ""
        },],
    // 3 email subscription
    [
        {
            name: "name",
            question: "Имя",
            required: true,
            requires: "",
            type: "textfield",
            values: null,
            hint: "",
            button: ""
        },
        {
            name: "email",
            question: "Email",
            required: true,
            requires: "",
            type: "textfield",
            rules: [v => !!v || 'Это поле обязательно к заполнению', // /^\w*@\w+$/.test(v)
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(v) || 'Проверьте корректность написания'],
            values: null,
            hint: "",
            button: ""
        },]
] as object

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