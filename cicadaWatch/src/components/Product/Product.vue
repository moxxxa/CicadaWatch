<template>
  <div class="q-pa-xs">
    <center><h4>&nbsp;&nbsp;&nbsp;&nbsp;{{prod.name}}</h4></center>
    <div class="flex row">
      <div class="col-md-4 col-xs-3 col-sm-3">
        <div class="col-xs-12 col-sm-12">
          <q-chip icon="category">
            <font size="2">Catégorie :&nbsp;&nbsp;</font><font color="red" size="3"><bold>{{prod.category}}</bold></font>
          </q-chip>
        </div>
    <div class="col-md-12 col-xs-12 col-sm-12">
      &nbsp;
    </div>
    <div class="col-md-12 col-xs-12 col-sm-12">
      <q-chip icon="attach_money">
        <font size="3">Prix :&nbsp;&nbsp;</font><font color="red" size="3"><bold>{{prod.price}}</bold></font>
     </q-chip>
  </div>
</div>
  <div class="col-md-1 col-xs-2 col-sm-2">
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
          <q-carousel-slide :name="1" :img-src="prod.imageGenarle" @click="ShowImageGame(prod.imageGenarle)">
          </q-carousel-slide>
          <q-carousel-slide :name="2" :img-src="prod.imageSecondary" @click="ShowImageGame(prod.imageSecondary)">
          </q-carousel-slide>
        </q-carousel>
  </div>
<q-dialog medium-width v-model="showImageDialoge" transition-show="flip-down" transition-hide="flip-up">
  <q-card style="width: 400px; max-width: 80vw;">
    <q-card-section class="row items-center justify-between">
    </q-card-section>
    <q-card-section>
      <center>
      <q-img
      style="height: 400px; max-width: 300px"
      :src="currentGameImage"
      />
    </center>
    </q-card-section>
  </q-card>
</q-dialog>
</div>
</div>
</template>
<script>
export default {
  name: 'Product',
  data () {
    return {
      prod: [],
      showImageDialoge: false,
      slide: 1
    }
  },
  computed: {
  },
  methods: {
    ShowImage (imgUrl) {
      this.showImageDialoge = true
      this.currentGameImage = imgUrl
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
