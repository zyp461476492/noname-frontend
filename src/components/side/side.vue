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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    queryMenuList() {
      let url = "/api/sys/menu/root";
      this.$getDataByApi(url, "GET")
        .then(response => {
          let code = response.data.code;
          if (code === 0) {
            this.itemList = response.data.data;
          } else {
            this.$notifyMsg(this.$message, "查询菜单数据失败", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(this.$message, "查询菜单数据异常" + error, "error");
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
