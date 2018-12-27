<template>
  <el-container style="height: 690px;">
    <el-aside width="200px">
      <m-side></m-side>
    </el-aside>
    <el-container>
      <el-header height="64px">
        <m-header></m-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import header from "@/components/header/header.vue";
import side from "@/components/side/side.vue";
export default {
  name: "App",
  components: {
    "m-header": header,
    "m-side": side
  },
  methods: {
    drawerClick: function() {
      this.drawer = !this.drawer;
    }
  },
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      itemsDemo: [
        {
          text: "主页",
          disabled: true,
          href: "系统设置"
        },
        {
          text: "用户管理",
          disabled: false,
          href: "用户管理"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>

