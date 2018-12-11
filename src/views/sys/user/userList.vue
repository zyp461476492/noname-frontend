<template>
  <v-layout column warp>
    <v-flex xs12 ma-2>
      <breadcrumbs :items="breadcrumbsInfo"></breadcrumbs>
    </v-flex>
    <v-flex xs12 ml-2 mr-2>
      <v-layout column>
        <v-flex xs12>
          <v-toolbar>
            <v-toolbar-title>用户管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <user-dialog :dialog="dialog" :dialogTitle="dialogTitle" :id="dialogId" v-on:refresh="needRefresh"/>
              <v-btn @click="addUser" color="success" flat>
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-btn @click="updateUser" color="info" flat>
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <v-btn color="error" flat>
                <v-icon>mdi-account-remove</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-flex>
        <v-flex xs12 mt-1>
          <v-card>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="userInfo"
              :pagination.sync="pagination"
              :total-items="totalCount"
              :loading="loading"
              :rows-per-page-items="[5,10,25]"
              select-all
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                </td>
                <td>{{props.index + 1 + ((pagination.page - 1 ) * pagination.rowsPerPage)}}</td>
                <td>{{ props.item.loginId}}</td>
                <td>{{ props.item.name}}</td>
                <td>{{ props.item.orgId}}</td>
                <td>{{ props.item.gender}}</td>
                <td>{{ props.item.email}}</td>
                <td>{{ props.item.phone}}</td>
                <td>{{ props.item.createDate | formateDate}}</td>
                <td>{{ props.item.updateDate | formateDate}}</td>
                <td>{{ props.item.updateBy}}</td>
                <td>{{ props.item.lastLoginIp}}</td>
                <td>{{ props.item.order}}</td>
                <td>{{ props.item.status}}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
// @ 是vue自动生成时设置 /src目录的别名
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import userDialog from "@/components/userDialog/userDialog.vue";

export default {
  components: {
    breadcrumbs: breadcrumbs,
    userDialog: userDialog
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    }
  },
  mounted: function() {
    this.getDataFromApi();
  },
  data() {
    return {
      selected: [],
      dialogTitle: "用户管理",
      dialog: false,
      dialogId: -1,
      totalCount: 0,
      pagination: {},
      loading: false,
      headers: [
        { text: "编号", value: "id", sortable: false },
        { text: "登录名", value: "loginId", sortable: false },
        { text: "姓名", value: "name", sortable: false },
        { text: "部门", value: "dept", sortable: false },
        { text: "性别", value: "gender", sortable: false },
        { text: "邮箱", value: "email", sortable: false },
        { text: "联系电话", value: "phone", sortable: false },
        { text: "注册时间", value: "createDate", sortable: false },
        { text: "更新时间", value: "updateDate", sortable: false },
        { text: "更新人", value: "updateBy", sortable: false },
        { text: "最近登录IP", value: "lastLoginIp", sortable: false },
        { text: "排序值", value: "order" },
        { text: "状态", value: "status", sortable: false }
      ],
      userInfo: [],
      breadcrumbsInfo: [
        {
          text: "系统设置",
          disabled: true,
          href: "系统设置"
        },
        {
          text: "用户管理",
          disabled: false,
          href: "用户管理"
        }
      ]
    };
  },
  methods: {
    needRefresh() {
      this.getDataFromApi();
    },
    openUserDialog(title) {
      this.dialogTitle = title;
      this.dialog = !this.dialog;
    },
    addUser() {
      this.dialogId = -1;
      this.openUserDialog("用户新增");
    },
    updateUser() {
      let l = this.selected.length;
      if (l != 1) {
        alert("请选择一个待修改的用户数据");
      } else if (l == 1) {
        // 获取选中数据ID
        let id = this.selected[0].id;
        this.dialogId = id;
        this.openUserDialog("用户更新");
      }
    },
    checkUser() {
      this.openUserDialog("用户信息");
    },
    getDataFromApi() {
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/api/sys/user/list/",
        params: {
          limit: this.pagination.rowsPerPage,
          offset: this.pagination.page - 1,
          sortBy: this.pagination.sortBy
        }
      })
        .then(response => {
          this.loading = false;
          let isEmpty = response.data.data.empty;
          if (isEmpty) {
            console.log("empty");
          } else {
            this.userInfo = response.data.data.content;
          }
          this.totalCount = response.data.data.totalElements;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
