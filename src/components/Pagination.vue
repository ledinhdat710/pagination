<template>
  <div>
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
          <button type="button" class="page-link" @click="page = pages.length">
            End Page
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  methods: {
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
