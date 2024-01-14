import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/home.view.vue"
import BrandWindow from "@/views/brand.view.vue";
import Register from "@/views/register.view.vue"
import Login from "@/views/login.view.vue"

const routes = [
    {
        path: "/brand/:name",
        name: 'brand',
        component: BrandWindow
    },
    {
        path: "/register",
        name: 'register',
        component: Register
    },
    {
        path: "/login",
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router