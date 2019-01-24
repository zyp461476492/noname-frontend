<template>
  <el-menu :router="true" class="side-div" @open="handleOpen" @close="handleClose">
    <template v-for="(item, index) in itemList">
      <el-submenu :index="item.url" v-if="item.children.length > 0" :key="index.index">
        <template slot="title">
          <i :class="item.icon"></i>
            {{item.name}}
        </template>
        <tree-menu :itemList="item.children"></tree-menu>
      </el-submenu>
      <el-menu-item :index="item.url" :class="item.icon" :key="index.index" v-else>{{item.name}}</el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import treeMenu from "@/components/menuList/treeMenu.vue";
export default {
  name: "menuList",
  props: {
    itemList: {
      type: Array
    }
  },
  components: {
    "tree-menu": treeMenu
  },
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
