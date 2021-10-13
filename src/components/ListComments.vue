<template>
  <div>
    <h1 style="text-align: center">{{ title }}</h1>
    <table border="1px">
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Email</td>
        <td>Noi dung</td>
      </tr>
      <tr v-for="post in pageOfItems" v-bind:key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.name }}</td>
        <td>{{ post.email }}</td>
        <td>{{ post.body }}</td>
      </tr>
    </table>
    <div class="card-footer pb-0 pt-3">
      <jw-pagination
        :items="datas"
        @changePage="onChangePage"
        :pageSize="10"
        :maxPages="10"
      ></jw-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
export default {
  data() {
    return {
      title: 'Danh sach Comment',
      datas: [],
      pageOfItems: [],
    };
  },
  mounted() {
    Vue.axios
      .get('http://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        this.datas = response.data;
        console.log(response.data);
      })
      .catch(function (e) {
        console.log('Error is ' + e);
      });
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
};
</script>
<style scoped>
body {
  background: #20262e;
  padding: 20px;
  font-family: Helvetica;
}
table {
  margin: 20px 5px 0px 45px;
}
li {
  margin: 8px 0;
}
h2 {
  font-weight: bold;
  margin-bottom: 15px;
}
del {
  color: rgba(0, 0, 0, 0.3);
}
li.inline {
  display: inline;
}
</style>
