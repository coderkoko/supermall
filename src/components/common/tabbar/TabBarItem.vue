<template>
  <div
    class='tab-bar-item'
    @click='itemClick'
  >
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- :class='{active: isActive}'不能直接加到插槽上，因为当插槽使用时，使直接被内容替换掉的，不保留东西 建议使用插槽都包裹一层div-->
    <!-- <div :class='{active: isActive}'>
      <slot name="item-text"></slot>
    </div> -->
    <div :style='activeStyle'>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBaritem",
  props: {
    //获取父组件的值
    path: String,
    activeColor: {
      type: String,
      default: "#d81e06"
    }
  },
  data() {
    return {
      // isActive: false
    };
  },
  computed: {
    isActive() {
      // console.log(this.$route.path, " 33  ", this.path);
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      //this.$route 处于活跃的路由对象
      //this.$router 全局绑定的路由对象
      //只有当需要更改的路径改变时，才更改
      // console.log(this.$route.path, " 42  ", this.path);
      if (this.$route.path != this.path) {
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
  margin-top: 10px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/* .active {
  color: #d81e06;
} */
</style>