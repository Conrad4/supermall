<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import { getGoodsDetail, Goods } from "network/detail";

export default {
  name: "Detail",
  components: { NavBar, DetailNavBar, DetailSwiper, DetailBaseInfo, Scroll },
  props: {},
  data() {
    return {
      iid: "",
      topImages: [],
      // 把这个值传到DetailbaseInfo子组件,这个是空对象，不要写成null或者其他
      goods: {},
      shop: {},
    };
  },
  created() {
    //
    this.iid = this.$router.params.id;

    getGoodsDetail(this.iid).then((res) => {
      // 后端拿到的数据是data.result,先把公共的部分定义出来，就防止出现res.data.result.itemInfo.xxx,太长了，这和后端返回的数据有关系
      const data = res.data.result;
      console.log(data);
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 使用解构写一下;shopInfo.services这种就不行了
      // const { itemInfo, columns } = data;
      // this.goods = new Goods(itemInfo, columns, data.shopInfo.services);

      this.shop = new Shop(data.shopInfo);

      // 如果下面不是这样写的话， 你在子组件里面prop传值的时候，就得穿logo，name等等，传的值太多了，所以封装一下还是有必要的，
      // this.logo = data.shopInfo.shopLogo;
      // this.name = data.shopInfo.name;
    });
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
</style>
