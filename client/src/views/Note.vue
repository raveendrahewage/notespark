<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img :src="'/'+note.image"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn small outlined color="primary">{{note.category}}</v-btn>
                            </v-col>
                            <v-col sm=10 class="d-flex justify-end">
                                <v-btn color="success" text :to="{name:'edit-note',params:{id:note._id}}">Edit</v-btn>              
                                <v-btn color="red" text dark @click.stop="dialog = true">Delete</v-btn>             
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{note.title}}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p>{{note.content}}</p>
                        <p>{{note.created}}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialog" max-width="350">
                <v-card>
                    <v-card-title class="headline">Note will be deleted<br>permenently. Is it ok?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="darken-1" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="green darken-1" text @click="deleteNote(note._id)">Ok</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api';

export default{
    data() {
        return{
            note:{},
            dialog: false,
        }
    },
    async created(){
        const response = await API.getNoteById(this.$route.params.id);
        console.log("xxxx "+this.$route.params.id);
        console.log(response);
        this.note=response;
    },
    methods:{
        async deleteNote(id){
            const response = await API.deleteNote(id);
            this.$router.push({name:'home', params:{message:response.message}});
        }
    }
}
</script>
