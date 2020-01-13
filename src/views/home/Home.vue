<template>
  <div id='home'>
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot='center'>购物街</div>
    </nav-bar>

    <!-- 当到达一定高度时，显示出来 -->
    <tab-control
      ref="tabControl1"
      :title='["流行","新款","精选"]'
      class="tab-control"
      v-show="isTabFixed"
      @tabClick='tabClick'
    />

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
      <home-swiper
        :banners='banners'
        @swiperImageLoad='swiperImageLoad'
      />
      <!-- 推荐 -->
      <home-recommend-view :recommends='recommends' />
      <!-- 流行 -->
      <feature-view />
      <!-- 选项卡 -->
      <tab-control
        ref="tabControl2"
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

//工具--------------------------------------------
import { debounce } from "common/utils";
import { itemListenerMixin } from "@/common/mixin";

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
  //混入--------------------------------------------
  mixins: [itemListenerMixin],
  //保存获取的数据
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      isShowBackTop: false,
      tabControl: 0,
      isTabFixed: false,
      saveY: 0,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
        //160集
      }
    };
  },
  //生命周期函数--------------------------------------------
  //首页创建完之后发送网络请求
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  //挂载之后回调
  mounted() {
    //监听item中图片加载完成
    //防抖函数
    //对监听的事件进行保存
    //转移到itemListenerMixin混入当中了
  },

  //更新之后回调
  updated() {
    this.tabControl = this.$refs.tabControl2.$el.offsetTop;
  },

  //销毁之后回调
  destroyed() {
    console.log("----");
  },

  //活跃状态和离开状态  只有使用keep-alive时出现
  //活跃状态
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    //回来时进行一次刷新，防止BSscroll神经质
    this.$refs.scroll.refresh();
  },

  //离开状态
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //事件总线代理  不懂什么原因进入详情页后回到首页无法停留在原来的位置
    //即进入Detail页面后返回Home无法保留位置
    this.$bus.$saveY = this.saveY;
    this.$bus.$scrollTo = this.$refs.scroll.scrollTo;

    //离开的时候取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImageListener);
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
      if (res) {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }
    },
    //2.请求商品数据方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        if (res != undefined) {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        }
        //完成上拉加载更多
        const newFinishPullUp = debounce(this.$refs.scroll.finishPullUp, 1000);
        newFinishPullUp();
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //返回顶部事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 600);
    },
    //监听滚动事件
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.觉得tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabControl;
    },
    //加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //监听轮播图图片是否加载完毕
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有组件中都有一个属性$el 用于获取组件中的元素
      this.tabControl = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  /* padding-top: 44px; */
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /* 在使用浏览器原生的滚动时使用 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>