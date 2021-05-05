<template>
  <v-container>
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{this.$route.params.message}}
    </v-alert>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="note in notes" :key="note._id">
        <v-card class="pa-1" :to="{name:'note',params:{id:note._id}}">
          <v-img height="250" :src="'/'+note.image"></v-img>
          <v-card-action class="pb-0">
            <v-row class="mt-1">
              <v-col sm="2">
                <v-btn class="ml-4 mt-3" small outlined color="indigo">{{note.category}}</v-btn>
              </v-col>
              <v-col sm=10 class="d-flex justify-end">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <!-- <i class="fa fa-archive" v-bind="attrs" v-on="on" aria-hidden="true" ></i> -->
                    <v-btn v-bind="attrs" v-on="on" aria-hidden="true" icon small fab @click="archiveNote(note._id)"><v-icon>mdi-archive</v-icon></v-btn>
                  </template>
                  <span>Archive</span>
                </v-tooltip>         
                <!-- <v-btn color="primary" plain small>Archive</v-btn> -->
              </v-col>
            </v-row>
          </v-card-action>
          <v-card-title class="headline">{{note.title}}</v-card-title>
          <v-card-text class="py-0">
            <p>{{note.content.substring(0, 100)+"..."}}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
  export default {
    name: 'Home',
    data(){
      return {
        notes:[],
        archiveIcon:"mdi-archive"
      }
    },
    async created(){
      this.notes = await API.getAllNotes(this.$cookie.get('email'));
    },
    methods:{
        async archiveNote(id){
            const response = await API.archiveNote(id);
            this.$router.push({name:'home', params:{message:response.message}});
        }
    }
  }
</script>