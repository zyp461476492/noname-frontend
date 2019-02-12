<template>
  <div>
    <el-input v-model="parentName" autocomplete="off" disabled>
      <el-button slot="append" @click="openOrgTree()">选择</el-button>
    </el-input>
    <m-org-tree
      ref="orgTreeDialog"
      :dialog="dialogFlag"
      :appendToBody="true"
      v-on:tree-submit="orgTreeSubmit"
    ></m-org-tree>
  </div>
</template>
<script>
import orgTree from "@/components/orgTree/orgTree.vue";
export default {
  name: "orgInput",
  props: {
  },
  components: {
    "m-org-tree": orgTree
  },
  data() {
    return {
      parentName: '',
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
    }
  }
};
</script>
<style scoped>
</style>

