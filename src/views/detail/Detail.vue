<template>
  <div class="detail">
    <!-- <nav-bar></nav-bar> -->
    <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
    <detail-swiper :banners="topImages"></detail-swiper>
    <detail-base-info :goods="goods" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import { getGoodsDetail, Goods } from "network/detail";

export default {
  name: "Detail",
  components: { NavBar, DetailNavBar, DetailSwiper, DetailBaseInfo},
  props: {},
  data() {
    return {
      iid: "",
      topImages: [],
      // 把这个值传到DetailbaseInfo子组件,这个是空对象，不要写成null或者其他
      goods: {},
    };
  },
  created() {
    //
    this.iid = this.$router.params.id;

    getGoodsDetail(this.iid).then((res) => {
      // 后端拿到的数据是data.result,先把公共的部分定义出来，就防止出现res.data.result.itemInfo.xxx,太长了，这和后端返回的数据有关系
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
    });
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
