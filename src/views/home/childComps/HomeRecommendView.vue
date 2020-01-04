<template>
  <div class="recommend">
    <div
      class="recomend-item"
      v-for='item in recommends'
      :key='item.title'
    >
      <a :href="item.link">
        <img
          :src="item.image"
          alt=""
        >
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recomend-item {
  flex: 1;
}
.recomend-item > a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.recomend-item img {
  width: 90%;
  height: auto;
}

.recomend-item > a > div {
  margin-top: 3%;
  font-size: 12px;
}
</style>