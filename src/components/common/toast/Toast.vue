<template>
  <div class="toast" v-show="isShowToast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ""
    // },
    // showToast: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: "",
      isShowToast: false
    };
  },
  methods: {
    showToast(message = "默认文字", duration = 2000) {
      this.isShowToast = true;
      this.message = message;
      setTimeout(() => {
        this.isShowToast = false;
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
</style>