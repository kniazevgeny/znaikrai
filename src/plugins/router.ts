// Dependencies
import Vue from 'vue'
import Router from 'vue-router'
import home from '.././views/Home.vue'
import notFound from '.././views/NotFound.vue'
import {store} from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
        },
/*        {
            path: '*',
            name: 'notFound',
            component: notFound,
        }*/
    ],
})

/*router.beforeEach((to, _, next) => {
    //next()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const user = store.state.apibase

    if (requiresAuth && !user) {
      next('/')
    } else {
      if (to.path === '/' && user) {
        //next('/cabinet')
      } else {
        next()
      }
    }
})*/

export default router
