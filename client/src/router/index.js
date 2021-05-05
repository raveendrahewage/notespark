import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Addpost from '../views/Addpost.vue';
import Note from '../views/Note.vue';
import Editnote from '../views/Editnote';
import Signin from '../views/Signin';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'sign-in',
        component: Signin
    },
    {
        path: '/notes',
        name: 'home',
        component: Home
    },
    {
        path: '/add-note',
        name: 'add-note',
        component: Addpost
    },
    {
        path: '/note/:id',
        name: 'note',
        component: Note
    },
    {
        path: '/edit-note/:id',
        name: 'edit-note',
        component: Editnote
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router