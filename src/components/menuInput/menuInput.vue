<template>
  <div>
    <el-input v-model="parentName" autocomplete="off" disabled>
      <el-button slot="append" @click="openMenuTree()">选择</el-button>
    </el-input>
    <tree-dialog
      ref="orgTreeDialog"
      :dialog="dialogFlag"
      :appendToBody="true"
      :treeData="treeData"
      v-on:tree-submit="menuTreeSubmit"
    ></tree-dialog>
  </div>
</template>
<script>
import treeDialog from "@/components/orgTree/treeDialog.vue";
export default {
  name: "menuInput",
  components: {
    "tree-dialog": treeDialog
  },
  created() {
    this.queryMenuList();
  },
  data() {
    return {
      parentName: "",
      treeData: [],
      dialogFlag: false
    };
  },
  methods: {
    changeMenuName(name) {
      this.parentName = name;
    },
    openMenuTree() {
      this.dialogFlag = !this.dialogFlag;
    },
    queryMenuList() {
      let url = "/api/sys/menu/root";
      this.$getDataByApi(url, "GET")
        .then(response => {
          let code = response.data.code;
          if (code === 0) {
            this.treeData = response.data.data;
          } 
        })
       
    },
    menuTreeSubmit(item) {
      this.parentName = item.name;
      // 抛出事件，传递选择的ID
      this.$emit("tree-select", item.id);
      // 提交后，重新查询一遍树节点
      this.queryMenuList();
    }
  }
};
</script>
<style scoped>
</style>
