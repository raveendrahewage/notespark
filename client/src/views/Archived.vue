<template>
  <v-container>
    
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{this.$route.params.message}}
    </v-alert>

    <v-row no-gutters>

      <v-col sm="3" class="pa-3 cardover" v-for="note in notes.reverse()" :key="note._id">

        <v-card class="pa-1">
          <v-img height="250" class="cardover" :src="'/'+note.image" @click="gotoNote(note._id)"></v-img>

          <v-card-action class="pb-0 cardover" @click="gotoNote(note._id)">
            <v-row class="mt-1">
              <v-col sm="12">
                <v-btn class="ml-4 mt-3" small outlined color="indigo">{{note.category}}</v-btn>
              </v-col>
            </v-row>
          </v-card-action>

          <v-card-title class="headline cardover" @click="gotoNote(note._id)">{{note.title}}</v-card-title>

          <v-card-text class="py-0 cardover" @click="gotoNote(note._id)">
            <p>{{note.content.substring(0, 100)+"..."}}</p>
          </v-card-text>

          <v-card-actions class="white justify-center">

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" aria-hidden="true" icon small fab @click="unarchiveNote(note._id)">
                  <v-icon>mdi-archive</v-icon>
                </v-btn>
              </template>
              <span>Unarchive</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" aria-hidden="true" icon small fab @click="deleteNote(note._id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>    

          </v-card-actions>

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
      }
    },
    async created(){
      this.loadNotes();
    },
    methods:{
        async unarchiveNote(id){
            const response = await API.unarchiveNote(id);
            this.loadNotes();
        },
        async deleteNote(id){
            const response = await API.deleteNote(id);
            this.loadNotes();
        },
        async gotoNote(id){
          this.$router.push({name:'archived-note', params:{id:id}});
        },
        async loadNotes(){
          this.notes = await API.getArchivedNotes(this.$cookie.get('email'));
        }
    }
  }
</script>

<style scoped>
.cardover{
  cursor: pointer;
}
</style>