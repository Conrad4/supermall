<template>
  <div id="home">
    <nav-bar class=""><div slot="center">购物街</div></nav-bar>
    <scroll>
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <good-list :goods="showGoods" />
    </scroll>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata } from "network/home";

export default defineComponent({
  components: { TabControl },
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    // 防抖，在一定时间内只执行一次。参数：func函数本身，和时间
    debounce(func, delay) {
      // 创建一个用来存放定时器的返回值
      let timeout = null;

      return function(...arguments) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          //apply调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数，简单来说 可以改变this
          // arguments event指向！谷歌了解
          func.apply(this, arguments); 
        }, delay);
      };
    },
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
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // getHomeGoods(type) {
    //   const page = this.goods[type].page + 1;
    //   getHomeGoods(type, page).then((res) => {
    //     this.goods[type].list.push(...res.data.list);
    //     this.goods[type].page += 1;

    //     this.$refs.scroll.finishPullUp();
    //   });
    // },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
});
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

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
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
