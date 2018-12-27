<template>
  <!-- <v-layout column warp>
    <v-flex xs12 ma-2>
      <breadcrumbs :items="breadcrumbsInfo"></breadcrumbs>
    </v-flex>
    <v-flex xs12 ml-2 mr-2>
      <v-layout column>
        <customSnackBar
          :color="snackbarColor"
          :text="alertMsg"
          :snackbar="snackbar"
          :timeout="snackbarTimeout"
        />
        <v-flex xs12>
          <v-toolbar>
            <v-toolbar-title>用户管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <user-dialog
                :dialog="dialog"
                :dialogTitle="dialogTitle"
                :id="dialogId"
                :readFlag="dialogReadonly"
                v-on:refresh="needRefresh"
                v-on:msg-tip="childTips"
                v-on:dialog-close="cancelSelected"
              />
              <v-btn @click="showUser" color="primary" flat>
                <v-icon>mdi-account-search</v-icon>
              </v-btn>
              <v-btn @click="addUser" color="success" flat>
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-btn @click="updateUser" color="info" flat>
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <v-btn @click="deleteUserConfirm" color="error" flat>
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
  </v-layout>-->
  <el-card>
    <div slot="header" class="clearfix">
      <span>用户管理</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="dialog=!dialog">添加用户</el-button>
    </div>
    <user-dialog :id="dialogId" :dialog="dialog" :dialogTitle="dialogTitle"></user-dialog>
    <el-row>
      <el-col :span="24">
        <el-table :data="userInfo">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form  label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="用户姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属部门">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="注册时间">
                  <span>{{ props.row.createDate }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ props.row.updateDate }}</span>
                </el-form-item>
                <el-form-item label="排序值">
                  <span>{{ props.row.order }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- <el-table-column type="index"></el-table-column> -->
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="createDate" label="注册日期"></el-table-column>
          <el-table-column prop="updateDate" label="更新日期"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                type="text"
                size="small"
              >移除</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                type="text"
                size="small"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        class="page"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
// @ 是vue自动生成时设置 /src目录的别名
// import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import userDialog from "@/components/userDialog/userDialog.vue";
// import customSnackBar from "@/components/snackBar/customSnackBar.vue";

export default {
  components: {
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
      snackbar: false,
      snackbarColor: "info",
      snackbarTimeout: 1500,
      alertMsg: "",
      selected: [],
      dialogTitle: "用户管理",
      dialogReadonly: false,
      dialog: false,
      dialogId: -1,
      totalCount: 0,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      loading: false,
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
    cancelSelected() {
      // 取消选择的内容
      this.selected = [];
    },

    childTips(tipInfo) {
      this.snackbar = !this.snackbar;
      this.alertMsg = tipInfo.msg;
      this.snackbarColor = tipInfo.type;
    },
    tips(text, type) {
      this.snackbar = !this.snackbar;
      this.alertMsg = text;
      this.snackbarColor = type;
    },
    needRefresh() {
      this.initPagination();
    },
    openUserDialog(title) {
      this.dialogTitle = title;
      this.dialog = !this.dialog;
    },
    showUser() {
      let l = this.selected.length;
      if (l != 1) {
        this.tips("请选择一个待查看的用户", "warning");
      } else if (l == 1) {
        // 获取选中数据ID
        let id = this.selected[0].id;
        this.dialogId = id;
        // 设置弹窗状态为只读
        this.dialogReadonly = true;
        this.openUserDialog("用户信息");
      }
    },
    addUser() {
      this.dialogId = -1;
      this.dialogReadonly = false;
      this.openUserDialog("用户新增");
    },
    updateUser() {
      this.dialogReadonly = false;
      let l = this.selected.length;
      if (l != 1) {
        this.tips("请选择一个待修改的用户", "warning");
      } else if (l == 1) {
        // 获取选中数据ID
        let id = this.selected[0].id;
        this.dialogId = id;
        this.openUserDialog("用户更新");
      }
    },
    deleteUserConfirm() {
      let l = this.selected.length;
      if (l == 0) {
        this.tips("请选择待删除的用户", "warning");
      } else {
        this.$msgbox
          .confirm("此操作将永久删除该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.deleteUser();
            this.cancelSelected();
            this.$msgbox({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            // 清除已经选择的内容
            this.cancelSelected();
          });
      }
    },
    deleteUser() {
      this.$axios
        .post("/api/sys/user/del/batch/", this.selected)
        .then(response => {
          this.selected = [];
          let code = response.data.code;
          if (code === 0) {
            this.initPagination();
            this.tips("删除成功", "success");
          } else {
            this.tips("删除失败", "error");
          }
        })
        .catch(error => {
          this.selected = [];
          this.tips("删除失败，网络异常" + error, "error");
        });
    },
    checkUser() {
      this.openUserDialog("用户信息");
    },
    initPagination() {
      this.pagination.page = 1;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataFromApi();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataFromApi();
    },
    getDataFromApi() {
      this.loading = true;
      this.$axios({
        method: "get",
        url: "/api/sys/user/list/",
        params: {
          limit: this.pageSize,
          offset: this.currentPage - 1
        }
      })
        .then(response => {
          this.loading = false;
          let isEmpty = response.data.data.empty;
          // 查询后清除已经选择的内容
          this.selected = [];
          if (isEmpty) {
            console.log("empty");
          } else {
            this.userInfo = response.data.data.content;
          }
          this.totalCount = response.data.data.totalElements;
        })
        .catch(error => {
          this.loading = false;
          this.tips("查询请求失败, error:" + error, "error");
        });
    }
  }
};
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.page {
  margin-top: 10px;
  float: right;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}
</style>
