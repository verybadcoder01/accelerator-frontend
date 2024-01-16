import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/home.view.vue"
import BrandWindow from "@/views/brand.view.vue";
import Register from "@/views/register.view.vue"
import Login from "@/views/login.view.vue"
import Cabinet from "@/views/cabinet.view.vue"
import NewBrand from "@/views/newbrand.view.vue"

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
        path: '/lk',
        name: 'lk',
        component: Cabinet
    },
    {
        path: '/lk/add',
        name: 'add new',
        component: NewBrand
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