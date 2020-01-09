<template>
  <div>
    <swiper v-if="banners.length!=0">
      <swiper-item
        v-for="item in banners"
        :key='item.title'
      >
        <a :href="item.link">
          <img
            :src="item.image"
            @load="imageLoad"
          >
        </a>
      </swiper-item>
    </swiper>
  </div>
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
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>