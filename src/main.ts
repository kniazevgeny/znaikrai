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

/*Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA5uIPaFS0wkwR_Ot_1fleFNA9EpL3Gv3g',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
  installComponents: true
})*/
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app')
