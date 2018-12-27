<template>
  <el-menu
    default-active="2"
    :router="true"
    class="side-div"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/main/userConfig">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/main/treeConfig">
      <i class="el-icon-menu"></i>
      <span slot="title">组织机构管理</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.side-div {
  height: 680px;
}
</style>
