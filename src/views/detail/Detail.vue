<template>
  <div class="detail">
    <detail-nav-bar @titleClick='titleClick' ref="detailNavBar" />
    <scroll class="content" @scroll='contentScroll' :probe-type='3' ref="scroll">
      <detail-swiper :top-images='topImages' />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info='detailInfo' @detailImageLoad='detailImageLoad' />
      <detail-param-info ref="params" :param-info='paramInfo' />
      <detail-comment-info ref="comment" :comment-info='commentInfo' />
      <goods-list ref="recommend" :goods='recommends' />
    </scroll>
    <detail-bottom-bar @addCart='addToCart' />
    <!-- 返回顶部事件 组件监听点击时，需要加上native（原生修饰符） -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <!-- <toast :message='message' :showToast='showToast' /> -->
  </div>
</template>

<script>
//滚动插件Scroll--------------------------------------------
import Scroll from "components/common/scroll/Scroll";
// 商品添加提示弹框
// import Toast from "components/common/toast/Toast";

//展示商品详情页推荐信息
import GoodsList from "components/content/goods/GoodsList";

//防抖函数--------------------------------------------
import { debounce } from "common/utils";
//混入--------------------------------------------
import { itemListenerMixin, backTopMixin } from "@/common/mixin";

//顶部导航栏--------------------------------------------
import DetailNavBar from "./childComps/DetailNavBar";
//顶部轮播图--------------------------------------------
import DetailSwiper from "./childComps/DetailSwiper";
//商品服务信息--------------------------------------------
import DetailBaseInfo from "./childComps/DetailBaseInfo";
//商家信息--------------------------------------------
import DetailShopInfo from "./childComps/DetailShopInfo";
//商品详情信息--------------------------------------------
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
//商品参数信息--------------------------------------------
import DetailParamInfo from "./childComps/DetailParamInfo";
//评论信息--------------------------------------------
import DetailCommentInfo from "./childComps/DetailCommentInfo";
//底部导航栏---------------------------------------------
import DetailBottomBar from "./childComps/DetailBottomBar";

//映射vuex中的actions的方法
import { mapActions } from "vuex";

//请求数据
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      getThemTopY: null
      // message: "",
      // showToast: false
    };
  },
  created() {
    //1.保存iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求网络数据
    getDetail(this.iid).then(res => {
      //理论上来说，进入到这里，res应该是已经存在的
      //但是未知原因，有时会报错说data未定义（可能网络原因）
      if (res) {
        const data = res.result;
        //1.获取顶部轮播数据
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        //3.获取商家信息
        this.shop = new Shop(data.shopInfo);

        //4.保存商品的详情信息
        this.detailInfo = data.detailInfo;

        //5.获取商品参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        //6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

        //7.下一帧，渲染完后回调$nextTick(()=>{})
        //nextTick不包含图片，所有能获取到值，但是并不准确
        // this.$nextTick(() => {
        //   this.themeTopYs = [];
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 3);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 3);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 3);
        // });
      }
    });

    //3.获取商品详情页推荐信息
    getRecommend().then(res => {
      if (res) {
        this.recommends = res.data.list;
      }
    });

    //4.赋值
    this.getThemTopY = debounce(() => {
      //每次图片加载完 赋值一次--------------------------------------------
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.$refs.params &&
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 3);
      this.$refs.comment &&
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 3);
      this.$refs.recommend &&
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 3);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mixins: [itemListenerMixin, backTopMixin],
  methods: {
    // 解析vuex中actions的函数
    ...mapActions(["addCart"]),

    detailImageLoad() {
      this.newRefresh();
      this.getThemTopY();
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    //监听滚动距离--------------------------------------------
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;

      //2.和主题进行对比
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = this.currentIndex;
        }
      }

      //3.监听是否显示回到顶部，代码在混入中
      this.listenShowBackTop(position);
    },
    //添加到购物车--------------------------------------------
    addToCart() {
      // console.log(this.goods);
      //1.获取购物车中需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      //在mutations中的调用commit
      // this.$store.commit("addCart", product);

      //在actions中的调用dispatch
      //this.$store.dispatch("addCart", product).then(res => console.log(res));
      // 通过mapActions映射直接使用
      this.addCart(product).then(res => {
        // 重新封装toast--------------
        // this.showToast = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.showToast = false;
        //   this.message = "";
        // }, 1500);
        // 重新封装toast--------------

        // 重新封装插件在toast文件夹的index文件中
        console.log(this.$toast);
        this.$toast.showToast(res, 1500);
      });
    }
  },
  mounted() {},
  //数据更新之后--------------------------------------------
  updated() {},
  //离开时取消函数--------------------------------------------
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
    // Toast
  }
};
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 59px;
}
</style>
