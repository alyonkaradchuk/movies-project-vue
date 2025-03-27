import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'

const Library = () => import('./pages/Library.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/library', name: 'Library', component: Library },
]


const router = createRouter({
  history: createWebHistory('/movies-project-vue/'),
  routes
})

export default router
