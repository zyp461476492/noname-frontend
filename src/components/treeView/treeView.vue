<template>
    <el-tree
            :data="treeData"
            :expand-on-click-node="false"
            :props="defaultProps"
            :show-checkbox="checkFlag"
            :default-expand-all="expandAll"
            @node-click="handleNodeClick"
            highlight-current
            node-key="id"
            ref="treeObj"
    >

    </el-tree>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            treeData: {
                type: Array
            },
            checkFlag: {
                type: Boolean,
                default: false
            },
            expandAll: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                active: [],
                open: [],
                users: [],
                defaultProps: {
                    children: "children",
                    label: "name"
                }
            };
        },
        methods: {
            modify(data) {
                // 将待修改的数据传递给父组件
                this.$emit("tree-modify", data);
            },
            handleNodeClick(data) {
                // 将被点击的data对象传递出去
                this.$emit("tree-click", data);
            },
            getCheckedNodes() {
                // 返回被选中的节点
                return this.$refs["treeObj"].getCheckedNodes();
            },
            setCheckedNodes(node) {
                this.$refs["treeObj"].setCheckedNodes(node);
            }
        }
    };
</script>
<style scoped>
    .tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

</style>

