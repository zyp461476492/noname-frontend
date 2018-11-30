<template>
  <v-app>
     <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

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
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawerClick"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      
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
      drawer: false,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  }
};
</script>
