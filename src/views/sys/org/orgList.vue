<template>
  <el-row>
    <el-col :span="24" class="breadcrumb">
      <el-card>
        <m-breadcrumbs :items="breadcrumbsInfo"></m-breadcrumbs>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card>
        <div slot="header" class="clearfix">
          <span>组织机构管理</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addUser()">新增</el-button>
        </div>
        <m-tree-view></m-tree-view>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import treeView from "@/components/treeView/treeView.vue";
export default {
  components: {
    "m-tree-view": treeView,
    "m-breadcrumbs": breadcrumbs
  },
  data() {
    return {
      breadcrumbsInfo: [
        {
          name: "系统设置",
          disabled: true,
          href: "系统设置"
        },
        {
          name: "组织机构管理",
          disabled: false,
          href: "组织机构管理"
        }
      ],
      snackbar: false,
      snackbarColor: "info",
      snackbarTimeout: 1500,
      alertMsg: ""
    };
  },
  mounted() {
    this.tips("error", "error");
  },
  methods: {
    tips(text, type) {
      this.snackbar = !this.snackbar;
      this.alertMsg = text;
      this.snackbarColor = type;
    }
  }
};
</script>
<style scoped>
</style>

