<template>
  <v-treeview
    :active.sync="active"
    :items="items"
    :load-children="fetchChild"
    activatable
    active-class="primary--text"
    class="grey lighten-5"
    transition
  ></v-treeview>
</template>
<script>
export default {
  watch: {
    active: function(newActive, oldActive) {
      let data = {
        old: oldActive,
        new: newActive
      };
      this.$emit("tree-click", data);
    }
  },
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      active: [],
      open: [],
      users: []
    };
  },
  methods: {
    fetchChild(item) {
      let url = "/api/sys/org/tree/child";
      let method = "post";
      let data = item;
      let params = {};
      this.$getDataByApi(url, method, data, params)
        .then(response => {
          for (let child in response.data.data) {
            item.children.push(response.data.data[child]);
          }
        })
        .catch(error => {
          this.$msgbox({
              type: "error",
              message: "获取孩子节点失败,原因：" + error
            });
        });
    }
  }
};
</script>
<style scoped>
</style>

