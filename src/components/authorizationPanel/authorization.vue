<template>
    <tree-view :checkFlag="true" :treeData="treeData" ref="subTreeView"></tree-view>
</template>

<script>
    import treeView from "../treeView/treeView";

    export default {
        name: "authorization",
        components: {treeView},
        created() {
            this.queryMenuList();
        },
        data() {
            return {
                treeData: [],
                gutter: 20,
                dialogFlag: false
            };
        },
        methods: {
            setAuthList(list) {
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
                            // 通知父组件，菜单已初始化完毕，请重新设置一遍已配置的authList
                            this.$emit('updateAuthList');
                        }
                    });
            },
            menuTreeSubmit(item) {
                this.gutter = 20;
                if (item !== undefined) {
                    let len = item.length;
                    if (len <= 3) {
                        this.gutter = 80;
                    }
                }
                this.authList = item;
            }
        }
    }
</script>

<style scoped>

</style>