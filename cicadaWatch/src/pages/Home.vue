<template>
  <div class="bg-indigo-1">
    <landing  @reactionPanierFavoris="updateLayout" />
    <Publicity/>
  </div>
</template>

<script>
import Landing from 'src/components/Landing/LandingGeneral'
import Publicity from 'src/components/Publicity/Publicity'

export default {
  name: 'Home',
  components: {
    Landing,
    Publicity
  },
  created () {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    updateLayout (motife) {
      console.log('done trasmission')
      if (motife === 'panier') {
        this.nbItemPanier = this.nbItemPanier + 1
      } else if (motife === 'favoris') {
        this.nbItemFavori = this.nbItemFavori + 1
      }
    }
  }
}
</script>
