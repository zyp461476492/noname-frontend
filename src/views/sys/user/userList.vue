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
          <span>用户管理</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addUser()">添加用户</el-button>
        </div>
        <user-dialog
          :id="dialogId"
          :dialog="dialog"
          :dialogTitle="dialogTitle"
          :dialogReadonly="dialogReadonly"
          :type="dialogType"
          v-on:refresh="needRefresh"
        ></user-dialog>
        <el-row>
          <el-col :span="24">
            <el-table :data="userInfo">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="用户ID">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="用户姓名">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属部门">
                      <span>{{ props.row.org.name }}</span>
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
                    @click.native.prevent="deleteUserConfirm(scope.$index)"
                    type="text"
                    size="small"
                  >移除</el-button>
                  <el-button
                    @click.native.prevent="updateUser(scope.$index)"
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
    </el-col>
  </el-row>
</template>

<script>
// @ 是vue自动生成时设置 /src目录的别名
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
import userDialog from "@/components/userDialog/userDialog.vue";
import { notifyMsg } from "@/plugins/common.js";

export default {
  components: {
    userDialog: userDialog,
    "m-breadcrumbs": breadcrumbs
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
      dialogType: "add",
      totalCount: 0,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      loading: false,
      userInfo: [],
      breadcrumbsInfo: [
        {
          name: "系统设置",
          disabled: true,
          href: "系统设置"
        },
        {
          name: "用户管理",
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
      this.dialogType = "add";
      this.dialogReadonly = false;
      this.openUserDialog("用户新增");
    },
    updateUser(index) {
      this.dialogReadonly = false;
      // 获取选中数据ID
      let id = this.userInfo[index].id;
      this.dialogType = "update";
      this.dialogId = id;
      this.openUserDialog("用户更新");
    },
    deleteUserConfirm(index) {
      this.$msgbox
        .confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.deleteUser(index);
        })
        .catch(() => {
          // 取消
        });
    },
    deleteUser(index) {
      let url = "/api/sys/user/del/";
      url += this.userInfo[index].id;
      this.$axios
        .get(url)
        .then(response => {
          this.selected = [];
          let code = response.data.code;
          if (code === 0) {
            this.getDataFromApi();
            notifyMsg(this.$message, "删除成功", "success");
          } else {
            notifyMsg(this.$message, "删除失败", "error");
          }
        })
        .catch(error => {
          notifyMsg(this.$message, "删除失败" + error, "error");
        });
    },
    checkUser() {
      this.openUserDialog("用户信息");
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
          notifyMsg(this.$message, "查询请求失败, error:" + error, "error");
        });
    }
  }
};
</script>

<style>
.breadcrumb {
  margin-bottom: 10px;
}
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
