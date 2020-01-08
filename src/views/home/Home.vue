<template>
  <div id='home'>
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot='center'>购物街</div>
    </nav-bar>
    <!-- 滚动插件 -->
    <scroll
      class="content"
      ref='scroll'
      :probe-type='3'
      :pull-up-load='true'
      @scroll='contentScroll'
      @pullingUp='loadMore'
    >
      <!-- 轮播 -->
      <home-swiper :banners='banners' />
      <!-- 推荐 -->
      <home-recommend-view :recommends='recommends' />
      <!-- 流行 -->
      <feature-view />
      <!-- 选项卡 -->
      <tab-control
        class="tab-control"
        :title='["流行","新款","精选"]'
        @tabClick='tabClick'
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 返回顶部事件 组件监听点击时，需要加上native（原生修饰符） -->
    <back-top
      @click.native="backClick"
      v-show="isShowBackTop"
    />
  </div>
</template>
<script>
//全局公共组件--------------------------------------------
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

//项目内公共组件--------------------------------------------
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

//子组件--------------------------------------------
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

//方法数据--------------------------------------------
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    HomeRecommendView,
    FeatureView
  },
  //保存获取的数据
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      isShowBackTop: false,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
        //160集
      }
    };
  },

  //首页创建完之后发送网络请求
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  /**
   *计算属性
   */
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    //1.请求多个数据方法
    async getHomeMultidata() {
      let res = await getHomeMultidata();
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    },
    //2.请求商品数据方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },

    /**
     *事件监听相关方法
     */
    //选择分类事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    //返回顶部事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 600);
    },
    //监听滚动事件
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    //监听加载更多
    loadMore(scroll) {
      this.getHomeGoods(this.currentType);
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>