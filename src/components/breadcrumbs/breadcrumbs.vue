<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in items" :key="index.index">
            {{item.name}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    props: {
        items: {
            type: Array
        }
    }
}
</script>
<style scoped>

</style>
