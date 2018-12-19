<template>
  <el-tree  :props="defaultProps" :load="loadNode" lazy node-key="id" @node-click="handleNodeClick"></el-tree>
</template>
<script>
export default {
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
    handleNodeClick(data) {
      // 将被点击的data对象传递出去
      this.$emit("tree-click", data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.queryTreeRoot()
          .then(response => {
            return resolve(response.data.data);
          })
          .catch(error => {
            this.$msgbox({
              type: "error",
              message: "根节点查询失败，原因：" + error
            });
          });
      } else if (node.level >= 1) {
        this.fetchChild(node.data)
          .then(res => {
            resolve(res.data.data);
          })
          .catch(error => {
            this.$msgbox({
              type: "error",
              message: "孩子节点查询失败，原因：" + error
            });
          });
      }
    },
    queryTreeRoot() {
      let url = "/api/sys/org/tree/root";
      let method = "get";
      let data = {};
      let params = {};
      return this.$getDataByApi(url, method, data, params);
    },
    fetchChild(item) {
      let url = "/api/sys/org/tree/child";
      let method = "post";
      let data = item;
      let params = {};
      return this.$getDataByApi(url, method, data, params);
    }
  }
};
</script>
<style scoped>
</style>

