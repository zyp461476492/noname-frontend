<template>
    <tree-view :checkFlag="true" :expand-all="true" :treeData="treeData" ref="subTreeView"></tree-view>
</template>

<script>
    import treeView from "../treeView/treeView";

    export default {
        name: "authorization",
        components: {treeView},
        mounted() {
            this.queryMenuList();
        },
        data() {
            return {
                treeData: []
            }
        },
        methods: {
            setAuthList(list) {
                console.log(list);
                // 设置选中的节点
                this.$refs["subTreeView"].setCheckedNodes(list);
            },
            getAuthList() {
                // 返回当前选中的节点
                return this.$refs["subTreeView"].getCheckedNodes();
            },
            queryMenuList() {
                let url = "/api/sys/menu/root";
                this.$getDataByApi(url, "GET")
                    .then(response => {
                        let code = response.data.code;
                        if (code === 0) {
                            this.treeData = response.data.data;
                            // 等待树节点渲染完成，通知父组件重新设置一遍已选中的节点。
                            // 通知父组件，菜单已初始化完毕，请重新设置一遍已配置的authList
                            this.$emit('updateAuthList');
                        }
                    });
            }
        }
    }
</script>

<style>

</style>