import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListComments from '@/components/ListComments'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);
Vue.use(BootstrapVue)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/listcomments',
      name: 'ListComments',
      component: ListComments
    },
  ]
})
