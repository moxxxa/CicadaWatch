<template>
  <div>
    <q-list>
        <q-item clickable @click="serviceClient()">
          <q-item-section avatar>
            <q-icon size="50px" name="contact_mail"/>
          </q-item-section>
          <q-item-section>
            <div class="q-pa-md">
              <q-item-label>Service Client</q-item-label>
              <q-item-label caption>Contacter le service client</q-item-label>
            </div>
          </q-item-section>
        </q-item>
            <q-item clickable tag="a" target="about" href="about">
              <q-item-section avatar>
                <q-icon size="50px" name="img:./assets/a_propos.png"/>
              </q-item-section>
              <q-item-section>
                <div class="q-pa-md">
                  <q-item-label>à propos de AUGRADE</q-item-label>
                  <q-item-label caption>Qui somme nous ?</q-item-label>
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="about" href="#/address">
              <q-item-section avatar>
                <q-icon size="50px" name="img:./assets/a_propos.png"/>
              </q-item-section>
              <q-item-section>
                <div class="q-pa-md">
                  <q-item-label>address</q-item-label>
                  <q-item-label caption>Notre adresse</q-item-label>
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
    }
  }
}
</script>
