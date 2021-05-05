<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <va-card-title class="font-weight-medium">Add New Note</va-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field v-model="note.title" label="Title" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field v-model="note.category" label="Category" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-textarea v-model="note.content" label="Content" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
                        <v-file-input @change="selectFile" :rules="rules" show-size counter multiple label="Select Image"></v-file-input>
                        <v-btn type="submit" class="mt-3" color="primary">Add Note</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api';
export default {
    data() {
        return {
            rules:[(value)=>!!value || "This field is required!"],
            note:{
                title:'',
                category:'',
                content:'',
                image:''
            },
            image:''
        }
    },
    methods:{
        selectFile(file){
            this.image=file[0];
        },
        async submitForm(){
            const formData= new FormData();
            formData.append('image',this.image);
            formData.append('email',this.$cookie.get('email'));
            formData.append('title',this.note.title);
            formData.append('category',this.note.category);
            formData.append('content',this.note.content);
            if(this.$refs.form.validate()){
                const response = await API.addNote(formData);
                this.$router.push({name:'home', params:{message:response.message}});
            }
        }
    }
}
</script>
