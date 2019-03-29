<template>
  <menu-list :itemList="itemList"></menu-list>
</template>
<script>
import menuList from "@/components/menuList/menuList.vue";
export default {
  name: "side",
  components: {
    menuList: menuList
  },
  created() {
    this.queryMenuList();
  },
  data() {
    return {
      itemList: []
    };
  },
  methods: {
    queryMenuList() {
      let url = "/api/sys/menu/root";
      this.$getDataByApi(url, "GET").then(response => {
        let code = response.data.code;
        if (code === 0) {
          this.itemList = response.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.side-div {
  height: 680px;
}
</style>
