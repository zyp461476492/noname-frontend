<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    <el-form :model="form" status-icon :inline="inline" :rules="rules" ref="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
        <el-input v-model="form.roleName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色代码" :label-width="formLabelWidth" prop="roleCode">
        <el-input v-model="form.roleCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色类型" :label-width="formLabelWidth" prop="roleType">
        <el-input v-model="form.roleType" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" :label-width="formLabelWidth" prop="userType">
        <el-input v-model="form.userType" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="formLabelWidth" prop="dataScope">
        <el-input v-model="form.dataScope" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="form.status" placeholder="角色状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司" :label-width="formLabelWidth">
        <org-input ref="orgInput" v-on:tree-select="orgTreeSelect"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {notifyMsg} from "@/plugins/common.js";
  import orgInput from "@/components/orgInput/orgInput.vue"

  export default {
    name: "roleDialog",
    components: {
      orgInput: orgInput
    },
    mounted() {
    },
    watch: {
      type() {
        if (this.type() === "add") {
          this.$refs["form"].resetFields();
        }
      },
      dialog() {
        this.dialogFormVisible = true;
      },
      id() {
        if (this.id != -1) {
          this.queryRoleInfo();
        } else {
          this.initFormData();
        }
      }
    },
    props: {
      type: {
        type: String
      },
      dialog: {
        type: Boolean,
        default: false
      },
      dialogReadonly: {
        type: Boolean,
        default: false
      },
      dialogTitle: {
        type: String
      },
      id: {
        type: Number,
        default: -1
      },
      inline: {
        type: Boolean,
        default: true,
        required: false
      }
    },
    data() {
      return {
        formLabelWidth: "120px",
        dialogFormVisible: false,
        form: {
          roleCode: "",
          roleName: "",
          roleType: "",
          userType: "user",
          dataScope: "default",
          status: "1",
          remarks: "",
          org: {}
        },
        rules: {
          roleCode: [
            {required: true, message: "请输入角色代码", trigger: "blur"},
            {min: 1, max: 8, message: "长度1-8个字符", trigger: "blur"}
          ],
          roleName: [
            {required: true, message: "请输入角色名", trigger: "blur"},
            {min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur"}
          ],
          roleType: [{required: true, message: "请选择角色类别", trigger: "blur"}],
          userType: [{required: true, message: "请选择用户类别", trigger: "blur"}],
          dataScope: [],
          status: [{required: true, message: "请选择角色状态", trigger: "blur"}],
          remarks: [{required: true, message: "请输入备注", trigger: "blur"}],
          org: []
        }
      };
    },
    computed: {
      updateFlag() {
        if (this.id != -1) {
          return true;
        }
        return false;
      }
    },
    methods: {
      queryRoleInfo() {
        let url = "/api/sys/role/query/" + this.id;
        this.getDataFromApi(url, "get")
          .then(response => {
            let resCode = response.data.code;
            if (resCode === 0) {
              this.$refs["form"].resetFields();
              let roleInfo = response.data.data;
              this.from.roleCode = roleInfo.roleCode;
              this.form.roleName = roleInfo.roleName;
              this.form.roleType = roleInfo.roleType;
              this.form.userType = roleInfo.userType;
              this.form.dataScope = roleInfo.dataScope;
              this.form.status = roleInfo.status;
              this.form.remarks = roleInfo.remarks;
              this.form.org = roleInfo.org;
              this.$refs.orgInput.changeOrgName(roleInfo.org.name);
            } else {
              notifyMsg(this.$message, "查询角色失败", "warning");
            }
          })
          .catch(error => {
            notifyMsg(
              this.$message,
              "查询角色信息-网络请求错误" + error,
              "error"
            );
          });
      },
      initFormData() {
        this.from = {
          roleCode: "A001",
          roleName: "王二狗",
          roleType: "管理员",
          userType: "普通用户",
          dataScope: "default",
          status: "1",
          remarks: "备注",
          org: {}
        };
      },
      notifyParentClose() {
        this.$emit("dialog-close");
      },
      orgTreeSelect(id) {
        this.from.org.id = id;
      },
      notifyParent(){
        this.$emit("refresh");
      },
      notifyParentTips(tipInfo){
        this.$emit("msg-tip", tipInfo);
      },
      getDataFromApi(url, method, data) {
        return this.$axios({
          method: method,
          url: url,
          data: data
        });
      },
      ajaxUpdateRole() {
        let url = "/api/sys/role/update/"
        this.form.id = this.id;
        var reqObj = {
          data: this.form,
          updataBy: 0
        };
        this.getDataFromApi(url, "put",reqObj)
          .then(response => {
            let resCode = response.data.code;
            if (resCode === 0){
              this.notifyParent();
              notifyMsg(this.$message, "更新角色信息成功", "success");
              this.dialogFormVisible = false;
              this.initFormData();
            } else {
              notifyMsg(this.$message, "更新角色信息失败", "warning")
            }
          })
          .catch(erroe => {
            notifyMsg(
              this.$message,
              "更新角色信息--网络请求错误:" + erroe,
              "error"
            );
          });
      },
      ajaxAddRole() {
        let url = "api/sys/role/add";
        this.getDataFromApi(url, "post", this.form)
          .then(response => {
            let resCode = response.data.code;
            if (resCode === 0) {
              this.notifyParent();
              notifyMsg(this.$message, "添加角色成功", "success");
              this.dialogFormVisible = false;
              this.initFormData();
            } else {
              notifyMsg(this.$message, "添加角色失败", "warning")
            }
          })
          .catch(error => {
            notifyMsg(
              this.$message,
              "添加角色--网络请求错误" + error,
              "error"
            );
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.updateFlag) {
              this.ajaxUpdateRole();
            } else {
              this.ajaxAddRole();
            }
          } else {
            return false;
          }
        });
      },
      closeDialog() {
        this.dialogFormVisible = false;
        this.notifyParentClose();
      }
    }
  };
</script>
<style scoped>
</style>