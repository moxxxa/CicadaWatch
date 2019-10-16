<template>
    <q-dialog
      medium-width
      v-model="showpub"
      transition-show="flip-down"
      transition-hide="flip-up"
      >
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section>
          <q-carousel
            animated
            v-model="slide"
            navigation
            swipeable
            padding
            arrows
            infinite
            autoplay
            transition-prev="slide-right"
            transition-next="slide-left"
          >
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg">
            <div class="q-pa-xs text-center">
              <br><br><br><br><br>
                <h6><font color="white">{{ pub1 }}</font></h6>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
            <div class="q-pa-xs text-center">
              <br><br><br><br><br>
                <h6><font color="white">{{pub2}}</font></h6>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="q-pa-xs text-center">
              <br><br><br><br><br>
                <h6><font color="white">{{pub3}}</font></h6>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg">
            <div class="q-pa-xs text-center">
              <br><br><br><br><br>
                <h6><font color="white">{{pub4}}</font></h6>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'Publicity',
  components: {
  },
  data () {
    return {
      pub1: 'pub1',
      pub2: 'pub2',
      pub3: 'pub3',
      pub4: 'pub4',
      slide: 1,
      showpub: false
      //  if not logedIn alors showPresentationDialog
    }
  },
  computed: {
  },
  methods: {
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    turnOnPub () {
      this.showpub = true
    }
  },
  created () {
    /*  setTimeout(() => {
      this.turnOnPub()
    }, 6000)
    */
  }
}
</script>
