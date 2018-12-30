import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false
import VueMaterial from 'vue-material'
import infiniteScroll from 'vue-infinite-scroll'
import {
  VueMasonryPlugin
} from 'vue-masonry';
import {
  vueImgPreview
} from 'vue-img-preview'

import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.use(VueMasonryPlugin)
Vue.use(infiniteScroll)
Vue.component('vue-img-preview', vueImgPreview)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')