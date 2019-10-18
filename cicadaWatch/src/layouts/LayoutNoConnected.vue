<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-pt-xs">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <q-img
            src="statics/Logo-Augarde-HD.png"
            style="height: 60px; max-width: 92px"
          >
          </q-img>
        </q-toolbar-title>
        <q-btn-toggle
        flat stretch
        toggle-color="white"
        push
        :ripple="{ color: 'black' }"
        :options="[
          {label: 'Compte', slot: 'Compte', icon: 'account_circle'}
        ]"
      >
        <template v-slot:Compte>
          <q-menu
          transition-show="flip-right"
          transition-hide="flip-left"
          :content-style="{ backgroundColor: '#eee'}"
          >
          <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="q-pa-sm">
              <center>
            <q-btn
              color="secondary"
              label="connexion"
              push
              size="md"
              v-close-popup
              @click="showConnexion = true"
            />
          </center>
          </div>
          <div class="q-pa-sm">
            <center>
            <q-btn
              color="secondary"
              label="S'inscrire"
              push
              size="md"
              v-close-popup
              @click="showInscription"
            />
          </center>
          </div>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="60px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Guest</div>
          </div>
        </div>
        </q-menu>
        </template>
      </q-btn-toggle>
      </q-toolbar>
    </q-header>
    <q-dialog
      :maximized="maximizedToggle"
      v-model="showInscDialog"
      transition-show="flip-down"
      transition-hide="flip-up"
      @hide="onDialogHide"
      >
      <inscription/>
    </q-dialog>
    <q-dialog
      medium-width
      v-model="showConnexion"
      transition-show="flip-down"
      transition-hide="flip-up"
      @hide="onDialogHide"
      >
      <connexion/>
    </q-dialog>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <QlayoutList/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { openURL } from 'quasar'
import Inscription from 'src/components/Inscription/Inscription'
import Connexion from 'src/components/Connexion/Connexion'
import QlayoutList from 'src/layouts/QlayoutList'
export default {
  name: 'LayoutInconnected',
  components: {
    Inscription,
    Connexion,
    QlayoutList
  },
  data () {
    return {
      showConnexion: false,
      leftDrawerOpen: false,
      maximizedToggle: true,
      showInscDialog: false,
      mouseOverLeftHandSide: false
    }
  },
  computed: {
  },
  methods: {
    openURL,
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      this.hide()
    },
    showInscription () {
      this.showInscDialog = true
    },
    onSubmit () {
      this.$q.notify({
        color: 'green-7',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: 'Inscription reussite'
      })
    },
    onReset () {
      this.nom = null
      this.prenom = null
      this.accept = false
    },
    goHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style>
.title {
  cursor: pointer;
}
</style>
