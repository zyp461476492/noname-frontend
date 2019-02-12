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
          <span>菜单管理</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refresh()">刷新</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addMenuCard()">新增</el-button>
          <m-menu-card
            :visable.sync="visable"
            :title="cardTitle"
            :type="cardType"
            :id="cardId"
            v-on:tree-change="refresh"
          />
        </div>
        <m-tree-view ref="treeView" :treeData="treeData" v-on:tree-click="treeClick"></m-tree-view>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import treeView from "@/components/treeView/treeView.vue";
import menuCard from "@/components/menuCard/menuCard.vue";
export default {
  name: "menu-view",
  components: {
    "m-tree-view": treeView,
    "m-breadcrumbs": breadcrumbs,
    "m-menu-card": menuCard
  },
  created() {
    this.queryMenuList();
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
          name: "菜单管理",
          disabled: true,
          href: "菜单管理"
        }
      ],
      cardTitle: "菜单管理",
      cardId: -1,
      cardType: "add",
      visable: false,
      treeData: []
    };
  },
  methods: {
    refresh() {
      this.queryMenuList();
    },
    addMenuCard() {
      this.openMenuCard("add", -1);
    },
    updateMenuCard(id) {
      this.openMenuCard("update", id);
    },
    openMenuCard(type, id) {
      this.cardType = type;
      this.cardId = id;
      this.visable = !this.visable;
    },
    treeClick(item) {
      this.updateMenuCard(item.id);
    },
    queryMenuList() {
      let url = "/api/sys/menu/root";
      this.$getDataByApi(url, "GET")
        .then(response => {
          let code = response.data.code;
          if (code === 0) {
            this.treeData = response.data.data;
          } else {
            this.$notifyMsg(this.$message, "查询菜单数据失败", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(this.$message, "查询菜单数据异常" + error, "error");
        });
    }
  }
};
</script>
<style scoped>
</style>
