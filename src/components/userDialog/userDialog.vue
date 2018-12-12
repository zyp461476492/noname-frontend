<template>
  <v-dialog v-model="dialogFlag" persistent max-width="400px">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{dialogTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="formData.loginId"
                  :rules="loginIdRules"
                  :counter="16"
                  label="登录名"
                  :readonly="updateFlag ? 'readonly' : false"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="formData.name"
                  :rules="nameRules"
                  :counter="20"
                  label="用户姓名"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="formData.orgId"
                  :rules="deptRules"
                  :counter="20"
                  label="所属公司"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="formData.gender"
                  :rules="genderRules"
                  :items="genderItems"
                  label="性别"
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="formData.email"
                  :rules="emailRules"
                  :counter="20"
                  label="邮箱"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="formData.phone"
                  :rules="phoneRules"
                  :counter="11"
                  label="电话"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="formData.identifyCard"
                  :rules="identifyCardRules"
                  :counter="18"
                  label="身份证号"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field type="text" v-model="formData.order" :counter="2" label="排序" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="closeDialog">关闭</v-btn>
        <v-btn color="blue darken-1" flat @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  mounted() {},
  watch: {
    dialog() {
      // 监听弹窗发生变化时，因为有组件复用的情况，清除表单中的值
      // 后续替换vueliate
      // 默认设置排序值为0
      this.formData.order = 0;
      this.dialogFlag = true;
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
    }
  },
  data() {
    return {
      dialogFlag: false,
      valid: false,
      loginIdRules: [
        v => !!v || "账号不能为空",
        v => this.checkLoginId(v) || "账号名已经存在",
        v => (v && v.length <= 16) || "账号长度应小于等于16个字符"
      ],
      nameRules: [
        v => !!v || "请输入姓名",
        v => (v && v.length <= 20) || "姓名长度应小于20字符"
      ],
      genderRules: [v => !!v || "请选择性别"],
      deptRules: [
        v => !!v || "请输入所属公司"
      ],
      emailRules: [
        v => !!v || "请输入邮箱",
        v => /.+@.+/.test(v) || "非法邮件格式"
      ],
      phoneRules: [
        v => !!v || "请输入手机号",
        v => /^[1][3,4,5,7,8][0-9]{9}$/.test(v) || "手机号格式非法",
        v => (v && v.length <= 11) || "手机号格式非法"
      ],
      identifyCardRules: [
        v =>
          (!!v &&
            /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
              v
            )) ||
          "身份证号格式非法"
      ],
      genderItems: [{ text: "男", value: "0" }, { text: "女", value: "1" }],
      formData: {
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
        // 查询用户信息
        this.queryUserInfo();
        return true;
      }
      return false;
    }
  },
  methods: {
    notifyParent() {
      // 通知父组件刷新用户列表
      this.$emit("refresh");
    },
    queryUserInfo() {
      let url = "/api/sys/user/query/" + this.id;
      this.getDataFromApi(url, "get")
        .then(response => {
          console.log(this);
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
            console.log("添加失败");
          }
        })
        .catch(error => {
          console.log(error);
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
          console.log(this);
          let resCode = response.data.code;
          if (resCode === 0) {
            // 成功
            this.notifyParent();
            this.dialogFlag = false;
            this.$refs.form.reset();
          } else {
            // 失败
            console.log("更新失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    ajaxAddUser() {
      let url = "/api/sys/user/add/";
      this.getDataFromApi(url, "post", this.formData)
        .then(response => {
          console.log(this);
          let resCode = response.data.code;
          if (resCode === 0) {
            // 成功
            this.notifyParent();
            this.dialogFlag = false;
            this.$refs.form.reset();
          } else {
            // 失败
            console.log("添加失败");
          }
        })
        .catch(error => {
          console.log(error);
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
    }
  }
};
</script>
<style scoped>
</style>
