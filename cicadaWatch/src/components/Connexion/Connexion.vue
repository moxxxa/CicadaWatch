<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6 text-center">Connexion</div>
    </q-card-section>
    <q-form class="q-gutter-md">
    <q-card-section>
        <center>
          <q-input
            v-model="email"
            label="Adresse mail"
            lazy-rules
            :rules="[ val => val && val.length > 2 || 'Veuillez entrer une adresse mail valide']"
            class="zip-input"
            type="email"
          />
        </center>
        <center>
          <q-input
            v-model="mdp"
            label="Mote de passe"
            lazy-rules
            :rules="[ val => val && val.length >2 || 'votre mot de passe est incorrecte']"
            class="zip-input"
            type="password"
          />
        </center>
      </q-card-section>
      <q-card-section class="justify-center">
        <div class="text-center">
          <q-btn
            color="secondary"
            label="connexion"
            push
            size="md"
            v-close-popup
            @click="login"
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script>
import Vue from 'vue'
window.bus = new Vue()
//  import webService from '../../../web-service'
import { authenticate, API_URL } from '../../../../ApiClient/client'
export default {
  name: 'Connexion',
  data () {
    return {
      email: '',
      mdp: '',
      connected: false
    }
  },
  methods: {
    login () {
        let email = this.email;
        let password = this.mdp;
        authenticate(email, password)
        .then(response => {
          let data = response
          if(data.success == true) {
            sessionStorage.setItem('user', data.user)
            console.log("connexion ok", data.user)
            sessionStorage.setItem('connected',"true")
            location.href = 'home' 
          } else {
            sessionStorage.setItem('connected', "false")
            console.log("error password")
            this.$q.notify({
            color: 'red-7',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Invalid credentials'
          })
          }
        }, () => {
          this.$q.notify({
            color: 'red-7',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Invalid credentials'
          })
        })
    },
  }
}
</script>
<style lang="stylus">
</style>