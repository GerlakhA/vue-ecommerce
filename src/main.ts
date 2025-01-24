import './assets/main.css'

import { createApp } from 'vue'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Aura from '@primevue/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			cssLayer: {
				name: 'primevue',
				order: 'tailwind-base, primevue, tailwind-utilities'
			}
		}
	}
})
app.use(router)

app.use(autoAnimatePlugin)

app.use(VueQueryPlugin)

app.use(Vue3Toastify, {
	autoClose: 3000,
	position: 'top-center'
} as ToastContainerOptions)

app.mount('#app')
