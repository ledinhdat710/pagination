
<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Add</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add comments"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      objPost: {
        name: "",
        email: "",
        body: "",
      },
      name: "",
      nameState: null,
      submittedNames: [],
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      this.objPost.id = "";
      this.objPost.name = "";
      this.objPost.email = "";
      this.objPost.body = "";
      console.log("a");

      this.$emit("save", this.objPost);
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
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
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>
