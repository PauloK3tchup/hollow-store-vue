import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/produto',
      name: 'produto',
      component: () => import('../views/ProdutoView.vue'),
    },
    {
      path: '/pesquisa',
      name: 'pesquisa',
      component: () => import('../views/PesquisaView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/criarconta',
      name: 'criarconta',
      component: () => import('../views/CriarContaView.vue'),
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('../views/CarrinhoView.vue'),
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../views/PedidosView.vue'),
    },
  ],
})

export default router
