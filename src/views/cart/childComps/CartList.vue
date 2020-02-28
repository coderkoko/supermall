<template>
  <div class="cart-list">
    <scroll class="content">
      <li v-for="(item,index) in cartList" :key="item+index">{{item}}</li>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";
import { log } from "util";
export default {
  name: "CartList",
  components: {
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped>
.content {
  height: calc(100% - 44px);
}
</style>