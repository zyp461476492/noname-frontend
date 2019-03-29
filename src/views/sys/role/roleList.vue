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
          <span>角色管理</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addRole()">添加角色</el-button>
        </div>
        <role-dialog
          :id="dialogId"
          :dialog="dialog"
          :dialogTitle="dialogTitle"
          :dialogReadonly="dialogReadonly"
          :type="dialogType"
          v-on:refresh="refresh"
        ></role-dialog>
        <el-row>
          <el-col :span="24">
            <el-table :data="roleInfo">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="角色ID">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="角色代码">
                      <span>{{ props.row.roleCode }}</span>
                    </el-form-item>
                    <el-form-item label="角色名称">
                      <span>{{ props.row.roleName }}</span>
                    </el-form-item>
                    <el-form-item label="角色类型">
                      <span>{{ props.row.roleType }}</span>
                    </el-form-item>
                    <el-form-item label="用户类型">
                      <span>{{ props.row.userType }}</span>
                    </el-form-item>
                    <el-form-item label="角色权限">
                      <span>{{ props.row.dataScope }}</span>
                    </el-form-item>
                    <el-form-item label="角色状态">
                      <span>{{ props.row.status }}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                      <span>{{ props.row.remarks }}</span>
                    </el-form-item>
                    <el-form-item label="公司">
                      <span>{{ props.row.org }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名"></el-table-column>
              <el-table-column prop="roleCode" label="角色代码"></el-table-column>
              <el-table-column prop="roleType" label="角色类型"></el-table-column>
              <el-table-column prop="status" label="角色权限"></el-table-column>
              <el-table-column prop="remarks" label="备注"></el-table-column>
              <el-table-column prop="org" label="公司"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRoleConfirm(scope.$index)"
                    type="text"
                    size="small"
                  >删除</el-button>
                  <el-button
                    @click.native.prevent="updateRole(scope.$index)"
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
import roleDialog from "@/components/roleDialog/roleDialog.vue";
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";

export default {
  components: {
    roleDialog: roleDialog,
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
      dialogTitle: "角色管理",
      dialogReadonly: false,
      dialog: false,
      dialogId: -1,
      dialogType: "add",
      totalCount: 0,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      loading: false,
      roleInfo: [],
      breadcrumbsInfo: [
        {
          name: "系统设置",
          disable: true,
          href: "系统设置"
        },
        {
          name: "角色管理",
          disable: false,
          href: "角色管理"
        }
      ]
    };
  },
  methods: {
    refresh() {
      this.getDataFromApi();
    },
    openRoleDialog(title) {
      this.dialogTitle = title;
      this.dialog = !this.dialog;
    },
    addRole() {
      this.dialogId = -1;
      this.dialogType = "add";
      this.dialogReadonly = false;
      this.openRoleDialog("添加角色");
    },
    updateRole(index) {
      this.dialogReadonly = false;
      let id = this.RoleInfo[index].id;
      this.dialogType = "update";
      this.dialogId = id;
      this.openRoleDialog("编辑角色信息");
    },
    deleteRole(index) {
      let url = "/api/sys/role/del/";
      url += this.roleInfo[index].id;
      this.$axios.delete(url).then(response => {
        this.selected = [];
        let code = response.data.code;
        if (code === 0) {
          this.getDataFromApi();
          this.$msg("删除成功", "success");
        } else {
          this.$msg("删除失败", "error");
        }
      });
    },
    deleteRoleConfirm(index) {
      this.$msgbox
        .confirm("将永久删除此角色,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.deleteRole(index);
        })
        .catch(() => {});
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
      let url = "/api/sys/role/list/";
      let method = "GET";
      let data = {};
      let params = {
        limit: this.pageSize,
        offset: this.currentPage - 1
      };
      this.$getDataByApi(url, method, data, params).then(response => {
        this.loading = false;
        let isEmpty = response.data.data.empty;
        this.selected = [];
        if (isEmpty) {
          console.log("empty");
        } else {
          this.roleInfo = response.data.data.content;
        }
        this.totalCount = response.data.data.totalElements;
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