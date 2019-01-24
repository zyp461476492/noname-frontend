<template >
  <div>
    <template v-for="(item,index) in itemList">
      <el-submenu :index="item.url" v-if="item.children.length > 0" :key="index.index">
        <template slot="title">
          <i :class="item.icon"></i>
          {{item.name}}
        </template>
        <treeMenu :itemList="item.children"></treeMenu>
      </el-submenu>
      <el-menu-item v-else :index="item.url" :class="item.icon" :key="index.index">{{item.name}}</el-menu-item>
    </template>
  </div>
</template>
<script>
import treeMenu from "@/components/menuList/treeMenu.vue";
export default {
  name: "treeMenu",
  mounted() {
    console.log(this.itemList);
  },
  components: {
    treeMenu: treeMenu
  },
  props: {
    itemList: {
      type: Array
    }
  }
};
</script>
<style scoped>
</style>
