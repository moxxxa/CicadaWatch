<template>
  <div>
    <span class="flex row">
      <div class="col-xs-3">
        <div class="flex row">
          <div class="col-xs-12">
            &nbsp;
          </div>
          <div class="col-xs-12">
            &nbsp;
          </div>
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
          <div class="col-xs-2">
            &nbsp;
          </div>
          <div class="col-xs-10">
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
          <div class="col-xs-3">
            &nbsp;
          </div>
          <div class="col-xs-9">
            <q-btn size="lg" icon="save" label="Sauvegarder le projet" color="secondary" @click="ProjectName = !ProjectName"/>
          </div>
        </div>
      </div>
  <div class="col-xs-4">
    <div class="flex row">
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-12">
        &nbsp;
      </div>
      <div class="col-xs-1">
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
      <div class="col-xs-8">
        &nbsp;
      </div>
      <div class="col-xs-4">
        <q-icon size="md" name="keyboard_arrow_right" @click="switchToRightCadran"/>
      </div>
    </div>
  </div>
</span>
  <q-img
    :src="currentCadranPictures()"
    style="height: 230px; width: 450px"
    class="fixed-center"
    />
    <q-dialog v-model="ProjectName" content-classes="editprofile-content">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <font size="5">Saisir un nom pour votre Projet</font>
          </q-card-section>
          <q-card-section>
            <q-input label="Nom du projet" v-model="WatchName"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Merci de renseigner le nom du projet']"
            />
          </q-card-section>
          <q-card-section>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <q-btn color="black" icon="done" label="Valider" :disable="WatchName.length === 0" @click="SaveProject"/>
          </q-card-section>
        </q-card>
    </q-dialog>
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
      numCadran: 0,
      project: null,
      ProjectName: false,
      WatchName: ''
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
      } else {
        this.numBracelet = this.braceletsPictures.length -1
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
      } else {
        this.numCadran = this.cadransPictures.length -1
      }
    },
    currentCenituretPictures () {
      return this.getImage(this.braceletsPictures[this.numBracelet])
    },
    currentCadranPictures () {
      return this.getImage(this.cadransPictures[this.numCadran])
    },
    SaveProject () {
      const strapName = this.braceletsPictures[this.numBracelet].join()
      const housingName = this.cadransPictures[this.numCadran].join()
      console.log('strapName', strapName)
      this.project = {
        strap: strapName,
        housing: housingName,
        name: this.WatchName,
        idBracelet: this.numBracelet,
        idCadran: this.numCadran
      }
      console.log('project =', this.project)
      createProject(this.project).then( response => {
        this.$q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Projet Sauvegarder, vous pouvez le retrouver dans votre profile'
        })
      }).catch ( err =>{
        console.warn('error :', err)
      })
    }
  }
}
</script>
