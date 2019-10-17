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
  <div class="col-xs-9 col-sm-9">
    &nbsp;
  </div>
  <div class="col-md-5 col-xs-5 col-sm-5">
    &nbsp;
  </div>
  <div class="col-md-3 col-xs-7 col-sm-7">
    <q-carousel
            arrows
            animated
            swipeable
            infinite
            v-model="slide"
          >
          <div v-for="picture in prod.pictures" :key="picture">
            <q-carousel-slide :name="picture" :img-src="picture">
            </q-carousel-slide>
          </div>
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
window.bus = new Vue()
export default {
  name: 'Product',
  data () {
    return {
      prod: [],
      showImageDialoge: false,
      slide: 1,
      actionProduit: 0
    }
  },
  computed: {
  },
  methods: {
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
    if (this.$route.query && this.$route.query.prod) {
      this.prod = this.$route.query.prod
      console.log('yessssssssssss', this.prod)
    }
  }
}
</script>
