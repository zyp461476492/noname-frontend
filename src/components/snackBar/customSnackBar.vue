<template>
  <v-snackbar v-model="snackbarFlag" :color="color" :timeout="timeout" :right="true" :top="true">
    {{ text }}
    <v-btn color="white" flat @click="snackbarFlag = false">关闭</v-btn>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "info"
    },
    text: {
      type: String
    },
    snackbar: {
      type: Boolean
    },
    timeout: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      snackbarFlag: false
    };
  },
  watch: {
    snackbar() {
      // 监听弹窗发生变化时，因为有组件复用的情况，清除表单中的值
      // 后续替换vueliate
      // 默认设置排序值为0
      this.snackbarFlag = true;
    }
  }
};
</script>
<style>
</style>
