<template>
    <div>
        <el-input autocomplete="off" disabled v-model="parentName">
            <el-button @click="openMenuTree()" slot="append">选择</el-button>
        </el-input>
        <tree-dialog
                :appendToBody="true"
                :checkFlag="false"
                :treeData="treeData"
                :visable.sync="dialogFlag"
                ref="orgTreeDialog"
                v-on:tree-submit="menuTreeSubmit"
        ></tree-dialog>
    </div>
</template>
<script>
    import treeDialog from "@/components/orgTree/treeDialog.vue";

    export default {
        name: "menuInput",
        components: {
            "tree-dialog": treeDialog
        },
        created() {
            this.queryMenuList();
        },
        data() {
            return {
                parentName: "",
                treeData: [],
                dialogFlag: false
            };
        },
        methods: {
            changeMenuName(name) {
                this.parentName = name;
            },
            openMenuTree() {
                this.dialogFlag = !this.dialogFlag;
            },
            queryMenuList() {
                let url = "/api/sys/menu/root";
                this.$getDataByApi(url, "GET")
                    .then(response => {
                        let code = response.data.code;
                        if (code === 0) {
                            this.treeData = response.data.data;
                        }
                    })

            },
            menuTreeSubmit(item) {
                if (item === undefined) {
                    this.parentName = '根菜单';
                } else {
                    this.parentName = item.name;
                    // 抛出事件，传递选择的ID
                    this.$emit("tree-select", item.id);
                }

            }
        }
    };
</script>
<style scoped>
</style>
