<template>
  <el-tree
    :expand-on-click-node="false"
    :props="defaultProps"
    :data="treeData"
    node-key="id"
    @node-click="handleNodeClick"
  >
    <span class="tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span v-if="editable">
        <el-button type="text" size="mini" @click="() => modify(data)">修改</el-button>
        <el-button type="text" size="mini" @click="() => remove(data)">删除</el-button>
      </span>
    </span>
  </el-tree>
</template>
<script type="text/ecmascript-6">
export default {
  mounted() {
    this.queryTreeRoot();
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: [],
      open: [],
      users: [],
      treeData: [],
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
    remove(data) {
      let url = "/api/sys/org/tree/del/" + data.id;
      this.$getDataByApi(url, "get")
        .then(response => {
          let resCode = response.data.code;
          if (resCode === 0) {
            this.$notifyMsg(this.$message, "删除成功", "success");
          } else {
            this.$notifyMsg(this.$message, "删除失败", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(
            this.$message,
            "组织机构删除失败-网络请求失败:" + error,
            "error"
          );
        });
    },
    handleNodeClick(data) {
      // 将被点击的data对象传递出去
      this.$emit("tree-click", data);
    },
    queryTreeRoot() {
      let url = "/api/sys/org/tree/root";
      let method = "get";
      let data = {};
      let params = {};
      this.$getDataByApi(url, method, data, params)
        .then(response => {
          let resCode = response.data.code;
          if (resCode === 0) {
            this.treeData = response.data.data;
          } else {
            this.$notifyMsg(this.$message, "没有查询到数据", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(
            this.$message,
            "查询组织机构信息失败-网络请求失败:" + error,
            "error"
          );
        });
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
.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

