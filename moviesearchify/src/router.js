import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TopRatedMovies from './views/TopRatedMovies.vue';
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/top-rated-movies',
      name: 'topratedmovies',
      component: TopRatedMovies
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
