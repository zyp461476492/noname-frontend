<template>
  <div>
    <el-input v-model="parentName" autocomplete="off" disabled>
      <el-button slot="append" @click="openOrgTree()">选择</el-button>
    </el-input>
    <m-org-tree
      ref="orgTreeDialog"
      :dialog="dialogFlag"
      :appendToBody="true"
      :treeData="treeData"
      v-on:tree-submit="orgTreeSubmit"
    ></m-org-tree>
  </div>
</template>
<script>
import orgTree from "@/components/orgTree/orgTree.vue";
export default {
  name: "orgInput",
  props: {},
  components: {
    "m-org-tree": orgTree
  },
  mounted() {
    this.queryTreeRoot();
  },
  data() {
    return {
      parentName: "",
      dialogFlag: false
    };
  },
  methods: {
    changeOrgName(name) {
      this.parentName = name;
    },
    openOrgTree() {
      this.dialogFlag = !this.dialogFlag;
    },
    orgTreeSubmit(data) {
      this.parentName = data.name;
      // 抛出事件，传递选择的ID
      this.$emit("tree-select", data.id);
      // 提交后，重新查询一遍树节点
      this.queryTreeRoot();
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
    }
  }
};
</script>
<style scoped>
</style>

