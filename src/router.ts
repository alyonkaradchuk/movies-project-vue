import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'

const Library = () => import('./components/Library.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/library', name: 'Library', component: Library },
]


const router = createRouter({
  history: createWebHistory('/movies-project-vue/'),
  routes
})

export default router
