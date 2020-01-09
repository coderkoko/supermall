<template>
  <div>
    <swiper
      class="swiper-item"
      v-if="topImages.length!==0"
    >
      <swiper-item
        v-for="item in topImages"
        :key='item.title'
      >
        <img :src="item">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
//轮播图片--------------------------------------------
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
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
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>