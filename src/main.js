import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.filter('timeformatter', function (value) {
  const [date, timeRange] = value.split('T')
  console.log(value)
  return date + ' ' + timeRange.substring(0, 5)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
