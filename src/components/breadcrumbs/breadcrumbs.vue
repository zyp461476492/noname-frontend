<template>
    <div>
        <v-breadcrumbs :items="items">
          <v-icon slot="divider">chevron_right</v-icon>
        </v-breadcrumbs>
      </div>
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
