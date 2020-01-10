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
      <detail-param-info :param-info='paramInfo' />
      <detail-comment-info :comment-info='commentInfo' />
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
//商品参数信息--------------------------------------------
import DetailParamInfo from "./childComps/DetailParamInfo";
//评论信息--------------------------------------------
import DetailCommentInfo from "./childComps/DetailCommentInfo";

//请求数据
import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

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
      commentInfo: {}
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
      }
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll && this.$refs.scroll.refresh();
    }
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo
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