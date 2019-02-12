<template>
  <el-tree
    :expand-on-click-node="false"
    :props="defaultProps"
    :data="treeData"
    node-key="id"
    @node-click="handleNodeClick"
  >
    <span class="tree-node" slot-scope="{ node }">
      <span>{{ node.label }}</span>
    </span>
  </el-tree>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    treeData: {
      type: Array
    }
  },
  data() {
    return {
      active: [],
      open: [],
      users: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    modify(data) {
      // 将待修改的数据传递给父组件
      this.$emit("tree-modify", data);
    },
    handleNodeClick(data) {
      // 将被点击的data对象传递出去
      this.$emit("tree-click", data);
    }
  }
};
</script>
<style scoped>
.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

