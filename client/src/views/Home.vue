<template>
  <v-container>
    
    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
      {{this.$route.params.message}}
    </v-alert>
    <v-row sm="12" class="ma-3" v-if="pinedNotes.length!=0">
      Pinned Notes
    </v-row>
    <v-divider v-if="pinedNotes.length!=0"></v-divider>
    <v-row v-if="pinedNotes.length!=0" no-gutters>
      <v-col sm="3" class="pa-3" v-for="note in pinedNotes.reverse()" :key="note._id">
        <v-card class="pa-1">

          <v-img height="auto" class="cardover" :src="'/'+note.image"  @click="gotoNote(note._id)"></v-img>

          <v-card-actions class="pb-0 cardover" @click="gotoNote(note._id)">
            <v-row class="mt-1">
              <v-col sm="12">
                <v-btn class="ml-2 mt-2" small outlined color="indigo">{{note.category}}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-title class="headline cardover" @click="gotoNote(note._id)">{{note.title}}</v-card-title>

          <v-card-text class="py-0 cardover" @click="gotoNote(note._id)">
            <p>{{note.content.substring(0, 100)+"..."}}</p>
          </v-card-text>

          <v-card-actions class="white justify-center">

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn  v-bind="attrs" v-on="on" aria-hidden="true" icon @click="unpinNote(note._id)">
                  <v-icon>mdi-pin</v-icon>
                </v-btn>
              </template>
              <span>Unpin</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" aria-hidden="true" icon small fab @click="archiveNote(note._id)">
                  <v-icon>mdi-archive</v-icon>
                </v-btn>
              </template>
              <span>Archive</span>
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

    <v-row sm="12" class="ma-3" v-if="pinedNotes.length!=0">
      Other Notes
    </v-row>
    <v-divider v-if="pinedNotes.length!=0"></v-divider>

    <v-row no-gutters>
      <v-col sm="3" class="pa-3" v-for="note in notes.reverse()" :key="note._id">
        <v-card class="pa-1">

          <v-img height="200px" class="cardover" :src="'/'+note.image" @click="gotoNote(note._id)"></v-img>

          <v-card-actions class="pb-0 cardover"  @click="gotoNote(note._id)">
            <v-row class="mt-1">
              <v-col sm="12">
                <v-btn class="ml-2 mt-3" small outlined color="indigo">{{note.category}}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-title class="headline cardover"  @click="gotoNote(note._id)">{{note.title}}</v-card-title>

          <v-card-text class="py-0 cardover"  @click="gotoNote(note._id)">
            <p>{{note.content.substring(0, 100)+"..."}}</p>
          </v-card-text>

          <v-card-actions class="white justify-center">

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="dark" v-bind="attrs" v-on="on" aria-hidden="true" icon @click="pinNote(note._id)">
                  <v-icon>mdi-pin</v-icon>
                </v-btn>
              </template>
              <span>Pin</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" aria-hidden="true" icon small fab @click="archiveNote(note._id)">
                  <v-icon>mdi-archive</v-icon>
                </v-btn>
              </template>
              <span>Archive</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" aria-hidden="true" icon small fab @click="deleteNote(note._id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>

            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" aria-hidden="true" icon small fab @click.stop="dialog = true">
                  <v-icon>mdi-brush</v-icon>
                </v-btn>
                
              </template>
              <span>Color</span>
            </v-tooltip> -->

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
        pinedNotes:[]
      }
    },
    async created(){
      this.loadNotes();
    },
    methods:{
        async archiveNote(id){
            const response = await API.archiveNote(id);
            this.loadNotes();
        },
        async pinNote(id){
          const response = await API.pinNote(id);
          this.loadNotes();
        },
        async unpinNote(id){
          const response = await API.unpinNote(id);
          this.loadNotes();
        },
        async deleteNote(id){
          const response = await API.deleteNote(id);
          this.loadNotes();
        },
        async gotoNote(id){
          this.$router.push({name:'note', params:{id:id}});
        },
        async loadNotes(){
          this.pinedNotes = await API.getAllPinedNotes(this.$cookie.get('email'));
          this.notes = await API.getAllNotes(this.$cookie.get('email'));
        }
    }
  }
</script>

<style scoped>
.cardover{
  cursor: pointer;
}
</style>