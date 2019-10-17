<template>
  <div class="q-pa-xs">
    <center><h4>&nbsp;&nbsp;&nbsp;&nbsp;{{prod.name}}</h4></center>
    <div class="flex row">
      <div class="col-md-4 col-xs-3 col-sm-3">
        <div class="col-xs-12 col-sm-12">
          <q-chip icon="category">
            <font size="3">Catégorie :&nbsp;&nbsp;</font><font color="red" size="3">{{prod.category}}</font>
          </q-chip>
        </div>
    <div class="col-md-12 col-xs-12 col-sm-12">
      &nbsp;
    </div>
    <div class="col-md-12 col-xs-12 col-sm-12">
      <q-chip icon="euro">
        <font size="3">Prix :&nbsp;&nbsp;</font><font color="red" size="3">{{prod.price}}</font>
     </q-chip>
  </div>
</div>
  

  <div class="col-md-3 col-xs-8 col-sm-8">
    <q-carousel
      arrows
      animated
      swipeable
      infinite
      transition-prev="jump-right"
      transition-next="jump-left"
      control-color="white"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      v-model="slide"
    >
        <q-carousel-slide v-for="picture in slides" :key="picture.id" :name="picture.id" :img-src="getPicture(picture.image)">
        </q-carousel-slide>
      </span>
    </q-carousel>
  </div>
  <div class="col-md-6 col-sm-12 col-xs-12">
  <q-btn-toggle
    push
    v-model="actionProduit"
    :ripple="{ color: 'black' }"
    toggle-color="black"
    :options="[
      {label: 'Personaliser la montre', icon: 'fas fa-tools', slot: 'workshop', value: 1, color: 'secondary'},
      {label: 'Ajouter au favoris', slot: 'favoris', icon: 'favorite', color: 'pink', value: 2},
      {label: 'Ajouter au panier', slot: 'panier', icon: 'shopping_cart', color: 'primary', value: 3}
    ]"
  >
</q-btn-toggle>
</div>
</div>
<div v-if="actionProduit === 1">
  {{toWorkShop()}}
</div>

<div v-else-if="actionProduit === 2">
  {{ajouterAuFavoris()}}
</div>

<div v-else-if="actionProduit === 3">
  {{ajouterAuPanier()}}
</div>
</div>
</template>
<script>
import Vue from 'vue'
import { API_URL, getProductFromId } from '../../../../ApiClient/client'
window.bus = new Vue()
export default {
  name: 'Product',
  data () {
    return {
      prod: [],
      showImageDialoge: false,
      slide: 1,
      actionProduit: 0,
      idSlide: 0,
      slides: []
    }
  },
  computed: {
  },
  methods: {
    getPicture (link) {
      console.log('dans get pictures')
      const adresse = `${API_URL}${link}`
      console.log('adresse =', adresse)
      return adresse
    },
    ShowImage (imgUrl) {
      this.showImageDialoge = true
      this.currentGameImage = imgUrl
    },
    toWorkShop () {
      this.$router.push({ path: '/workshop', query: { product: this.prod } })
      this.actionProduit = 0
    },
    ajouterAuFavoris () {
      if (this.actionProduit === 2) {
        console.log('favoris')
        window.bus.$emit('productAddToFavoris', this.prod)
        this.actionProduit = 0
      }
    },
    ajouterAuPanier () {
      if (this.actionProduit === 3) {
        console.log('panierrrrrrrrrrrrrr')
        window.bus.$emit('productAddToPanier', this.prod)
        this.actionProduit = 0
      }
    }
  },
  created () {
    if (this.$route.query && this.$route.query.id) {
      getProductFromId(this.$route.query.id).then( response => {
        this.prod = response
        for (var i = 0; i < this.prod.pictures.length; i++) {
          this.slides.push({
            id: i + 1,
            image: this.prod.pictures[i]
          })
        }
        console.log('slides =', this.slides)
        //  this.slide = this.prod.pictures[0]
        console.log('products =', this.products)
      })
    }
  }
}
</script>
