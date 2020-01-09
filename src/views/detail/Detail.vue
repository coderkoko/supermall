<template>
  <div class="detail">
    <detail-nav-bar />
    <scroll
      class="content"
      ref="scroll"
    >
      <detail-swiper :top-images='topImages' />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info='detailInfo'
        @imageLoad='imageLoad'
      />
    </scroll>
  </div>
</template>

<script>
//滚动插件Scroll--------------------------------------------
import Scroll from "components/common/scroll/Scroll";

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

//请求数据
import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {}
    };
  },
  created() {
    //1.保存iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求网络数据

    getDetail(this.iid).then(res => {
      console.log(res);
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
    });
  },
  methods: {
    imageLoad() {
      this.$refs.Scroll.refresh();
    }
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo
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
  bottom: 50px;
}
</style>