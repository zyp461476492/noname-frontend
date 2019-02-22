<template>
  <router-view></router-view>
</template>

<script>
export default {
  created: function() {
    this.$router.push("/login");
  }
};
</script>

<style>
</style>
