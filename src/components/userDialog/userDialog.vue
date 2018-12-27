<template>
  <el-dialog  :title="dialogTitle" :visible.sync="dialogFormVisible">
    <el-form :model="form"  status-icon :inline="inline">
      <el-form-item label="登录名" :label-width="formLabelWidth">
        <el-input v-model="form.loginId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属公司" :label-width="formLabelWidth">
        <el-input v-model="form.orgId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model="form.gender" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" :label-width="formLabelWidth">
        <el-input v-model="form.identifyCard" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="form.order" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  mounted() {},
  watch: {
    dialog() {
      // 监听弹窗发生变化时，因为有组件复用的情况，清除表单中的值
      // 后续替换vueliate
      // 默认设置排序值为0
      this.form.order = 0;
      this.dialogFormVisible = true;
    },
    id() {
      if (this.id != -1) {
        // 查询用户信息
        this.queryUserInfo();
      } else {
        // 设置默认信息
        this.initFormData();
      }
    }
  },
  props: {
    dialog: {
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
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        loginId: "",
        name: "",
        orgId: "",
        phone: "13150337230",
        email: "1@qq.com",
        identifyCard: "111111111111111111",
        gender: "0",
        order: 0,
        status: 0,
        lastLoginIp: "127.0.0.1"
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
    initFormData() {
      this.formData = {
        loginId: "",
        name: "",
        orgId: "",
        phone: "13150337230",
        email: "1@qq.com",
        identifyCard: "111111111111111111",
        gender: "0",
        order: 0,
        status: 0,
        lastLoginIp: "127.0.0.1"
      };
    },
    buildTipInfo(msg, type) {
      return {
        msg: msg,
        type: type
      };
    },
    notifyParentClose() {
      // 通知父组件窗口关闭
      this.$emit("dialog-close");
    },
    notifyParent() {
      // 通知父组件刷新用户列表
      this.$emit("refresh");
    },
    notifyParentTips(tipInfo) {
      this.$emit("msg-tip", tipInfo);
    },
    queryUserInfo() {
      let url = "/api/sys/user/query/" + this.id;
      this.getDataFromApi(url, "get")
        .then(response => {
          let resCode = response.data.code;
          if (resCode === 0) {
            // 成功
            let userInfo = response.data.data;
            this.formData.loginId = userInfo.loginId;
            this.formData.name = userInfo.name;
            this.formData.orgId = userInfo.orgId;
            this.formData.phone = userInfo.phone;
            this.formData.email = userInfo.email;
            this.formData.identifyCard = userInfo.identifyCard;
            this.formData.gender = userInfo.gender;
            this.formData.order = userInfo.order;
            this.formData.status = userInfo.status;
            this.formData.createDate = userInfo.createDate;
          } else {
            // 失败
            this.notifyParentTips(
              this.buildTipInfo("查询用户信息失败", "warning")
            );
          }
        })
        .catch(error => {
          this.notifyParentTips(
            this.buildTipInfo("查询用户信息-网络请求失败:" + error, "error")
          );
        });
    },
    getDataFromApi(url, method, data) {
      return this.$axios({
        method: method,
        url: url,
        data: data
      });
    },
    ajaxUpdateUser() {
      let url = "/api/sys/user/update/";
      this.formData.id = this.id;
      var reqObj = {
        data: this.formData,
        updateBy: 0
      };
      this.getDataFromApi(url, "post", reqObj)
        .then(response => {
          let resCode = response.data.code;
          if (resCode === 0) {
            // 成功
            this.notifyParent();
            this.notifyParentTips(
              this.buildTipInfo("更新用户信息成功", "success")
            );
            this.dialogFlag = false;
            this.$refs.form.reset();
          } else {
            // 失败
            this.notifyParentTips(
              this.buildTipInfo("更新用户信息失败", "warning")
            );
          }
        })
        .catch(error => {
          this.notifyParentTips(
            this.buildTipInfo("更新用户信息-网络请求失败:" + error, "error")
          );
        });
    },
    ajaxAddUser() {
      let url = "/api/sys/user/add/";
      this.getDataFromApi(url, "post", this.formData)
        .then(response => {
          let resCode = response.data.code;
          if (resCode === 0) {
            // 成功
            this.notifyParent();
            this.notifyParentTips(
              this.buildTipInfo("添加用户信息成功", "success")
            );
            this.dialogFlag = false;
            this.initFormData();
          } else {
            // 失败
            this.notifyParentTips(
              this.buildTipInfo("添加用户信息失败", "warning")
            );
          }
        })
        .catch(error => {
          this.notifyParentTips(
            this.buildTipInfo("添加用户信息-网络请求失败:" + error, "error")
          );
        });
    },
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        if (this.updateFlag) {
          this.ajaxUpdateUser();
        } else {
          this.ajaxAddUser();
        }
      }
      // this.$refs.form.reset();
    },
    checkLoginId(name) {
      // 后台检查用户名
      if (this.updateFlag) {
        // 更新时不检测重名
        return true;
      }
      return name !== "@@@";
    },
    closeDialog() {
      this.dialogFlag = false;
      this.notifyParentClose();
    }
  }
};
</script>
<style scoped>
</style>
