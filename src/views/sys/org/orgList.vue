<template>
  <m-tree-view ></m-tree-view>
</template>
<script>

import treeView from "../../../components/treeView/treeView.vue";
export default {
  components: {
    "m-tree-view": treeView
  },
  data() {
    return {
      items: []
    };
  },
  mounted() {
    
  },
  methods: {
    queryTreeRoot() {
      let url = "/api/sys/org/tree/root";
      let method = "get";
      let data = {};
      let params = {};
      this.$getDataByApi(url, method, data, params)
        .then(response => {
          let rootList = response.data.data;
          this.items = rootList;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
</style>

