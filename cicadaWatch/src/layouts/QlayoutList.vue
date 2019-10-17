<template>
  <div>
    <q-list>
        <q-item clickable @click="serviceClient()">
          <q-item-section avatar>
            <q-icon size="50px" name="contact_mail" color="white"/>
          </q-item-section>
          <q-item-section>
            <div class="q-pa-md">
              <q-item-label><font color="white">Service Client</font></q-item-label>
              <q-item-label caption><font color="white">Contacter le service client</font></q-item-label>
            </div>
          </q-item-section>
        </q-item>
            <q-item clickable tag="a" target="about" href="about">
              <q-item-section avatar>
                <q-icon size="50px" name="perm_identity" color="white"/>
              </q-item-section>
              <q-item-section>
                <div class="q-pa-md">
                  <q-item-label><font color="white">à propos de AUGRADE</font></q-item-label>
                  <q-item-label caption><font color="white">Qui somme nous ?</font></q-item-label>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="gotToAdresse">
              <q-item-section avatar>
                <q-icon size="50px" name="map" color="white"/>
              </q-item-section>
              <q-item-section>
                <div class="q-pa-md">
                  <q-item-label ><font color="white">address</font></q-item-label>
                  <q-item-label caption><font color="white">Notre adresse</font></q-item-label>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
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
    serviceClient () {
      this.switchToclientService = false
      this.$router.push('clientService')
    },
    gotToAdresse () {
      this.$router.push('Address')
    }
  }
}
</script>
