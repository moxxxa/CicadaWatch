<template>
  <div>
    <div class="flex row">
      <div class="col-xs-3">
        &nbsp;
      </div>
      <div class="col-xs-7">
        <h4><font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atelier Augarde</font></h4>
      </div>
    </div>
    <br><br><br>
    <div class="flex row">
      <div class="col-xs-3">
        <div class="flex row">
          <div class="col-xs-9">
            &nbsp;
          </div>
          <div class="col-xs-3">
            <q-icon size="md" name="keyboard_arrow_left" @click="switchToleftCeinture"/>
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-5">
            &nbsp;
          </div>
          <div class="col-xs-7">
            <q-icon size="md" name="keyboard_arrow_left" @click="switchToLeftCadran"/>
          </div>
        </div>
        </div>
      <div class="col-xs-5">
        <div class="flex row">
          <div class="col-xs-2">
            &nbsp;
          </div>
          <div class="col-xs-10">
            <q-img
              :src="currentCenituretPictures()"
              style="height: 650px; max-width: 300px"
              />
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-3">
            &nbsp;
          </div>
          <div class="col-xs-9">
            <q-btn size="lg" icon="save" label="Sauvegarder le projet" color="secondary" @click=""/>
          </div>
        </div>
      </div>
  <div class="col-xs-4">
    <div class="flex row">
      <div class="col-xs-2">
        &nbsp;
      </div>
      <div class="col-xs-10">
        <q-icon size="md" name="keyboard_arrow_right" @click="switchToRightCeinture"/>
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-6">
        &nbsp;
      </div>
      <div class="col-xs-6">
        <q-icon size="md" name="keyboard_arrow_right" @click="switchToRightCadran"/>
      </div>
    </div>
  </div>
  </div>
  <q-img
    :src="currentCadranPictures()"
    style="height: 210px; width: 450px"
    class="fixed-center"
    />
  </div>
</template>
<script>
import { getProducts, API_URL, createProject } from '../../../../ApiClient/client'

export default {
  name: 'Home',
  components: {
  },
  created () {
    getProducts().then( response => {
      let data = response
      this.cadransPictures = (data.filter( prod => prod.type === 'cadran')).map( prod => prod.pictures)
      this.braceletsPictures = (data.filter( prod => prod.type === 'bracelet')).map( prod => prod.pictures)
      console.log('braceletsPictures =', this.braceletsPictures)
      console.log('cadransPictures =', this.cadransPictures)
    })
  },
  data () {
    return {
      cadransPictures: [],
      braceletsPictures: [],
      numBracelet: 0,
      numCadran: 0
    }
  },
  computed: {

  },
  methods: {
    getImage(link) {
      const adresse = `${API_URL}${link}`
      console.log(adresse)
      return adresse
    },
    switchToleftCeinture () {
      if (this.numBracelet > 0) {
        this.numBracelet -= 1
      }
    },
    switchToRightCeinture () {
      if (this.numBracelet < this.braceletsPictures.length -1) {
        this.numBracelet += 1
      } else {
        this.numBracelet = 0
      }
    },
    switchToRightCadran () {
      if (this.numCadran < this.cadransPictures.length -1) {
        this.numCadran += 1
      } else {
        this.numCadran = 0
      }
    },
    switchToLeftCadran () {
      if (this.numCadran > 0) {
        this.numCadran -= 1
      }
    },
    currentCenituretPictures () {
      return this.getImage(this.braceletsPictures[this.numBracelet])
    },
    currentCadranPictures () {
      return this.getImage(this.cadransPictures[this.numCadran])
    }
  }
}
</script>
