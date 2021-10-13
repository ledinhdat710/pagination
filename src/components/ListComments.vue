<template>
  <div class="col-sm-12">
    <h1>{{title}}</h1>
    <div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Noi dung</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in displayedPosts" v-bind:key="post.id">
            <td>{{ post.id}}</td>
            <td>{{ post.name }}</td>
            <td>{{ post.email }}</td>
            <td>{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="page-link" @click="page = 1">
              First
            </button>
          </li>
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              v-if="page != 1"
              @click="page--"
            >
              Previous
            </button>
          </li>
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              v-for="pageNumber in pages.slice(
                page > 1 ? page - 2 : page - 1,
                page + 5
              )"
              v-bind:key="pageNumber.index"
              @click="page = pageNumber"
              :style="[
                pageNumber == page ? { color: 'blue' } : { color: '#29b3ed' },
              ]"
            >
              {{ pageNumber }}
            </button>
          </li>
          <li class="page-item">
            <button
              type="button"
              @click="page++"
              v-if="page < pages.length"
              class="page-link"
            >
              Next
            </button>
          </li>
          <li class="page-item">
            <button
              type="button"
              @click="page = pages.length"
              class="page-link"
            >
              Last
            </button>
          </li>
        </ul>
      </nav>
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
      title: 'Danh sach comment',
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  methods: {
    getComments() {
      axios.get('http://jsonplaceholder.typicode.com/comments').then((response) => {
        this.posts = response.data;
        console.log(response.data);
      }).catch(function(e){
        console.log('Error is ' + e);
      })
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  created() {
    this.getComments();
  },
};
</script>
<style scoped>
button.page-link {
  font-size: 20px;
  color: #1b1f20;
  font-weight: 500;
  display: inline-block;
}
</style>
