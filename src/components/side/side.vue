<template>
  <menu-list :itemList="itemList"></menu-list>
</template>
<script>
  import menuList from "../menuList/menuList.vue";
  import {buildMenuTree} from "../../plugins/common.js";

  export default {
  name: "side",
  components: {
    menuList: menuList
  },
    mounted() {
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
      let url = "/api/sys/user/authority/";
      let jwt = localStorage["JWT_TOKEN"];
      this.$getDataByApi(url, "GET", {}, {jwt: jwt}).then(response => {
        let code = response.data.code;
        if (code === 0) {
          this.itemList = buildMenuTree(response.data.data);
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
