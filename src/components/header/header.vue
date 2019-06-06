<template>
  <div class="">
    <el-row type="flex" class="header headerWrapper">
      <el-col :span="16">
        <div class="logo">
          <el-row type="flex" justify="start">
            <img src="@/components/header/logo.svg" class="logo" alt="logo">
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="end">
            <el-dropdown @command="handleCommand">
            <div>
              <el-row type="flex" justify="center">
                <p class="avatar-text">张三丰</p>
                  <img alt="头像" class="avatar" src="../../components/header/logo.jpg">
              </el-row>
            </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="system">系统设置</el-dropdown-item>
                    <el-dropdown-item command="exit">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
    export default {
        methods: {
            handleCommand(command) {
                if (command === 'exit') {
                    this.$message.warning('注销登录');
                    localStorage.removeItem('JWT_TOKEN');
                    this.$router.push({path: '/'});
                }
            }
        }
    };
</script>

<style scoped>
.headerWrapper {
  position: fixed;
  width: 85%;
  right: 0;
  top: 0;
  z-index: 1500;
}
.header {
  padding: 2px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
}
.avatar-icon {
  line-height: 64px;
}
.avatar-text {
  font-size: 12px;
  text-align: center;
  line-height: 24px;
  margin-right: 2px;
}
</style>

