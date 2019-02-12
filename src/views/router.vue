<template>
  <router-view></router-view>
  <!-- <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container> -->
</template>

<script>
export default {
  created: function() {
    this.$router.push("/main");
  }
};
</script>

<style>
</style>
