<template>
  <div class="col-sm-12">
    <div>
      <h1>{{ title }}</h1>
      <AddComments @save="clickAdd()" @click="addBefore()" />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Noi dung</th>
            <th>Hanh dong</th>
            <th>Image</th>
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
              <button
                class="btn btn-danger"
                v-b-modal.delete
                @click="deletePost(post.id)"
              >
                Delete
              </button>
              <button
                class="btn btn-info"
                v-b-modal.modal-prevent-closing
                @click="clickDetail()"
              >
                Detail
              </button>
              <b-modal id="delete">
                <p class="my-4">Ban chac chan muon xoa ?</p>
              </b-modal>
            </td>
            <td>
              <div v-if="!image">
                Select an image
                <input type="file" @change="onFileChange" />
              </div>
              <div v-else>
                <img :src="image" />
                <button @click="removeImage">Remove image</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import AddComments from "./AddComments.vue";
Vue.use(VueAxios, axios);
export default {
  components: { AddComments },
  data() {
    return {
      title: "Danh sach comment",
      objPost: { name: "", email: "", body: "" },
      editPost: { name: "", email: "", body: "" },
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
      name: "",
      nameState: null,
      submittedNames: [],
      image: "",
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
    deletePost(id) {
      this.deleteDialog = true;
      console.log("delete: " + id);
      const removeIndex = this.posts.findIndex((item) => item.id === id);
      // remove object
      console.log(removeIndex);
      this.posts.splice(removeIndex, 1);
      localStorage.setItem("posts", JSON.stringify(this.posts));
      this.sort();
    },
    clickEdit(post) {
      console.log("edit");
      this.objPost.name = post.name;
      this.objPost.email = post.email;
      this.objPost.body = post.body;
      this.objPost.id = post.id;
    },
    clickDetail(post) {
      this.objPost.name = post.name;
      this.objPost.email = post.email;
      this.objPost.body = post.body;
    },
    addBefore() {
      this.objPost.id = "";
      this.objPost.name = "";
      this.objPost.email = "";
      this.objPost.body = "";
    },
    clickAdd() {
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
        this.objPost.id = "";
        this.objPost.name = "";
        this.objPost.email = "";
        this.objPost.body = "";
        return;
      }
      if (
        this.objPost.name == "" ||
        this.objPost.email == "" ||
        this.objPost.body == ""
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
        localStorage.setItem("posts", JSON.stringify(this.posts));
        this.sort();
        this.objPost.name = "";
        this.objPost.email = "";
        this.objPost.body = "";
        this.setPages();
        this.handleSubmit();
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = "";
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
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
