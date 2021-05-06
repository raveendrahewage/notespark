<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title class="font-weight-medium">Edit This Note</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field v-model="note.title" label="Title" prepend-icon="mdi-note"></v-text-field>
                        <v-text-field v-model="note.category" label="Category" prepend-icon="mdi-view-list"></v-text-field>
                        <v-textarea v-model="note.content" label="Content" prepend-icon="mdi-note-plus"></v-textarea>
                        <v-file-input @change="selectFile" show-size counter multiple label="Select Image"></v-file-input>
                        <v-img :src="'/'+note.image" width="120"></v-img>
                        <v-btn type="submit" class="mt-3" color="success">Update Note</v-btn>
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
    async created(){
        const response = await API.getArchivedNoteById(this.$route.params.id);
        this.note=response;
    },
    methods:{
        selectFile(file){
            this.image=file[0];
        },
        async updateForm(){
            const formData= new FormData();
            formData.append('image',this.image);
            formData.append('email',this.$cookie.get('email'));
            formData.append('title',this.note.title);
            formData.append('category',this.note.category);
            formData.append('content',this.note.content);
            formData.append('old_image',this.note.image);
            formData.append('archived',true);
            formData.append('pined',this.note.pined);
            if(this.$refs.form.validate()){
                const response = await API.updateArchivedNote(this.$route.params.id,formData);
                this.$router.push({name:'archived',params:{message:response.message}});
            }
        }
    }
}
</script>
