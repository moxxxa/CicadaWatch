<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-pt-xs bg-black">
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
          <q-icon
            name="home"
            @click="goHome"
          >
        </q-icon>
        </q-toolbar-title>
      <q-btn-toggle
        size="sm"
        flat stretch
        toggle-color="white"
        push
        :ripple="{ color: 'black' }"
        v-model="switchToWorkshop"
        :options="[
          {label: 'Atelier', slot: 'workshop', icon: 'fas fa-tools', value: 1},
          {label: 'Favoris', slot: 'Favoris', icon: 'favorite'},
          {label: 'Panier', slot: 'Panier', icon: 'shopping_cart'},
          {label: 'compte', slot: 'Profile', icon: 'perm_identity'}
        ]"
      >
      <template v-slot:Favoris>
          <q-tooltip
            content-class="bg-amber text-black shadow-4"
            content-style="font-size: 16px"
            :offset="[10, 10]"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Consulter vos coups de coeur
        </q-tooltip>
          <q-badge v-if="nbItemFavori > 0" floating color="red">{{nbItemFavori}}</q-badge>
          <q-menu
            anchor="top right"
            self="bottom right"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <div v-if="nbItemFavori === 0" class="q-pa-md text-center">
              <br>
              <q-icon size ="150px" name="favorite_border"  style="color: #DCDCDC;"/>
              <font size="4" style="color: #DCDCDC;"><p>Votre liste des favoris vide</p></font>
            </div>
            <div v-else class="q-pl-md q-pr-md q-pb-md">
              <div><font size="5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
              <div v-for="link in favorisListe" :key="link.id">
              <div class="flex row">
                <q-space/>
                <q-btn icon="delete" flat round dense @click="removeFromFavoris(link)" />
              </div>
              <q-img
                :src="getPicture(link.pictures[0])"
                spinner-color="white"
                style="height: 120px; max-width: 80px"
              />
              <span><font size="2" face="Arial">&nbsp;&nbsp;&nbsp;{{link.name}}</font></span>
              <q-separator/>
              <br>
            </div>
            <q-separator/>
            <br>
          </div>
          </q-menu>
        </template>

        <template v-slot:Panier>
          <q-tooltip
            content-class="bg-amber text-black shadow-4"
            content-style="font-size: 16px"
            :offset="[10, 10]"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Consulter votre Panier
        </q-tooltip>
          <q-badge v-if="nbItemPanier > 0" floating color="red" >{{nbItemPanier}}</q-badge>
          <q-menu
            anchor="top right"
            self="bottom right"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <div v-if="nbItemPanier === 0" class="q-pa-md text-center">
              <br>
              <q-icon size ="150px" name="shopping_basket"  style="color: #DCDCDC;"/>
              <font size="4" style="color: #DCDCDC;"><p>Votre panier est tristement vide</p></font>
            </div>
            <div v-else class="q-pl-md q-pr-md q-pb-md">
              <div><font size="5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
              <div v-for="link in panierListe" :key="link.id">
              <div class="flex row">
                <q-space/>
                <q-btn icon="delete" flat round dense @click="removeFromBasket(link)" />
              </div>
              <q-img
                :src="getPicture(link.pictures[0])"
                spinner-color="white"
                style="height: 120px; max-width: 80px"
              />
              <span><font size="2" face="Arial">&nbsp;&nbsp;&nbsp;{{link.name}}</font></span>
              <div class="row items-center">
                <q-space/>
                <p><strong>{{link.price}}EUR</strong></p>
              </div>
              <q-separator/>
              <br>
            </div>
            <q-separator/>
            <br>
            <div class="row items-center">
               <p><font size="4"><strong>Total</strong></font><font size="1" color="grey">&nbsp;(Hors livraison)</font></p>
               <q-space/>
               <p><font size="4" color="red">{{totalPrice()}}EUR</font></p>
            </div>
            <br>
            <div class="text-center">
              <q-btn
                label="Voir mon panier"
                color="warning"
                @click="voirPanier"
              />
            </div>
          </div>
          </q-menu>
        </template>
        <template
          v-slot:workshop
          >
          <q-tooltip
            content-class="bg-amber text-black shadow-4"
            content-style="font-size: 16px"
            :offset="[10, 10]"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Créer votre montre
          </q-tooltip>
        </template>
        <template v-slot:Profile>
          <q-menu anchor="top right" self="bottom right" content-class="bg-teal-8 text-white">
              <q-list class="link-decoration" v-if="connected">
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
                        <profileEditor @hide="editProfile = false" :profile="user" />
                      </q-card-section>
                    </q-card>
                </q-dialog>
              </q-list>
              <q-list v-else class="link-decoration">
                <q-item>
                  <q-btn box="rectangle" anchor="center right" self="center left" label="Connexion" color="secondary"
                  push
                  size="md"
                  v-close-popup
                  @click="showConnexion = true"
                  />
                </q-item>
                <q-item>
                  <q-btn box="rectangle" anchor="center right" self="center left" label="Inscription" color="secondary"
                  push
                  size="md"
                  v-close-popup
                  @click="showInscription"
                  />
                </q-item>
              </q-list>
          </q-menu>
        </template>
      </q-btn-toggle>
            </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-blue-grey-10"
    >
  <QlayoutList/>
    </q-drawer>
    <div v-if="switchToWorkshop">
      {{workshop()}}
    </div>
    <q-dialog
      medium-width
      v-model="showConnexion"
      transition-show="flip-down"
      transition-hide="flip-up"
      @hide="onDialogHide"
      >
      <connexion/>
    </q-dialog>
    <q-dialog
      :maximized="maximizedToggle"
      v-model="showInscDialog"
      transition-show="flip-down"
      transition-hide="flip-up"
      @hide="onDialogHide"
      >
      <inscription/>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from 'vue'
