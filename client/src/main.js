import Vue from 'vue'
import App from '@/App.vue'
import apolloProvider from '@/apollo'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
