<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogFormVisible"
    width="20%"
    center
    :append-to-body="appendToBody"
  >
    <m-treeview ref="subTreeView" :treeData="treeData" v-on:tree-click="treeSelect"></m-treeview>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="treeSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import treeView from "@/components/treeView/treeView.vue";
import { notifyMsg, isEmptyObject } from "@/plugins/common.js";
export default {
  components: {
    "m-treeview": treeView
  },
  props: {
    dialog: {
      type: Boolean
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: "组织机构树"
    },
    treeData: {
      type: Array
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      selected: {}
    };
  },
  watch: {
    dialog() {
      this.selected = {};
      this.dialogFormVisible = true;
    }
  },
  methods: {
    treeRefresh() {
      // 更新子树
      this.queryTreeRoot();
    },
    treeSelect(data) {
      // 树节点选择
      this.selected = data;
    },
    treeSubmit() {
      if (isEmptyObject(this.selected)) {
        notifyMsg(this.$message, "请选择一个节点", "warning");
      } else {
        // 确定时，传递出选择的树节点
        this.$emit("tree-submit", this.selected);
        // 关闭弹窗
        this.dialogFormVisible = false;
      }
    }
  }
};
</script>
<style scoped>
</style>

