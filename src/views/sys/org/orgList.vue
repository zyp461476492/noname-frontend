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
                :visable.sync="visable"
                :dialogTitle="dialogTitle"
                :timeStamp="timeStamp"
                :type="cardType"
        ></org-card>
        <m-tree-view ref="treeView" :treeData="treeData" v-on:tree-click="treeClick"></m-tree-view>
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
  mounted() {
    this.queryTreeRoot();
  },
  data() {
    return {
      visable: false,
      dialogId: -1,
      dialogTitle: "组织机构",
      cardType: "add",
      timeStamp: 0,
      treeData: [],
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
      this.queryTreeRoot();
    },
    openOrgCard(id, type) {
      this.cardType = type;
      this.dialogId = id;
      this.timeStamp = new Date().getTime();
      this.visable = !this.visable;
    },
    addOrg() {
      this.dialogId = -1;
      this.cardType = "add";
      this.timeStamp = new Date().getTime();
      this.visable = !this.visable;
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

