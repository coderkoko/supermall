<template>
  <div>
    <nav-bar>
      <div
        slot="left"
        @click="backHome"
      >
        <img
          class="back-img"
          src="~assets/img/common/back.svg"
        >
      </div>
      <div
        slot="center"
        class="title"
      >
        <div
          v-for="(item,index) in title"
          :key='item+index'
          class="title-item"
          :class="{active:currentIndex === index}"
          @click="titleClick(index)"
        >{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backHome() {
      this.$router.back();
      this.$bus.$scrollTo && this.$bus.$scrollTo(0, this.$bus.$saveY);
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.title .title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}

.back-img {
  padding-top: 12px;
}
</style>