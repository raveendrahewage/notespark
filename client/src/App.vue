<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list v-if="this.email=this.$cookie.get('email')">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="this.$cookie.get('imageUrl')"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>

          <v-list-item-content>
            <v-list-item-title class="title">{{this.name=this.$cookie.get('name')}}</v-list-item-title>
            <v-list-item-subtitle>{{this.email=this.$cookie.get('email')}}</v-list-item-subtitle>
          </v-list-item-content>

          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" dark v-bind="attrs" v-on="on">mdi-menu-down</v-icon>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title @click="logOut" :to="'/'"><GoogleLogin :params="params" :logoutButton=true><v-icon>mdi-logout</v-icon>Log Out</GoogleLogin></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

        </v-list-item>

      </v-list>

      <v-divider v-if="this.email=this.$cookie.get('email')"></v-divider>

      <v-list nav dense v-if="this.email=this.$cookie.get('email')">
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">

            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-container v-if="!(this.email=this.$cookie.get('email'))" fluid pa-0>
        <v-row align="center" justify="center" style="height:100vh" dense>
            <v-col sm="10" class="fill-height d-flex flex-column justify-center align-center">
                <v-card flat tile>You are not loged in. Please Log in.</v-card>
            </v-col>
        </v-row>
    </v-container>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>NotesPark</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import GoogleLogin from 'vue-google-login';
  export default {
    data(){
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-home', link:"/notes" },
          { title: 'New note', icon: 'mdi-note-plus', link:"/add-note" },
          { title: 'Archive', icon: 'mdi-archive', link:"/archived" },
        ]
      }
    },
    components: {
      GoogleLogin
    },
    methods: {
      logOut(){
        this.$cookie.delete('name');
        this.$cookie.delete('imageUrl');
        this.$cookie.delete('email');
        this.$router.push({name:'sign-in'});
      }
    }
  }
</script>

<style scoped>
@import url("https://pro.fontawesome.com/releases/v5.10.0/css/all.css");
</style>
