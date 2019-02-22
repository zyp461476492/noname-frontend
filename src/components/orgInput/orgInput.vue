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
import treeDialog from "@/components/orgTree/treeDialog.vue";
export default {
  name: "orgInput",
  props: {},
  components: {
    "m-org-tree": treeDialog
  },
  created() {
    this.queryTreeRoot();
  },
  data() {
    return {
      parentName: "",
      treeData: [],
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
          }
        })
       
    }
  }
};
</script>
<style scoped>
</style>

