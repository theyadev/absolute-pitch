import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faPlay } from '@fortawesome/free-solid-svg-icons'

import './style.css'
import App from './App.vue'

const pinia = createPinia()

library.add(faGear, faPlay)

createApp(App).use(pinia).mount('#app')
