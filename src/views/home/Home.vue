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
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
      <li>列表10</li>
    </ul>

  </div>
</template>
<script>
//全局公共组件--------------------------------------------
import NavBar from "components/common/navbar/NavBar";

//项目内公共组件--------------------------------------------
import TabControl from "components/content/tabControl/TabControl";

//子组件--------------------------------------------
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

//方法数据--------------------------------------------
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
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
        news: { page: 0, list: [] },
        sell: { page: 0, list: [] }
        //160集
      }
    };
  },

  //首页创建完之后发送网络请求
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
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