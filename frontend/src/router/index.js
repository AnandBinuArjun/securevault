import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from '../views/LandingPage.vue'
import ReportPage from '../views/ReportPage.vue'
import DeviceBrowser from '../views/DeviceBrowser.vue'
import ThreatFeed from '../views/ThreatFeed.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ApiTier from '../views/ApiTier.vue'
import AboutPage from '../views/AboutPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ComparePage from '../views/ComparePage.vue'
import ArchivePage from '../views/ArchivePage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: LandingPage },
  { path: '/report/:query', component: ReportPage },
  { path: '/devices', component: DeviceBrowser },
  { path: '/threats', component: ThreatFeed },
  { path: '/compare', component: ComparePage },
  { path: '/archive', component: ArchivePage },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/api-tier', component: ApiTier },
  { path: '/about', component: AboutPage },
  { path: '/login', component: LoginPage }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('securevault_auth') === 'true';
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
