<template>
    <el-dialog
            :append-to-body="appendToBody"
            :before-close="beforeClose"
            :title="dialogTitle"
            :visible.sync="visable"
            center
            width="20%"
    >
        <m-treeview :checkFlag="checkFlag" :treeData="treeData" ref="subTreeView"
                    v-on:tree-click="treeSelect"></m-treeview>
        <div class="dialog-footer" slot="footer">
            <el-button @click="closeWin">取 消</el-button>
            <el-button @click="treeSubmit" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import treeView from "@/components/treeView/treeView.vue";
    import {isEmptyObject} from "@/plugins/common.js";

    export default {
        components: {
            "m-treeview": treeView
        },
        props: {
            visable: {
                type: Boolean,
                default: false
            },
            dialog: {
                type: Boolean
            },
            appendToBody: {
                type: Boolean,
                default: false
            },
            dialogTitle: {
                type: String,
                default: "组织机构树"
            },
            treeData: {
                type: Array
            },
            checkFlag: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dialogFormVisible: false,
                selected: {}
            };
        },
        watch: {
            dialog() {
                this.selected = {};
                this.dialogFormVisible = true;
            }
        },
        methods: {
            beforeClose() {
                this.closeWin();
            },
            treeSelect(data) {
                // 树节点选择
                this.selected = data;
            },
            treeSubmit() {
                if (this.checkFlag) {
                    this.multi();
                } else {
                    this.single();
                }
            },
            single() {
                // 单选提交
                let data = this.selected;
                if (isEmptyObject(this.selected)) {
                    // 根节点
                    data = undefined;
                }
                // 确定时，传递出选择的树节点
                this.$emit("tree-submit", data);
                // 关闭弹窗
                this.closeWin();
            },
            multi() {
                // 多选提交
                let data = this.$refs["subTreeView"].getCheckedNodes();
                if (this.$isEmptyArray(data)) {
                    this.$alert('请选择数据', '提示');
                } else {
                    // 确定时，传递出选择的树节点
                    this.$emit("tree-submit", data);
                    // 关闭弹窗
                    this.closeWin();
                }
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

