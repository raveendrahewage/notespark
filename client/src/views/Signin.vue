<template>
    <v-container fluid pa-0>
        <v-row align="center" justify="center" style="height:100vh" dense>
            <v-col sm="10" class="fill-height d-flex flex-column justify-center align-center">
                <v-card flat tile>
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import GoogleLogin from 'vue-google-login';
  export default {
    data(){
      return {
        drawer: null,
        params: {
          client_id: "329269631654-6ak0bv4172ku9kkm0eiv5c2b7kb4vo56.apps.googleusercontent.com"
        },
        renderParams: {
          width: 250,
          height: 50,
          longtitle: true,
          theme:'dark'
        }
      }
    },
    async created(){
      if(this.$cookie.get('email')!="" && this.$cookie.get('email')!=null){
        this.$router.push({name:'home'});
      }
    },
    components: {
      GoogleLogin
    },
    methods: {
      onSuccess(googleUser) {
        console.log(googleUser);
        console.log(googleUser.getBasicProfile());
        this.$cookie.set('name', googleUser.getBasicProfile().getName(), 1);
        this.$cookie.set('imageUrl', googleUser.getBasicProfile().getImageUrl(), 1);
        this.$cookie.set('email', googleUser.getBasicProfile().getEmail(), 1);
        this.$router.push({name:'home'});
      }
    }
  }
</script>