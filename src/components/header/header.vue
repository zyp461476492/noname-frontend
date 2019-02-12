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
          <el-dropdown>
            <div>
              <el-row type="flex" justify="center">
                <p class="avatar-text">张三丰</p>
                <img src="@/components/header/logo.jpg" class="avatar" alt="头像">
              </el-row>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>系统设置</el-dropdown-item>
              <el-dropdown-item>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
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

