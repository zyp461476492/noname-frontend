<template>
  <menu-list :itemList="itemList"></menu-list>
</template>
<script>
  import menuList from "../menuList/menuList.vue";

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
    /**
     * 从session 中获取当前登录用户ID，随后查询它的权限信息，并生成菜单
     */
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
