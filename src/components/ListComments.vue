<template>
  <div class="col-sm-12">
    <div>
      <h1>{{ title }}</h1>
      <form action="">
        <tfoot>
          <tr>
            <td>
              <input type="text" v-model="objPost.name" placeholder="Name" />
            </td>
            <td>
              <input type="text" v-model="objPost.email" placeholder="Email" />
            </td>
            <td>
              <input type="text" v-model="objPost.body" placeholder="Content" />
            </td>
            <td>
              <button v-on:click="addPost()">Add Comment</button>
            </td>
          </tr>
        </tfoot>
      </form>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Noi dung</th>
            <th>Hanh dong</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in displayedPosts" v-bind:key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.name }}</td>
            <td>{{ post.email }}</td>
            <td>{{ post.body }}</td>
            <td>
              <button v-b-modal.modal-prevent-closing @click="clickEdit(item)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deletePost(posts.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="page-link" @click="page = 1">
              First Page
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
            <button
              type="button"
              class="page-link"
              @click="page = pages.length"
            >
              End Page
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
// import Pagination from "./Pagination.vue";
Vue.use(VueAxios, axios);
export default {
  // components: { Pagination },
  data() {
    return {
      title: "Danh sach comment",
      objPost: { name: "", email: "", body: "" },
      editPost: { name: "", email: "", body: "" },
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  methods: {
    getPosts() {
      axios
        .get("http://jsonplaceholder.typicode.com/comments")
        .then((response) => {
          if (localStorage.posts == undefined) {
            localStorage.setItem("posts", JSON.stringify(response.data)); //Save LocaStorage
          }
          this.posts = JSON.parse(localStorage.getItem("posts")); // gán post = LocalStorage
          this.sort();
          console.log(response.data);
        })
        .catch(function (e) {
          console.log("Error is " + e);
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      this.pages.length = 0;
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
    sort() {
      this.posts.sort((a, b) => b.id - a.id);
    },
    addPost() {
      if (
        this.objPost.name == "" ||
        this.objPost.email == "" ||
        this.objPost.body == ""
      ) {
        alert("Input Invalid");
      } else {
        this.objPost.id = this.posts.length + 1;
        var objAdd = {
          id: this.objPost.id,
          name: this.objPost.name,
          email: this.objPost.email,
          body: this.objPost.body,
        };
        this.posts.push(objAdd);
        localStorage.setItem("posts", JSON.stringify(this.posts));
        this.sort();
        this.objPost.name = "";
        this.objPost.email = "";
        this.objPost.body = "";
        this.setPages();
      }
    },
    deletePost(id) {
      let uri = "http://jsonplaceholder.typicode.com/comments/${id}";
      this.axios.delete(uri).then((response) => {
        this.posts.splice(this.posts.indexOf(id), 1);
      });
    },
    clickEdit(){
      console.log('edit');
    }
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
    this.getPosts();
  },
};
</script>
<style scoped>
li.page-item {
  display: inherit;
}
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
</style> 