window.bus = new Vue()
import profileEditor from 'src/components/profile/EditProfile'
import QlayoutList from 'src/layouts/QlayoutList'
import Inscription from 'src/components/Inscription/Inscription'
import Connexion from 'src/components/Connexion/Connexion'
import { API_URL } from '../../../ApiClient/client'
export default {
  name: 'LayoutConnected',
  components: {
    //  ProfileMenus,
    QlayoutList,
    Inscription,
    Connexion,
    profileEditor
  },
  data () {
    return {
      user: [],
      editProfile: false,
      maximizedToggle: true,
      showConnexion: false,
      showInscDialog: false,
      connected: false,
      switchToWorkshop: false,
      nbItemPanier: 0,
      nbItemFavori: 0,
      leftDrawerOpen: false,
      panierListe: [],
      favorisListe: []
    }
  },
  created () {
    /*    window.bus.$on('letIConnect', (userFinal) => {
      this.user = userFinal
      console.log('')
    })
    */
    window.bus.$on('productAddToPanier', (product) => {
      console.log('dans ajout panier')
      if (!this.findPanier(product)) {
        this.nbItemPanier = this.nbItemPanier + 1
        this.panierListe.push(product)
      }
    })
    window.bus.$on('productAddToFavoris', (product) => {
      console.log('dans ajout favoris')
      if (!this.findFavoris(product)) {
        this.nbItemFavori = this.nbItemFavori + 1
        console.log('emited to favori')
        this.favorisListe.push(product)
      }
    })
  },
  methods: {
    workshop () {
      this.$router.push('/workshop')
    },
    getPicture (link) {
      console.log('dans get pictures')
      const adresse = `${API_URL}${link}`
      console.log('adresse =', adresse)
      return adresse
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    showInscription () {
      this.showInscDialog = true
    },
    goHome () {
      this.$router.back()
    },
    findPanier (product) {
      for (var i = 0; i < this.panierListe.length; i++) {
        if (this.panierListe[i].id === product.id) {
          return true
        }
      }
      return false
    },
    findFavoris (product) {
      for (var i = 0; i < this.favorisListe.length; i++) {
        if (this.favorisListe[i].id === product.id) {
          return true
        }
      }
      return false
    },
    voirPanier () {
      this.$router.push({ path: 'Home/panier', query: { liste: this.panierListe } })
    },
    removeFromFavoris (link) {
      for (var i = 0; i < this.favorisListe.length; i++) {
        if (this.favorisListe[i].id === link.id) {
          this.nbItemFavori -= 1
          this.favorisListe.splice(i, 1)
          window.bus.$emit('removeFromFavoris', link.id)
        }
      }
    },
    removeFromBasket (link) {
      for (var i = 0; i < this.panierListe.length; i++) {
        if (this.panierListe[i].id === link.id) {
          this.nbItemPanier -= 1
          this.panierListe.splice(i, 1)
          window.bus.$emit('removeFromBasket', link.id)
        }
      }
    },
    totalPrice () {
      let sum = 0
      for (var i = 0; i < this.panierListe.length; i++) {
        sum = sum + this.panierListe[i].price
      }
      return sum
    }
  }
}
</script>
