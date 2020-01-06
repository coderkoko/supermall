<template>
  <div class="goods">
    <goods-list-item
      v-for="(item,index) in goods"
      :key="'item'+index"
      :goods-list-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
  
};
</script>

<style scoped>
</style>