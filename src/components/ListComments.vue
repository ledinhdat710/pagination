<template>
  <div class="col-lg-12 col-md-12 col-xs-12 table-responsive">
    <h2>{{ title }}</h2>
    <table class="table table-hover table-bordered">
      <thead>
        <tr v-for="(data, index) in datas" v-bind:key="index">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.email }}</td>
          <td>{{ data.body }}</td>
        </tr>
      </thead>
      <tbody id="myTable"></tbody>
    </table>
    <!-- <paginate
      :page-count="30"
      :page-range="2"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate> -->
    <pagination
      v-bind:pagination="pagination"
      v-on:click.native="danhsach_comments(pagination.current_page)"
      :offset="4"
    ></pagination>
  </div>
</template>
<script>

export default {
  data() {
    return {
      title: "Danh sách Comments",
      datas: [],
      counter: 0,
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      },
      offset: 4,
    };
  },
  created: function () {
    this.danhsach_comments();
  },
  mounted() {
    this.danhsach_comments(this.pagination.current_page);
  },
  methods: {
    danhsach_comments(page) {
      this.axios
        .get("http://jsonplaceholder.typicode.com/comments")
        .then((response) => {
          this.datas = response.data;
          this.pagination = response.data;
        });
    },
    clickCallback(pageNum) {
      console.log(pageNum);
    },
  },
  computed: {},
};
</script>
 <style>
table {
  right: 0;
  left: 0;
  top: 0;
  margin: auto;
}
table tr th {
  background: rgba(0, 145, 234, 1);
  padding: 10px;
  color: #fff;
}
table tr td {
  padding: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
}
</style>
