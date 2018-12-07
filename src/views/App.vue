<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" absolute :mini-variant.sync="mini">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="primary">
      <v-toolbar-side-icon @click="drawerClick"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
        <router-link to="/main/userConfig">userConfig</router-link>
      </v-btn>
    </v-toolbar>

    <v-content app>
      <router-view></router-view>
      <!-- <v-layout column warp>
        <v-flex xs12 ma-2>
          <div>
            <v-breadcrumbs :items="itemsDemo">
              <v-icon slot="divider">chevron_right</v-icon>
            </v-breadcrumbs>
          </div>
        </v-flex>
        <v-flex xs12 ma-2> 
          
        </v-flex>
      </v-layout>-->
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    drawerClick: function() {
      this.drawer = !this.drawer;
    }
  },
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      itemsDemo: [
        {
          text: "主页",
          disabled: true,
          href: "系统设置"
        },
        {
          text: "用户管理",
          disabled: false,
          href: "用户管理"
        }
      ]
    };
  }
};
</script>

<style scoped>
.bread-div {
  margin-left: 10px;
}
</style>

