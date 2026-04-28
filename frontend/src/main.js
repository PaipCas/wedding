import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import '@flaticon/flaticon-uicons/css/all/all.css'

import './assets/fonts/fonts.css'
import './style.css'

createApp(App)
	.use(router)
	.mount('#app')
