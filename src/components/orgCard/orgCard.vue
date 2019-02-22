<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogFormVisible"
    :before-close="beforeClose"
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
      <el-form-item label="父组织机构">
        <el-input v-model="parentName" autocomplete="off" disabled>
          <el-button slot="append" @click="openOrgTree()">选择</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="组织机构名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="组织机构编码" prop="code">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="组织机构类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="部门" value="0"></el-option>
          <el-option label="公司" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input v-model="form.order" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="组织机构描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <input type="hidden" v-model="form.parent">
    <m-org-tree
      ref="orgTreeDialog"
      :dialog="dialogFlag"
      :appendToBody="true"
      :treeData="treeData"
      v-on:tree-submit="orgTreeSubmit"
    ></m-org-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeWin()">取 消</el-button>
      <el-button v-if="editable" type="danger" @click="deleteAlert()">删 除</el-button>
      <el-button type="primary" @click="formSubmit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isEmptyObject } from "@/plugins/common.js";
import treeDialog from "@/components/orgTree/treeDialog.vue";
export default {
  name: "orgCard",
  components: {
    "m-org-tree": treeDialog
  },
  props: {
    root: {
      type: Boolean,
      default: false
    },
    timeStamp: {
      type: Number
    },
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
  mounted() {
    this.queryTreeRoot();
  },
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFlag: false,
      formDisabled: false,
      parentName: "",
      rootNode: false,
      treeData: [],
      form: {
        parent: {},
        code: "",
        desc: "",
        type: "",
        name: "",
        createDate: 0,
        order: 0
      },
      rules: {
        parentName: [
          { required: true, message: "请选择父组织机构", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入组织机构名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入组织机构编码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择组织机构类型", trigger: "change" }
        ],
        order: [
          { required: true, message: "请输入排序值", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    deleteAlert() {
      // 删除该组织机构，随后关闭弹窗
      this.$msgbox
        .confirm("此操作将永久删除该组织机构, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // 删除
          this.deleteOrg();
        })
        .catch(() => {
          // 取消
        });
    },
    deleteOrg() {
      let url = "/api/sys/org/tree/del/" + this.id;
      this.$getDataByApi(url, "get")
        .then(response => {
          let resCode = response.data.code;
          if (resCode === 0) {
            this.$msg(this.$message, "删除成功", "success");
            // 关闭弹窗
            this.dialogFormVisible = false;
          } else {
            this.$msg(this.$message, "删除失败", "warning");
          }
        })
        .catch(error => {
          this.$msg(
            this.$message,
            "组织机构删除失败-网络请求失败:" + error,
            "error"
          );
        });
    },
    openOrgTree() {
      // 查询树节点
      this.queryTreeRoot();
      this.dialogFlag = !this.dialogFlag;
    },
    initPara() {
      // 初始化参数
      this.$refs["form"].resetFields();
      // 清除 rootNode flag
      this.rootNode = false;
      // 清除parent的值
      this.form = {
        parent: {},
        code: "",
        desc: "",
        type: "",
        name: "",
        createDate: 0,
        order: 0
      };
      this.parentName = "";
    },
    beforeClose(done) {
      done();
    },
    closeWin() {
      this.dialogFormVisible = false;
    },
    queryOrgInfo() {
      let url = "/api/sys/org/tree/query/" + this.id;
      this.$getDataByApi(url, "get")
        .then(response => {
          let resCode = response.data.code;
          let data = response.data.data;
          if (resCode === 0) {
            this.$refs["form"].resetFields();
            this.form.id = this.id;
            if (!isEmptyObject(data.parent)) {
              this.form.parent = data.parent;
              this.parentName = data.parent.name;
            } else {
              this.parentName = "根节点";
            }
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.code = data.code;
            this.form.order = data.order;
            this.form.desc = data.desc;
            this.form.createDate = data.createDate;
            this.rootNode = data.root;
          } else {
            this.$msg(this.$message, "查询组织机构信息失败", "warning");
          }
        })
        .catch(error => {
          this.$msg(
            this.$message,
            "查询组织机构信息失败-网络请求失败:" + error,
            "error"
          );
        });
    },
    appendOrgList() {
      let url = "/api/sys/org/tree/add";
      this.$getDataByApi(url, "post", this.form).then(response => {
        let resCode = response.data.code;
        if (resCode === 0) {
          // 成功
          this.$msg("组织机构添加成功", "success");
          // 通知父组件需要强制更新
          this.$emit("tree-change");
          this.dialogFormVisible = false;
        }
      });
    },
    updateOrg() {
      let url = "/api/sys/org/tree/update";
      let reqData = {
        data: this.form,
        updateBy: 0
      };
      this.$getDataByApi(url, "post", reqData).then(response => {
        let resCode = response.data.code;
        if (resCode === 0) {
          // 成功
          this.$msg("组织机构信息更新成功", "success");
          // 通知父组件需要强制更新
          this.$emit("tree-change");
          this.dialogFormVisible = false;
        }
      });
    },
    queryTreeRoot() {
      let url = "/api/sys/org/tree/root";
      let method = "get";
      let data = {};
      let params = {};
      this.$getDataByApi(url, method, data, params).then(response => {
        let resCode = response.data.code;
        if (resCode === 0) {
          this.treeData = response.data.data;
        }
      });
    },
    orgTreeSubmit(data) {
      this.parentName = data.name;
      this.form.parent.id = data.id;
    },
    formSubmit(formName) {
      let parentEmptyFlag = isEmptyObject(this.form.parent);
      // 提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (parentEmptyFlag && !this.isRoot) {
            this.$msg("请选择父组织机构", "warning");
          } else {
            let sameParentFlag = this.form.parent.id === this.id;
            if (sameParentFlag && !this.isRoot) {
              // 如果不是根节点，并且选择了和自己一样的组织机构，非法
              this.$msg("请选择正确的父组织机构", "warning");
            } else {
              if (this.type === "add") {
                this.appendOrgList();
              } else {
                this.updateOrg();
              }
            }
          }
        } else {
          return false;
        }
      });
    }
  },
  computed: {
    isRoot() {
      return this.root || this.rootNode;
    },
    editable() {
      return this.type !== "add";
    }
  },
  watch: {
    id() {
      if (this.type === "update") {
        // 查找对应数据
        this.queryOrgInfo();
      } else if (this.type === "add") {
        this.initPara();
      }
    },
    dialog() {
      this.dialogFormVisible = true;
    }
  },
  updated() {}
};
</script>
<style scoped>
</style>
