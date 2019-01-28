<template>
  <div>
    <el-button :icon="iconClass" @click="btnClick">{{text}}</el-button>
    <icon-panel :visable.sync="visable" v-on:icon-select="iconSelect" v-on:reset="reset"/>
  </div>
</template>
<script>
import iconPanel from "@/components/iconPicker/iconPanel.vue";
export default {
  name: "iconPicker",
  components: {
    "icon-panel": iconPanel
  },
  data() {
    return {
      visable: false,
      text: "选择图标",
      iconClass: ""
    };
  },
  methods: {
    btnClick() {
      this.visable = true;
    },
    iconSelect(item) {
      this.iconClass = item;
      this.text = "";
      // 发出事件，通知选择的值改变
      this.$emit("icon-change", item);
    },
    reset() {
      this.iconClass = "";
      this.text = "选择图标";
      this.$emit("icon-change", "");
    }
  }
};
</script>
<style>
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
