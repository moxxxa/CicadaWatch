<template>
<q-layout>
    <q-toolbar class="text-center">
      <q-toolbar-title>
        Modifier votre profile
      </q-toolbar-title>
    </q-toolbar>
  <form>
    <div class="flex row q-pa-md justify-center">
        <q-field class="col-6 q-mb-md">
          <q-input v-model="profile.name"/>
        </q-field>
    </div>
    <div class="flex row q-pa-md justify-center">
        <q-field  class="col-6 q-mb-md">
          <q-input v-model="profile.prenom"/>
        </q-field>
    </div>
    <div class="flex row col-12 justify-start">
      <password id="password1" autocomplete="new-password" v-model="password1" :toggle="true" :badge="false" placeholder="Mot de passe actuelle"
       @score="onScoreChange" class="col-6 q-mb-md" />
    </div>
    <div class="flex row col-12 justify-start">
      <password id="password2" autocomplete="new-password" v-model="password2" :toggle="true" :badge="false" placeholder="Confirmer le nouveau mot de passe"
       @score="onScoreChange" class="col-6 q-mb-md" />
    </div>
    <div class="flex row q-pa-md justify-center q-gutter-md">
      <q-btn color="negative" label="Annuler" @click="$emit('hide')"/>
      <q-btn color="primary" label="Sauvegarder" @click="saveChanges"/>
    </div>
  </form>
</q-layout>
</template>

<script>
import { required, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import Password from 'vue-password-strength-meter'
import Passwords from './password-settings'
export default {
  name: 'EditProfile',
  components: {
    Password
  },
  props: {
    profile: { type: Array, required: true }
  },
  data () {
    return {
      password1: '',
      password2: '',
      passwordScore: 0,
      profileEdit: {
        nom: 'esgi',
        prenom: 'esgi'
      }
    }
  },
  validations () {
    const validators = {
      profileEdit: {
        nom: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20)
        },
        prenom: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20)
        }
      },
      password1: {},
      password2: {}
    }
    if (this.password1 || this.password2) {
      validators.password1.required = required
      validators.password2.required = required
      validators.password1.minLength = minLength(this.passwordSettings.minLength)
      validators.password1.maxLength = maxLength(this.passwordSettings.maxLength)
      validators.password1.minScore = 2
      validators.password2.sameAs = sameAs('password1')
    }
    return validators
  },
  computed: {
    passwordSettings () {
      return Passwords.settings()
    },
    passwordPlaceholder () {
      return 'password'
    }
  },
  methods: {
    saveChanges () {
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        message: ' Profile mis à jour',
        position: 'center',
        icon: 'done_outline',
        timeout: 500
      })
      this.$emit('hide')
    },
    onScoreChange (score) {
      this.passwordScore = score
    }
  }
}
</script>
