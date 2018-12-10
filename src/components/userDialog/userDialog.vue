<template>
  <v-dialog v-model="dialogFlag" persistent max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="headline">{{dialogTitle}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs6>
              <v-text-field label="Legal first name*" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field label="Email*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password*" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*表示为必填项目</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialogFlag = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="dialogFlag = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  watch: {
      dialog() {
          this.dialogFlag = true;
      }
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogTitle: "用户管理",
      dialogFlag: false
    };
  }
};
</script>
<style scoped>
</style>
