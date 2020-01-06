<template>
  <div class="GoodsListItem">
    <a :href="goodsListItem.link">
      <img :src="goodsListItem.show.img" >

    </a>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
</style>