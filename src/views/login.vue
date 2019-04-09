<template>
    <div @keyup.enter="login" class="login-container">
    <el-card>
      <div slot="header" class="login-header">
        <span>用户登录</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="loginId">
          <el-input placeholder="请输入账号" v-model="form.loginId">
            <template slot="prepend">账号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="请输入密码" v-model="form.pwd">
            <template slot="prepend">密码</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button
      v-loading.fullscreen.lock="loading"
      type="primary"
      class="login-btn"
      size="medium"
      @click="login"
    >登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goTo: function() {
      this.$router.push("/main");
    },
    login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let url = "/api/login/valid";
          this.loading = true;
          this.$getDataByApi(url, "POST", this.form)
            .then(response => {
              if (this.$ajaxSuccess(response)) {
                // 登录成功，保存token至sessionStorage中
                // 跳转至主页
                this.loading = false;
                  localStorage["JWT_TOKEN"] = response.data.data;
                this.$router.push({ path: "/main" });
              } else {
                this.loading = false;
                this.$msg("用户名或密码错误", "error");
              }
            })
        } else {
          this.$msg("请填写正确的信息", "warning");
          return false;
        }
      });
    }
  },
  data: () => ({
    loading: false,
    form: {
      loginId: "",
      pwd: ""
    },
    rules: {
      loginId: [
        { required: true, message: "请输入登录名", trigger: "blur" },
        { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "change" }
      ],
      pwd: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "change" }
      ]
    }
  })
};
</script>
<style scoped>
.login-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 15%;
  width: 30%;
}
.login-header {
  text-align: center;
}
.login-item {
  margin-top: 10px;
}
.login-btn {
  margin-top: 5px;
  width: 100%;
}
</style>
