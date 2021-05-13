import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home.vue');
const Meals = () =>  import('@/views/Meals.vue');
const Restaurants = () =>  import('@/views/Restaurants.vue');
const Result = () =>  import('@/views/Result.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meals',
    name: 'Meals',
    component: Meals
  },
  {
    path: '/restaurants',
    name: 'Restaurants',
    component: Restaurants
  },
  {
    path: '/results',
    name: 'Results',
    component: Result
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
