<template>
  <div class="bg-indigo-1">
    <landing :shortcuts="shortcuts" @reactionPanierFavoris="updateLayout" />
    <Publicity/>
  </div>
</template>

<script>
import Landing from 'src/components/Landing/LandingGeneral'
import Publicity from 'src/components/Publicity/Publicity'
import HomeShortcuts from 'src/pages/HomeShortcuts.json'

export default {
  name: 'Home',
  components: {
    Landing,
    Publicity
  },
  data () {
    return {

    }
  },
  computed: {
    shortcuts () {
      console.log('shortcuts=', HomeShortcuts)
      return HomeShortcuts
    }
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
