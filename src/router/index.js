import Vue from "vue";
import VueRouter from "vue-router";

//懒加载
//懒加载方式导入视图
const Home = () => import("@/views/home/Home");
const Cart = () => import("@/views/cart/Cart");
const Category = () => import("@/views/category/Category");
const Profile = () => import("@/views/profile/Profile");

//1.安装插件
Vue.use(VueRouter);

//2.创建router
//配置对应的映射关系
const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

//3.导出
export default router;
