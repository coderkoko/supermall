import {
  debounce
} from "@/common/utils"

//项目内公共组件--------------------------------------------
import BackTop from "components/content/backTop/BackTop";
//工具--------------------------------------------
import {
  BACKTOP_DISTANCE
} from "@/common/const";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImageListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  //混入中的方法有相同的化，会被组件的覆盖掉
  methods: {
    //返回顶部事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 600);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
    }
  }
}
