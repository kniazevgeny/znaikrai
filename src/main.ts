// Dependencies
import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { store } from './plugins/store'
import { i18n } from './plugins/i18n'
//import './plugins/facebook'
//import './plugins/google'
import vuetify from './plugins/vuetify'
// @ts-ignore
// import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = true
new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
