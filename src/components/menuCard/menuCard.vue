<template>
  <el-dialog
    :title="title"
    :visible.sync="visable"
    :before-close="beforeClose"
    :append-to-body="appendBody"
    width="30%"
    center
  >
    <el-form
      :model="form"
      status-icon
      ref="form"
      :rules="rules"
      :label-width="formLabelWidth"
      :disabled="formDisabled"
    >
      <el-form-item label="父菜单">
        <menu-input v-on:tree-select="parentChange" ref="menuInput"/>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单URL" prop="url">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="order">
        <el-input type="number" v-model.number="form.order" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <icon-picker v-on:icon-change="iconChange" ref="iconPicker"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeWin()">取 消</el-button>
      <el-button v-if="editable" type="danger" @click="deleteAlert()">删 除</el-button>
      <el-button type="primary" @click="formSubmit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isEmptyObject } from "@/plugins/common.js";
import iconPicker from "@/components/iconPicker/iconPicker.vue";
import menuInput from "@/components/menuInput/menuInput.vue";
export default {
  name: "menuCard",
  components: {
    "icon-picker": iconPicker,
    "menu-input": menuInput
  },
  props: {
    title: {
      type: String
    },
    visable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    appendBody: {
      type: Boolean,
      default: true
    },
    id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      formDisabled: false,
      isRoot: false,
      form: {
        name: "",
        url: "",
        order: "",
        icon: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "change" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "change"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入菜单url",
            trigger: "change"
          }
        ],
        order: [
          { required: true, message: "排序值不能为空" },
          { type: "number", message: "排序值必须为数字值" }
        ]
      }
    };
  },
  methods: {
    initForm() {
      this.form = {
        name: "",
        url: "",
        order: "",
        icon: ""
      };
      this.form.parent = {};
    },
    deleteAlert() {
      // 删除该组织机构，随后关闭弹窗
      this.$msgbox
        .confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // 删除
          this.deleteMenu();
        })
        .catch(() => {
          // 取消
        });
    },
    deleteMenu() {
      let url = "/api/sys/menu/del/" + this.id;
      this.$getDataByApi(url, "delete")
        .then(response => {
          let resCode = response.data.code;
          if (resCode === 0) {
            this.$notifyMsg(this.$message, "删除成功", "success");
            // 关闭弹窗
            this.$emit("tree-change");
            // 更新menu-input的菜单树
            this.$refs.menuInput.queryMenuList();
            this.closeWin();
          } 
        })
        
    },
    queryMenuInfo() {
      let url = "/api/sys/menu/query/" + this.id;
      this.$getDataByApi(url, "get")
        .then(response => {
          let data = response.data.data;
          if (this.$ajaxSuccess(response)) {
            this.$refs["form"].resetFields();
            this.form.id = this.id;
            if (!isEmptyObject(data.parent)) {
              this.form.parent = data.parent;
              this.$refs.menuInput.changeMenuName(data.parent.name);
            } else {
              this.$refs.menuInput.changeMenuName("根菜单");
            }
            this.form.name = data.name;
            this.form.url = data.url;
            if (data.icon !== "" && data.icon !== undefined) {
              // 更新图标选择器
              this.$refs.iconPicker.iconChange(data.icon);
            }
            this.form.order = data.order;
            this.form.createDate = data.createDate;
          } else {
            this.$notifyMsg(this.$message, "查询菜单信息失败", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(
            this.$message,
            "查询菜单信息失败-网络请求失败:" + error,
            "error"
          );
        });
    },
    addMenu() {
      let url = "/api/sys/menu/add/";
      this.$getDataByApi(url, "post", this.form)
        .then(response => {
          if (this.$ajaxSuccess(response)) {
            // 成功
            this.$notifyMsg(this.$message, "菜单添加成功", "success");
            // 通知父组件需要强制更新
            this.$emit("tree-change");
            // 更新menu-input的菜单树
            this.$refs.menuInput.queryMenuList();
            // 重置menu-input的值
            this.$refs.menuInput.changeMenuName("");
            this.closeWin();
          } else {
            // 失败
            this.$notifyMsg(this.$message, "菜单添加失败", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(
            this.$message,
            "菜单添加失败-网络请求失败:" + error,
            "error"
          );
        });
    },
    updateMenu() {
      let url = "/api/sys/menu/update/";
      this.form.updateBy = 1;
      let reqData = {
        data: this.form,
        updateBy: 0
      };
      this.$getDataByApi(url, "put", reqData)
        .then(response => {
          if (this.$ajaxSuccess(response)) {
            // 成功
            this.$notifyMsg(this.$message, "菜单信息更新成功", "success");
            // 通知父组件需要强制更新
            this.$emit("tree-change");
            // 更新menu-input的菜单树
            this.$refs.menuInput.queryMenuList();
            this.closeWin();
          } else {
            // 失败
            this.$notifyMsg(this.$message, "菜单信息更新失败", "warning");
          }
        })
        .catch(error => {
          this.$notifyMsg(
            this.$message,
            "菜单信息更新失败-网络请求失败:" + error,
            "error"
          );
        });
    },
    formSubmit(formName) {
      let parentEmptyFlag = isEmptyObject(this.form.parent);
      // 提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (parentEmptyFlag && !this.isRoot) {
            this.$notifyMsg(this.$message, "请选择父菜单", "warning");
          } else {
            let sameParentFlag = this.form.parent.id === this.id;
            if (sameParentFlag && !this.isRoot) {
              // 如果不是根节点，并且选择了和自己一样的组织机构，非法
              this.$notifyMsg(this.$message, "请选择正确的父菜单", "warning");
            } else {
              if (this.type === "add") {
                this.addMenu();
              } else {
                this.updateMenu();
              }
            }
          }
        } else {
          return false;
        }
      });
    },
    beforeClose() {
      this.closeWin();
    },
    iconChange(icon) {
      // 图标选择器触发事件
      this.form.icon = icon;
    },
    closeWin() {
      // 子组件通过事件来修改父组件的值，父组件简化为sync
      this.$emit("update:visable", false);
    },
    parentChange(id) {
      // 选择父节点后触发，更新父节点值
      // 初始化 parent对象
      this.form.parent = { id: id };
    }
  },
  computed: {
    editable() {
      return this.type !== "add";
    }
  },
  watch: {
    id() {
      if (this.type === "update") {
        // 查找对应数据
        this.queryMenuInfo();
      } else if (this.type === "add") {
        this.initForm();
      }
    }
  }
};
</script>
<style >
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
