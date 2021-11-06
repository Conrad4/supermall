<template>
  <div class="detail">
    <!-- <nav-bar></nav-bar> -->
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
export default {
  name: "Detail",
  components: { NavBar, DetailNavBar },
  props: {},
  data() {
    return {};
  },
  created() {
    this.iid = this.$route.params.iid;
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
