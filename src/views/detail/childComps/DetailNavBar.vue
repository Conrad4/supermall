<template>
  <div class="wrapper">
    <nav-bar>
      <div slot="left"></div>
      <!-- <div slot="center" v-for="(item,index) in titles" :key="index">
            {{item}}
        </div> -->
      <div slot="center" class="titles">
        <div v-for="(item, i) in titles" :key="i" class="title-item" @click="titleClick">
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  components: { NavBar },
  props: {},
  data() {
    return {
      titles: [],
      currentIndex: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    titleClick(){

    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
