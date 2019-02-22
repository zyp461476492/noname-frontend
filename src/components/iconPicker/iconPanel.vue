<template>
  <el-dialog
    :title="title"
    :visible.sync="visable"
    :before-close="beforeClose"
    :append-to-body="appendBody"
  >
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(type,index) in iconType" :key="index" :title="type.typeName" :name="type.type">
        <el-scrollbar :native="false" style="height: 300px" :noresize="false">
          <ul class="icon-list">
            <li v-for="(item, index) in iconList[type.type]" :key="index">
              <span>
                <!-- <i :class="item"></i> -->
                <el-button :icon="item.name" @click="iconSelect(item.name)" round/>
                <span class="icon-name">{{item.name | ellipsis}}</span>
              </span>
            </li>
          </ul>
        </el-scrollbar>
      </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeWin">取 消</el-button>
      <el-button type="warning" @click="reset">重 置</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "iconPanel",
  props: {
    visable: {
      type: Boolean,
      default: false
    },
    appendBody: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "图标选择器"
    }
  },
  mounted() {
    // 更新菜单值
    this.queryIconType();
  },
  data() {
    return {
      selectItem: "",
      activeName: "",
      iconType: [],
      iconList: [],
      text: "选择图标",
      icon: ""
    };
  },
  methods: {
    submit() {
      if (this.selectItem !== "") {
        this.$emit("icon-select", this.selectItem);
        // 重置已选择的值
        this.selectItem = "";
        this.closeWin();
      } else {
        this.$notifyMsg(this.$message, "请选择一个图标", "warning");
      }
    },
    reset() {
      // 重置按钮
      this.$emit("reset");
      this.selectItem = "";
      this.closeWin();
    },
    iconSelect(item) {
      this.selectItem = item;
    },
    closeWin() {
      // 子组件通过事件来修改父组件的值，父组件简化为sync
      this.$emit("update:visable", false);
    },
    beforeClose() {
      this.closeWin();
    },
    queryIconType() {
      // 查询所有的ICON类别
      let url = "/api/sys/icon/type";
      this.$getDataByApi(url, "GET")
        .then(response => {
          if (this.$ajaxSuccess(response)) {
            this.iconType = response.data.data;
            // 查询具体的iconList
            for (let i = 0; i < this.iconType.length; i++) {
              this.queryIconList(this.iconType[i].type);
            }
          } 
        })
      
    },
    queryIconList(type) {
      let url = "/api/sys/icon/list";
      let params = { type: type };
      this.$getDataByApi(url, "GET", {}, params)
        .then(response => {
          if (this.$ajaxSuccess(response)) {
            this.iconList[type] = response.data.data;
          } else {
            this.$notifyMsg(
              this.$message,
              "查询图标类别为" + type + "的图标失败",
              "warning"
            );
          }
        })
        .catch(error => {
          this.$notifyMsg(this.$message, "查询图标异常" + error, "error");
        });
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "";
      }
      return value;
    }
  }
};
</script>
<style scoped>
.icon-item {
  text-align: center;
  padding: 2px;
  border: 1px solid #eee;
  border: 1px solid #eee;
}

.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}

.icon-list li {
  float: left;
  width: 16.66%;
  text-align: center;
  height: 120px;
  line-height: 120px;
  color: #666;
  font-size: 13px;
  transition: color 0.15s linear;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;
}

.icon-list li span {
  display: inline-block;
  line-height: normal;
  vertical-align: middle;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  color: #99a9bf;
}

.icon-list li button {
  display: block;
  font-size: 32px;
  margin-bottom: 15px;
  color: #606266;
}

[class^="el-button-"] {
  font-family: element-icons !important;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-name {
  display: inline-block;
  padding: 0 3px;
  height: 1em;
  color: #606266;
}
</style>
