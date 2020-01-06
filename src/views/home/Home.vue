<template>
  <div id='home'>
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot='center'>购物街</div>
    </nav-bar>
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
    />
    <goods-list :goods="goods['pop'].list" />

  </div>
</template>
<script>
//全局公共组件--------------------------------------------
import NavBar from "components/common/navbar/NavBar";

//项目内公共组件--------------------------------------------
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

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
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    FeatureView
  },
  //保存获取的数据
  data() {
    return {
      banners: [],
      recommends: [],
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
    // this.getHomeGoods("new");
    // this.getHomeGoods("sell");
  },
  methods: {
    //1.请求多个数据方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求商品数据方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}

.tab-control {
  position: sticky;
  top: 44px;
}
</style>