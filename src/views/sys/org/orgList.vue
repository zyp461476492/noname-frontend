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
          <el-button style="float: right; padding: 3px 0" type="text" @click="refresh()">刷新</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addOrg()">新增</el-button>
        </div>
        <org-card
          :id="dialogId"
          :dialog="dialog"
          :dialogTitle="dialogTitle"
          :timeStamp="timeStamp"
          :type="cardType"
        ></org-card>
        <m-tree-view ref="treeView" :editable="false" v-on:tree-click="treeClick"></m-tree-view>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import treeView from "@/components/treeView/treeView.vue";
import orgCard from "@/components/orgCard/orgCard.vue";
export default {
  components: {
    "m-tree-view": treeView,
    "m-breadcrumbs": breadcrumbs,
    orgCard: orgCard
  },
  data() {
    return {
      dialogId: -1,
      dialog: false,
      dialogTitle: "组织机构",
      cardType: "add",
      timeStamp: 0,
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
  methods: {
    treeClick(data) {
      console.log(data);
      this.openOrgCard(data.id, "update");
    },
    refresh() {
      // 刷新子树
      this.$refs.treeView.queryTreeRoot();
    },
    openOrgCard(id, type) {
      this.cardType = type;
      this.dialogId = id;
      this.timeStamp = new Date().getTime();
      this.dialog = !this.dialog;
    },
    addOrg() {
      this.dialogId = -1;
      this.cardType = "add";
      this.timeStamp = new Date().getTime();
      this.dialog = !this.dialog;
    },
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

