import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Addpost from '../views/Addpost.vue';
import Note from '../views/Note.vue';
import Editnote from '../views/Editnote';
import Signin from '../views/Signin';
import Archived from '../views/Archived';
import Archivednote from '../views/Archivednote';
import Editarchivednote from '../views/Editarchivednote';

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
        path: '/archived-note/:id',
        name: 'archived-note',
        component: Archivednote
    },
    {
        path: '/archived',
        name: 'archived',
        component: Archived
    },
    {
        path: '/edit-note/:id',
        name: 'edit-note',
        component: Editnote
    },
    {
        path: '/edit-archived-note/:id',
        name: 'edit-archived-note',
        component: Editarchivednote
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router