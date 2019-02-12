<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    <el-row>
      <el-col :span="8">
        <tree-view ref="treeView" :treeData="treeData" v-on:tree-click="treeClick"></tree-view>
      </el-col>
      <el-col :span="14">
        <el-table
          height="200px"
          :data="userList"
          ref="userTable"
          highlight-current-row
          @current-change="userListCurrentChange"
        >
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="org.name" label="归属机构"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog()">关 闭</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
/**
 * 用户选择 树形组件
 */
import treeView from "@/components/treeView/treeView.vue";
import { isEmptyObject } from "@/plugins/common.js";
export default {
  name: "userTree",
  props: {
    dialogTitle: {
      type: String
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    treeView: treeView
  },
  mounted() {
    this.queryTreeRoot();
  },
  data() {
    return {
      dialogFormVisible: false,
      userList: [],
      treeData: [],
      chooseUser: {}
    };
  },
  methods: {
    initData() {
      this.userList = [];
      this.chooseUser = {};
    },
    submit() {
      if (isEmptyObject(this.chooseUser)) {
        this.$alert("请选择一个用户");
      } else {
        this.$emit("user", this.chooseUser);
        this.dialogFormVisible = false;
      }
    },
    closeDialog() {
      this.initData();
      this.dialogFormVisible = false;
    },
    treeClick(data) {
      this.queryUserList(data.id);
    },
    userListCurrentChange(currentRow) {
      this.chooseUser = currentRow;
    },
    queryUserList(orgId) {
      // 查询orgid对应的人员信息
      let url = "/api/sys/user/org/" + orgId;
      this.$getDataByApi(url, "get")
        .then(response => {
          let code = response.data.code;
          if (code === 0) {
            this.userList = response.data.data;
          } else {
            this.$notifyMsg(this.$message, "查询失败", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(this.$message, "查询失败" + error, "error");
        });
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
          } else {
            this.$notifyMsg(this.$message, "没有查询到数据", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(
            this.$message,
            "查询组织机构信息失败-网络请求失败:" + error,
            "error"
          );
        });
    }
  },
  watch: {
    dialog() {
      this.initData();
      this.dialogFormVisible = true;
    }
  }
};
</script>
<style scoped>
</style>
