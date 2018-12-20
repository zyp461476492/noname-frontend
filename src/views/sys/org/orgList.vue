<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout column>
      <v-flex xs12>
        <breadcrumbs :items="breadcrumbsInfo"></breadcrumbs>
      </v-flex>
      <v-flex xs12>
        <customSnackBar
          :color="snackbarColor"
          :text="alertMsg"
          :snackbar="snackbar"
          :timeout="snackbarTimeout"
        />

        <v-card >
          <v-toolbar color="grey lighten-2">
            <v-toolbar-title>组织机构管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="primary" flat>
                <v-icon>mdi-account-search</v-icon>
              </v-btn>
              <v-btn color="success" flat>
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-btn color="info" flat>
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <v-btn color="error" flat>
                <v-icon>mdi-account-remove</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-layout row fill-height>
            <v-flex xs3 mr-1 grow="true">
              <v-card height="450px" max-height="450px" >
                <v-toolbar dense card color="grey lighten-3">
                  <v-toolbar-title>组织机构树</v-toolbar-title>
                </v-toolbar>
                <m-tree-view></m-tree-view>
              </v-card>
            </v-flex>
            <v-spacer/>
            <v-flex xs9 >
              <v-card height="450px" max-height="450px">
                <v-toolbar dense card color="grey lighten-3">
                  <v-toolbar-title>四川广电</v-toolbar-title>
                </v-toolbar>
                <m-tree-view></m-tree-view>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import treeView from "@/components/treeView/treeView.vue";
import customSnackBar from "@/components/snackBar/customSnackBar.vue";
export default {
  components: {
    "m-tree-view": treeView,
    customSnackBar: customSnackBar,
    breadcrumbs: breadcrumbs
  },
  data() {
    return {
      breadcrumbsInfo: [
        {
          text: "系统设置",
          disabled: true,
          href: "系统设置"
        },
        {
          text: "组织机构管理",
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

