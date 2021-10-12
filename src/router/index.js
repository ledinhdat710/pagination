import Vue from 'vue'
import Router from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);
import HelloWorld from '@/components/HelloWorld'
import ListComments from '@/components/ListComments'
import Pagination from '@/components/Pagination'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

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
      component: ListComments,Pagination
    },

  ]
})
