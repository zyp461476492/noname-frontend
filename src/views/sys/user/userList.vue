<template>
  <v-layout column warp>
    <v-flex xs12 ma-2>
        <breadcrumbs :items="breadcrumbsInfo"></breadcrumbs>
    </v-flex>
    <v-flex xs12 ml-2 mr-2>
      <v-layout column>
        <v-flex xs12>
          <v-toolbar>
            <v-toolbar-title>用户管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn color="success" flat>
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-btn color="info" flat>
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <v-btn color="error" flat>
                <v-icon>mdi-account-remove</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-flex>
        <v-flex xs12 mt-1>
          <v-card>
            <v-data-table :headers="headers" :items="userInfo" class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
// @ 是vue自动生成时设置 /src目录的别名 
import breadcrumbs from "@/components/breadcrumbs/breadcrumbs.vue";
export default {
  components: {
    breadcrumbs: breadcrumbs
  },
  data() {
    return {
      headers: [
        {
          text: "编号",
          value: "index"
        },
        { text: "姓名", value: "name" },
        { text: "部门", value: "dept" },
        { text: "状态", value: "carbs" },
        { text: "注册时间", value: "protein" },
        { text: "更新时间", value: "iron" }
      ],
      userInfo: [
        {
          value: false,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          value: false,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          value: false,
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          value: false,
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          value: false,
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          value: false,
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          value: false,
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          value: false,
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          value: false,
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          value: false,
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ],
      breadcrumbsInfo: [
        {
          text: "系统设置",
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
</style>
