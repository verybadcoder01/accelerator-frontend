import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/home.view.vue"
import BrandWindow from "@/views/brand.view.vue";

const routes = [
    {
        path: "/brand/:name",
        name: 'brand',
        component: BrandWindow
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