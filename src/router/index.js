import { createRouter, createWebHistory } from 'vue-router'
import { track } from '@vercel/analytics'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About' }
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/ExperienceView.vue'),
    meta: { title: 'Experience' }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
    meta: { title: 'Portfolio' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Contact' }
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../views/BusinessCardView.vue'),
    meta: { title: 'Business Card' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '404 - Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - Hani Hashmi';
  next();
});

// Track page views with Vercel Analytics
router.afterEach((to) => {
  track('pageview', {
    page: to.path,
    title: to.meta.title || 'Unknown'
  });
});

export default router
