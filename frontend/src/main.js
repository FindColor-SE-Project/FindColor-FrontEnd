import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);

const app = createApp(App)

// Use the router
app.use(router)

// Import FontAwesomeIcon
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

