import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'WebView', component: () => import('../views/WebView.vue') },
  { path: '/shopping', name: 'ShoppingView', component: () => import('../views/ShoppingView.vue') },
  { path: '/videos', name: 'VideosView', component: () => import('../views/VideosView.vue') },
  { path: '/images', name: 'ImagesView', component: () => import('../views/ImagesView.vue') },
  { path: '/news', name: 'NewsView', component: () => import('../views/NewsView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
