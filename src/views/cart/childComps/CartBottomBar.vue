<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native="checkClick" :is-checked='isSelectAll' class="check-button" />
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      选中({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach(item => (item.checked = false));
      } else {
        //没有全部选中
        this.cartList.forEach(item => (item.checked = true));
      }

      // 该简化不行  因为cartList的checked会影响isSelectAll,然后isSelectAll又反过来影响cartList,乱七八糟
      // this.cartList.forEach(item => (item.checked = !this.isSelectAll));
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.showToast("请选择购买的商品", 1500);
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return parseFloat(item.price) * item.count + preValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // return !this.cartList.filter(item => !item.checked).length;
      return !this.cartList.find(item => !item.checked);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #ccc;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.total-price {
  flex: 1;
  text-align: center;
}

.calculate {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: pink;
}
</style>