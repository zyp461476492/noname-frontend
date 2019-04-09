<template>
  <div>
    <el-input v-model="parentName" autocomplete="off" disabled>
      <el-button slot="append" @click="openOrgTree()">选择</el-button>
    </el-input>
    <m-org-tree
            ref="orgTreeDialog"
            :visable.sync="visible"
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
      visible: false
    };
  },
  methods: {
    changeOrgName(name) {
      this.parentName = name;
    },
    openOrgTree() {
      this.visible = !this.visible;
    },
    orgTreeSubmit(data) {
      let param = undefined;
      if (data === undefined) {
        this.parentName = '根节点';
        // 抛出undefined，供前台判断使用

      } else {
        this.parentName = data.name;
        // 抛出事件，传递选择的ID
        param = data.id;
      }
      this.$emit("tree-select", param);
    },
    queryTreeRoot() {
      let url = "/api/sys/org/tree/root";
      let method = "get";
      let data = {};
      let params = {};
      this.$getDataByApi(url, method, data, params).then(response => {
        let resCode = response.data.code;
        if (resCode === 0) {
          this.treeData = response.data.data;
        }
      });
    }
  },
    updated() {
      this.queryTreeRoot();
    }
};
</script>
<style scoped>
</style>

