<template>
  <!-- ref/children获取子组件 而且，只在本身组件中有用-->
  <div
    class="wrapper"
    ref='wrapper'
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // click 控制类似div之类的元素是否能点击
      click: true,
      //实时监听滚动的距离
      probeType: this.probeType,
      //监听上拉事件
      pullUpLoad: this.pullUpLoad
    });

    //2.监听滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });

    //3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
};
</script>


<style scoped>
</style>