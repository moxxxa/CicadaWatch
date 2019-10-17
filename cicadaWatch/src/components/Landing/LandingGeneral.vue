<template>
  <q-page>
    <center>
      <!--<q-search v-model="search" />-->
    </center>
  <!--<q-spinner
    v-if="loading"
    color="primary"
    size="3em"
  />-->
    <div class="col-12 flex row justify-center shortcuts">
      <div v-for="link in products" :key="link.name">
        <div class="col-xl-2 col-md-4 col-xs-5 q-ml-lg q-pl-xl q-pr-xl q-pb-xl q-pa-xl">
        <q-card>
          <q-item>
            <q-item-section>
              <q-item-label><center><font color="black"><strong>{{link.name}}</strong></font></center></q-item-label>
            </q-item-section>
          </q-item>
          <q-img
            :src="getPicture(link.pictures[0])"
            @click="goToProduct(link.id)"
            style="height: 250px; max-width: 300px"
          >
          <div class="absolute-bottom custom-caption">
            <div class="text-subtitle3"><center><font><strong>Prix : {{link.price}} Euros</strong></font></center></div>
          </div>
        </q-img>
        <q-list>
        <q-item :disable="checkPanier(link.name)" clickable @click="showNotif('center', 0, 'panier',link)">
          <q-item-section avatar>
            <q-icon color="primary" name="shopping_cart" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Ajouter au panier</q-item-label>
          </q-item-section>
          <q-tooltip
           v-if="checkPanier(link.name)"
           content-class="bg-indigo text-black shadow-4"
           content-style="font-size: 16px"
           :offset="[10, 10]"
           transition-show="rotate"
           transition-hide="rotate">Votre panier contient déja ce produit
         </q-tooltip>
        </q-item>
        <q-item :disable="checkFavoris(link.name)" clickable @click="showNotif('center', 1, 'favoris',link)">
          <q-item-section avatar>
            <q-icon color="red" name="favorite" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ajouter à mes favoris</q-item-label>
          </q-item-section>
          <q-tooltip
           v-if="checkFavoris(link.name)"
           content-class="bg-red text-black shadow-4"
           content-style="font-size: 16px"
           :offset="[10, 10]"
           transition-show="rotate"
           transition-hide="rotate">Votre liste de favoris contient déja ce produit
         </q-tooltip>
        </q-item>
      </q-list>
    </q-card>
  </div>
</div>
    </div>
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="black"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>
<script>
import Vue from 'vue'
window.bus = new Vue()
import { getProducts, API_URL } from '../../../../ApiClient/client'
const alerts = [
  { color: 'blue', textColor: 'white', message: 'Produit ajouter au panier', icon: 'done' },
  { color: 'red', textColor: 'white', message: 'Produit ajouter au favoris', icon: 'favorite' }
]
export default {
  name: 'Landing',
  props: ['shortcuts'],
  created () {
    getProducts().then( response => {
      let data = response
      this.products = data
      console.log('products =', this.products)
    })
    console.log('landing , products =', this.products)
    this.loading = false
    window.bus.$on('removeFromBasket', (id) => {
      this.removeFromBasket(id)
    })
    window.bus.$on('removeFromFavoris', (id) => {
      this.removeFromFavoris(id)
    })
  },
  data  () {
    return {
      panierListe: [],
      favorisListe: [],
      search: '',
      showVideoDialog: false,
      VideoUrl: '',
      loading: true,
      posts: [],
      slide: 'first',
      gameName: '',
      showImageDialoge: false,
      products: []
    }
  },
  methods: {
    getPicture (link) {
      return `${API_URL}${link}`
    },
    removeFromFavoris (id) {
      for (var i = 0; i < this.favorisListe.length; i++) {
        if (this.favorisListe[i].id === id) {
          this.favorisListe.splice(i, 1)
        }
      }
    },
    removeFromBasket (id) {
      for (var i = 0; i < this.panierListe.length; i++) {
        if (this.panierListe[i].id === id) {
          this.panierListe.splice(i, 1)
        }
      }
    },
    goToProduct (id) {
      this.$router.push({ path: 'detail-product', query: { id: id } })
    },
    trigger () {
      const bar = this.$refs.bar

      bar.start()

      this.timer = setTimeout(() => {
        if (this.$refs.bar) {
          this.$refs.bar.stop()
        }
      }, 250)
    },
    checkPanier (productName) {
      for (var i = 0; i < this.panierListe.length; i++) {
        if (this.panierListe[i].name === productName) {
          return true
        }
      }
      return false
    },
    checkFavoris (productName) {
      for (var i = 0; i < this.favorisListe.length; i++) {
        if (this.favorisListe[i].name === productName) {
          return true
        }
      }
      return false
    },
    findMotifInPanierFavoris (product, motife) {
      if (motife === 'panier') {
        if (this.checkPanier(product.name) === false) {
          this.updateListPanierFavoris(product, motife)
          return false
        } else {
          return true
        }
      }
      if (motife === 'favoris') {
        if (this.checkFavoris(product.name) === false) {
          this.updateListPanierFavoris(product, motife)
          return false
        } else {
          return true
        }
      }
      return false
    },
    updateListPanierFavoris (product, motife) {
      if (motife === 'panier') {
        this.panierListe.push(product)
        return true
      }
      if (motife === 'favoris') {
        this.favorisListe.push(product)
      }
    },
    showNotif (position, type, motife, product) {
      if (this.findMotifInPanierFavoris(product, motife) === false) {
        if (motife === 'panier') {
          window.bus.$emit('productAddToPanier', product)
        }
        if (motife === 'favoris') {
          window.bus.$emit('productAddToFavoris', product)
        }
      }
      const { color, textColor, message, icon } = alerts[type]
      this.trigger()
      this.$q.notify({
        color,
        textColor,
        message,
        position,
        icon: icon,
        timeout: 300
      })
    },
    test () {
    }
  },
  computed: {
    links () {
      console.log(this.shortcuts)
      return this.shortcuts
    }
  }
}
</script>
