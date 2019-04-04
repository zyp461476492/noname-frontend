<template>
    <el-dialog
            :title="dialogTitle"
            :visible.sync="visable"
            :before-close="beforeClose">
        <el-form :model="form" status-icon :inline="inline" :rules="rules" ref="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                <el-input v-model="form.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色代码" :label-width="formLabelWidth" prop="roleCode">
                <el-input v-model="form.roleCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色类型" :label-width="formLabelWidth" prop="roleType">
                <el-input v-model="form.roleType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" :label-width="formLabelWidth" prop="userType">
                <el-input v-model="form.userType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色权限" :label-width="formLabelWidth" prop="dataScope">
                <el-input v-model="form.dataScope" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色状态" :label-width="formLabelWidth" prop="status">
                <el-select v-model="form.status" placeholder="角色状态">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-tag>标签一</el-tag>
            <el-tag type="success">标签二</el-tag>
            <el-tag type="info">标签三</el-tag>
            <el-tag type="warning">标签四</el-tag>
            <el-tag type="danger">标签五</el-tag>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            <el-button @click="closeWin">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "roleDialog",
        updated() {
            // 根据是否
            console.log("dialog updated");
            console.log(this.id);
            if (!this.visable) {
                // 如果操作类型不是编辑，则清空数据
                if (this.type !== "update") {
                    this.$refs["form"].resetFields();
                }
            }
        },
        watch: {
            id() {
                if (this.id !== -1) {
                    this.queryRoleInfo();
                } else if (this.id === -1) {
                    this.$refs["form"].resetFields();
                }
            }
        },
        props: {
            type: {
                type: String
            },
            visable: {
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
        data() {
            return {
                formLabelWidth: "120px",
                dialogFormVisible: false,
                form: {
                    roleCode: "",
                    roleName: "",
                    roleType: "",
                    userType: "user",
                    dataScope: 1,
                    status: 1,
                    remarks: ""
                },
                rules: {
                    roleCode: [
                        {required: true, message: "请输入角色代码", trigger: "blur"},
                        {min: 1, max: 8, message: "长度1-8个字符", trigger: "blur"}
                    ],
                    roleName: [
                        {required: true, message: "请输入角色名", trigger: "blur"},
                        {min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur"}
                    ],
                    roleType: [
                        {required: true, message: "请选择角色类别", trigger: "blur"}
                    ],
                    userType: [
                        {required: true, message: "请选择用户类别", trigger: "blur"}
                    ],
                    dataScope: [],
                    status: [
                        {required: true, message: "请选择角色状态", trigger: "blur"}
                    ],
                    remarks: [{required: true, message: "请输入备注", trigger: "blur"}]
                }
            };
        },
        computed: {
            updateFlag() {
                return this.id !== -1;
            }
        },
        methods: {
            queryRoleInfo() {
                let url = "/api/sys/role/query/" + this.id;
                this.getDataFromApi(url, "get").then(response => {
                    let resCode = response.data.code;
                    this.$refs["form"].resetFields();
                    if (resCode === 0) {
                        let roleInfo = response.data.data;
                        this.form.roleCode = roleInfo.roleCode;
                        this.form.roleName = roleInfo.roleName;
                        this.form.roleType = roleInfo.roleType;
                        this.form.userType = roleInfo.userType;
                        this.form.dataScope = roleInfo.dataScope;
                        this.form.status = roleInfo.status;
                        this.form.remarks = roleInfo.remarks;
                        this.form.org = roleInfo.org;
                        // this.$refs.orgInput.changeOrgName(roleInfo.org.name);
                    } else {
                        this.closeWin();
                        this.$msg("查询角色失败", "warning");
                    }
                });
            },
            initFormData() {
                this.form = {
                    roleCode: "",
                    roleName: "",
                    roleType: "",
                    userType: "",
                    dataScope: 1,
                    status: 1,
                    remarks: "备注"
                };
            },
            notifyParent() {
                this.$emit("refresh");
            },
            notifyParentTips(tipInfo) {
                this.$emit("msg-tip", tipInfo);
            },
            getDataFromApi(url, method, data) {
                return this.$axios({
                    method: method,
                    url: url,
                    data: data
                });
            },
            ajaxUpdateRole() {
                let url = "/api/sys/role/update/";
                this.form.id = this.id;
                var reqObj = {
                    data: this.form,
                    updataBy: 0
                };
                this.getDataFromApi(url, "put", reqObj).then(response => {
                    let resCode = response.data.code;
                    if (resCode === 0) {
                        this.notifyParent();
                        this.$msg("更新角色信息成功", "success");
                        this.closeWin();
                    } else {
                        this.$msg("更新角色信息失败", "warning");
                    }
                });
            },
            ajaxAddRole() {
                let url = "api/sys/role/add";
                this.getDataFromApi(url, "post", this.form).then(response => {
                    let resCode = response.data.code;
                    if (resCode === 0) {
                        this.notifyParent();
                        this.$msg("添加角色成功", "success");
                        this.closeWin();
                        this.initFormData();
                    } else {
                        this.$msg("添加角色失败", "warning");
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.updateFlag) {
                            this.ajaxUpdateRole();
                        } else {
                            this.ajaxAddRole();
                        }
                    } else {
                        return false;
                    }
                });
            },
            beforeClose() {
                this.closeWin();
            },
            closeWin() {
                // 子组件通过事件来修改父组件的值，父组件简化为sync
                this.$emit("update:visable", false);
            },
        }
    };
</script>
<style scoped>
</style>