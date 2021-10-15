<template>
  <div class="col-sm-12">
    <div>
      <h1>{{ title }}</h1>
      <b-button v-b-modal.modal-prevent-closing @click="addBefore()"
        >Add</b-button
      >
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Name">
            <b-form-input v-model="objPost.name"></b-form-input>
          </b-form-group>
          <b-form-group label="Email">
            <b-form-input v-model="objPost.email"></b-form-input>
          </b-form-group>
          <b-form-group label="Noi dung">
            <b-form-input v-model="objPost.body"></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
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
              <button
                class="btn btn-secondary"
                v-b-modal.modal-prevent-closing
                @click="clickEdit(post)"
              >
                Edit
              </button>
              <button class="btn btn-danger" v-b-modal.delete @click="deletePost(post.id)">
                Delete
              </button>
              <router-link
                :to="{
                  name: 'CommentPage',
                  params: { id: post.id },
                }"
              >
                <button class="btn btn-info">Detail</button>
              </router-link>
              <b-modal id="delete">
                <p class="my-4">Ban chac chan muon xoa ? </p>

              </b-modal>
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
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
// import Pagination from "./Pagination.vue";
Vue.use(VueAxios, axios);
export default {
  // components: { Pagination },
  data() {
    return {
      title: 'Danh sach comment',
      objPost: { name: '', email: '', body: ''},
      editPost: { name: '', email: '', body: ''},
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
      name: '',
      nameState: null,
      submittedNames: [],
    };
  },
  methods: {
    getPosts() {
      axios
        .get('http://jsonplaceholder.typicode.com/comments')
        .then((response) => {
          if (localStorage.posts == undefined) {
            localStorage.setItem("posts", JSON.stringify(response.data)); //Save LocaStorage
          }
          this.posts = JSON.parse(localStorage.getItem("posts")); // gán post = LocalStorage
          this.sort();
          console.log(response.data);
        })
        .catch(function (e) {
          console.log('Error is ' + e);
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
    deletePost(id) {
      this.deleteDialog = true;
      console.log('delete: ' + id);
      const removeIndex = this.posts.findIndex((item) => item.id === id);
      // remove object
      console.log(removeIndex);
      this.posts.splice(removeIndex, 1);
      localStorage.setItem('posts', JSON.stringify(this.posts));
      this.sort();
    },
    clickEdit(post) {
      console.log('edit');
      this.objPost.name = post.name;
      this.objPost.email = post.email;
      this.objPost.body = post.body;
      this.objPost.id = post.id;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = '';
      this.nameState = null;
    },
    addBefore() {
      this.objPost.id = '';
      this.objPost.name = '';
      this.objPost.email = '';
      this.objPost.body = '';
    },
    handleOk(bvModalEvt) {
      console.log(this.objPost.id);
      if (this.objPost.id > 0) {
        const objcurrent = this.posts.findIndex(
          (item) => item.id === this.objPost.id
        );
        this.posts[objcurrent].name = this.objPost.name;
        this.posts[objcurrent].email = this.objPost.email;
        this.posts[objcurrent].body = this.objPost.body;
        localStorage.setItem("posts", JSON.stringify(this.posts));
        this.sort();
        this.objPost.id = '';
        this.objPost.name = '';
        this.objPost.email = '';
        this.objPost.body = '';
        return;
      }
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      if (
        this.objPost.name == '' ||
        this.objPost.email == '' ||
        this.objPost.body == ''
      ) {
        alert("Input Invalid");
      } else {
        var maxcurrent = Math.max.apply(
          Math,
          this.posts.map(function (o) {
            return o.id;
          })
        );
        console.log(maxcurrent);
        this.objPost.id = maxcurrent + 1;
        var objAdd = {
          id: this.objPost.id,
          name: this.objPost.name,
          email: this.objPost.email,
          body: this.objPost.body,
        };
        this.posts.push(objAdd);
        localStorage.setItem('posts', JSON.stringify(this.posts));
        this.sort();
        this.objPost.name = '';
        this.objPost.email = '';
        this.objPost.body = '';
        this.setPages();
        this.handleSubmit();
      }
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing');
      });
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
