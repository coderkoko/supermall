<template>
  <swiper v-if="banners.length!=0">
    <swiper-item
      v-for="item in banners"
      :key='item.title'
    >
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "HomeSwiper",
  props: {
    //接收父组件数据
    banners: {
      //定义类型
      type: Array,
      //定义默认值
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
</style>