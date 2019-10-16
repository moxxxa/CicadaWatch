<template>
  <q-list class="link-decoration">
    <q-item>
        <q-item-section avatar class="q-pa-md">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
      <q-item-section right color="primary">
        <q-btn icon="edit" flat round @click="editProfile = true" color="secondary" />
      </q-item-section>
    </q-item>
    <q-item class="flex-center">
      User name
    </q-item>
    <q-item>
      <q-btn box="rectangle" anchor="center right" self="center left" label="Deconnexion" color="negative"/>
    </q-item>
    <q-dialog v-model="editProfile" content-classes="editprofile-content">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center justify-between">
            <edit-profile @hide="editProfile = false" />
          </q-card-section>
        </q-card>
    </q-dialog>
    </q-list>
</template>

<script>
//  import { mapGetters } from 'vuex';
//  import api from 'src/api';
//  import LogOut from 'src/components/auth/LogOut';
import EditProfile from 'src/components/profile/EditProfile'
export default {
  name: 'ProfileMenus',
  components: {
    //    LogOut,
    EditProfile
  },
  data () {
    return {
      editProfile: false
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.editprofile-content
  min-width: 600px
  min-height: 550px
  max-width: 800px
  max-height: 550px
</style>
