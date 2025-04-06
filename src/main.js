// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify setup
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'




// Router nếu dùng
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // <-- Thêm dòng này để dùng mdi mặc định
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
