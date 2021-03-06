<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :inline="inline" :model="form" :rules="rules" ref="form" status-icon>
            <el-form-item :label-width="formLabelWidth" label="登录名" prop="loginId">
                <el-input autocomplete="off" v-model="form.loginId"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="用户姓名" prop="name">
                <el-input autocomplete="off" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="所属公司">
                <org-input ref="orgInput" v-on:tree-select="orgTreeSelect"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="邮箱" prop="email">
                <el-input autocomplete="off" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="电话" prop="phone">
                <el-input autocomplete="off" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="身份证号" prop="identifyCard">
                <el-input autocomplete="off" v-model="form.identifyCard"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="排序" prop="order">
                <el-input autocomplete="off" v-model="form.order"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="性别" prop="gender">
                <el-select placeholder="请选择性别" v-model="form.gender">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="图标">
                <icon-picker/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="角色设置">
                <el-select multiple placeholder="请选择" v-model="selectList">
                    <el-option
                            :disabled="item.status === 0"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id"
                            v-for="item in roleOption">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button @click="closeDialog()">取 消</el-button>
            <el-button @click="submitForm('form')" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {isEmptyObject} from "../../plugins/common.js";
    import orgInput from "../orgInput/orgInput.vue";
    import iconPicker from "../iconPicker/iconPicker.vue";

    export default {
        name: "userDialog",
        components: {
            orgInput: orgInput,
            iconPicker: iconPicker
        },
        created() {
            this.queryRoleList();
        },
        watch: {
            type() {
                if (this.type === "add") {
                    this.$refs["form"].resetFields();
                }
            },
            dialog() {
                this.dialogFormVisible = true;
            },
            id() {
                if (this.id !== -1) {
                    // 查询用户信息
                    this.queryUserInfo();
                } else {
                    // 设置默认信息
                    this.initFormData();
                }
            }
        },
        props: {
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
        data() {
            let checkId = (rule, value, callback) => {
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (value !== "") {
                    if (!reg.test(value)) {
                        callback(new Error("身份证格式错误"));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checkEmail = (rule, value, callback) => {
                if (value !== "") {
                    let reg = new RegExp(
                        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
                    );
                    if (!reg.test(value)) {
                        callback(new Error("邮箱格式错误"));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checkPhone = (rule, value, callback) => {
                if (value !== "") {
                    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error("手机号格式错误"));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                test: false,
                formLabelWidth: "120px",
                dialogFormVisible: false,
                roleOption: [],
                selectList: [],
                form: {
                    loginId: "",
                    name: "",
                    org: {},
                    roleList: [],
                    phone: "13150337230",
                    email: "1@qq.com",
                    identifyCard: "111111111111111111",
                    gender: "0",
                    order: 0,
                    status: 0,
                    lastLoginIp: "127.0.0.1"
                },
                rules: {
                    loginId: [
                        {required: true, message: "请输入登录名", trigger: "blur"},
                        {min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "请输入用户姓名", trigger: "blur"},
                        {min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur"}
                    ],
                    phone: [
                        {required: false, message: "请输入手机号", trigger: "blur"},
                        {validator: checkPhone, trigger: "blur"}
                    ],
                    email: [
                        {required: false, message: "请输入邮箱", trigger: "blur"},
                        {validator: checkEmail, trigger: "blur"}
                    ],
                    identifyCard: [
                        {required: false, message: "请输入身份证号", trigger: "blur"},
                        {validator: checkId, trigger: "blur"}
                    ],
                    order: [
                        {required: true, message: "请输入排序值", trigger: "blur"},
                        {type: "number", message: "请输入数字", trigger: "blur"}
                    ],
                    gender: [{required: true, message: "请选择性别", trigger: "blur"}],
                    status: []
                }
            };
        },
        computed: {
            updateFlag() {
                return this.id !== -1;
            }
        },
        methods: {
            orgTreeSelect(id) {
                if (id === undefined) {
                    this.form.org = {};
                } else {
                    // 组织机构树被选择
                    this.form.org.id = id;
                }
            },
            initFormData() {
                this.form = {
                    loginId: "",
                    name: "",
                    org: {},
                    phone: "13150337230",
                    email: "1@qq.com",
                    identifyCard: "111111111111111111",
                    gender: "0",
                    order: 0,
                    roleList: [],
                    status: 0,
                    lastLoginIp: "127.0.0.1"
                };
            },
            notifyParentClose() {
                // 通知父组件窗口关闭
                this.$emit("dialog-close");
            },
            notifyParent() {
                // 通知父组件刷新用户列表
                this.$emit("refresh");
            },
            notifyParentTips(tipInfo) {
                this.$emit("msg-tip", tipInfo);
            },
            queryRoleList() {
                let url = "/api/sys/role/all/";
                let method = "GET";
                this.$getDataByApi(url, method, {}, {}).then(response => {
                    let resCode = response.data.code;
                    if (resCode === 0) {
                        this.roleOption = response.data.data;
                    }
                });
            },
            queryUserInfo() {
                let url = "/api/sys/user/query/" + this.id;
                this.getDataFromApi(url, "get")
                    .then(response => {
                        let resCode = response.data.code;
                        if (resCode === 0) {
                            // 清除之前的数据
                            this.$refs["form"].resetFields();
                            // 成功
                            let userInfo = response.data.data;
                            this.form.loginId = userInfo.loginId;
                            this.form.name = userInfo.name;
                            // 设置选择框的值
                            if (!isEmptyObject(userInfo.org)) {
                                this.form.org = userInfo.org;
                                this.$refs.orgInput.changeOrgName(userInfo.org.name);
                            } else {
                                this.form.org = {};
                            }
                            this.form.phone = userInfo.phone;
                            this.form.email = userInfo.email;
                            this.form.identifyCard = userInfo.identifyCard;
                            this.form.gender = userInfo.gender;
                            this.form.order = userInfo.order;
                            this.form.status = userInfo.status;
                            this.form.createDate = userInfo.createDate;
                            this.selectList = this.convertObjToArray(userInfo.roleList);
                        }
                    })

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
                this.form.id = this.id;
                this.form.roleList = this.convertArrayToObj(this.selectList);
                let reqObj = {
                    data: this.form,
                    updateBy: 0
                };
                this.getDataFromApi(url, "post", reqObj)
                    .then(response => {
                        let resCode = response.data.code;
                        if (resCode === 0) {
                            // 成功
                            this.notifyParent();
                            this.$msg("更新用户信息成功", "success");
                            this.dialogFormVisible = false;
                            this.initFormData();
                        }
                    })
            },
            ajaxAddUser() {
                let url = "/api/sys/user/add/";
                this.form.roleList = this.convertArrayToObj(this.selectList);
                this.getDataFromApi(url, "post", this.form)
                    .then(response => {
                        let resCode = response.data.code;
                        if (resCode === 0) {
                            // 成功
                            this.notifyParent();
                            this.$msg("添加用户信息成功", "success");
                            this.dialogFormVisible = false;
                            this.initFormData();
                        }
                    })
            },
            checkLoginId(name) {
                // 后台检查用户名
                if (this.updateFlag) {
                    // 更新时不检测重名
                    return true;
                }
                return name !== "@@@";
            },
            convertArrayToObj(dataList) {
                // 将ID 数组转换为 role 数组
                let objArray = [];
                for (let i = 0; i < dataList.length; i++) {
                    let obj = {};
                    obj.id = parseInt(dataList[i]);
                    objArray.push(obj);
                }
                return objArray;
            },
            convertObjToArray(dataList) {
                // 将 role 数组转换为 id 数组
                let idList = [];
                for (let i = 0; i < dataList.length; i++) {
                    idList.push(dataList[i].id);
                }
                return idList;
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.updateFlag) {
                            this.ajaxUpdateUser();
                        } else {
                            this.ajaxAddUser();
                        }
                    } else {
                        return false;
                    }
                });
            },
            closeDialog() {
                this.dialogFormVisible = false;
                this.notifyParentClose();
            }
        }
    };
</script>
<style scoped>
</style>
