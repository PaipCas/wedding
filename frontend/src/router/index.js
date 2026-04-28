import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'
import Admin from '../views/Admin.vue'

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/admin-fabio',
		component: Admin
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes
})