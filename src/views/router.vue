<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  created: function () {
      this.$router.push("/main");
  }
};
</script>