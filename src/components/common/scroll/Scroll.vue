<template>
  <!-- ref/children获取子组件 而且，只在本身组件中有用-->
  <div class="wrapper" ref='wrapper'>
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
      default() {
        return false;
      }
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
      //加载更多
      pullUpLoad: this.pullUpLoad
    });

    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }

    //3.监听scroll滚动到底部加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //返回顶部
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    //重新刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },

    //监听加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    //获取滚动距离
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>


<style scoped>
</style>


