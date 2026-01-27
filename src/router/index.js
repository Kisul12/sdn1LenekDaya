import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import GalleryView from '../views/GalleryView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import auth from '../services/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: GalleryView
        },
        {
            path: '/gallery/:id',
            name: 'gallery-detail',
            component: () => import('../views/GalleryDetailView.vue')
        },
        {
            path: '/admin/login',
            name: 'admin-login',
            component: AdminLogin,
            beforeEnter: (to, from, next) => {
                if (auth.isAuthenticated()) next('/admin/dashboard')
                else next()
            }
        },
        {
            path: '/admin/dashboard',
            name: 'admin-dashboard',
            component: AdminDashboard,
            meta: { requiresAuth: true }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !auth.isAuthenticated()) {
        next('/admin/login')
    } else {
        next()
    }
})

export default router
