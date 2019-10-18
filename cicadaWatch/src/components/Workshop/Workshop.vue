<template>
  <span>
    <br><br>
    <span class="flex row">
      <span class="col-xs-3">
        <span class="flex row">
          <span class="col-xs-9">
            &nbsp;
          </span>
          <span class="col-xs-3">
            <q-icon size="md" name="keyboard_arrow_left" @click="switchToleftCeinture"/>
          </span>
          <span class="col-xs-12">
            &nbsp;
          </span>
          <span class="col-xs-12">
            &nbsp;
          </span><span class="col-xs-12">
            &nbsp;
          </span>
          <span class="col-xs-12">
            &nbsp;
          </span>
          <span class="col-xs-12">
            &nbsp;
          </span>
          <span class="col-xs-12">
            &nbsp;
          </span>
          <span class="col-xs-12">
            &nbsp;
          </span>
          <span class="col-xs-12">
            &nbsp;
          </span>
          <span class="col-xs-12">
            <q-icon size="md" name="keyboard_arrow_left" @click="switchToLeftCadran"/>
          </span>
        </span>
        </span>
      <span class="col-xs-5">
        <span class="flex row">
          <span class="col-xs-2">
            &nbsp;
          </span>
          <span class="col-xs-10">
            <q-img
              :src="currentCenituretPictures()"
              style="height: 450px; max-width: 300px"
              />
          </span>
          <span class="col-xs-3">
            &nbsp;
          </span>
          <span class="col-xs-9">
            <q-btn size="md" icon="save" label="Sauvegarder le projet" color="secondary" @click="ProjectName = !ProjectName"/>
          </span>
        </span>
      </span>
  <span class="col-xs-4">
    <span class="flex row">
      <span class="col-xs-1">
        &nbsp;
      </span>
      <span class="col-xs-10">
        <q-icon size="md" name="keyboard_arrow_right" @click="switchToRightCeinture"/>
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-12">
        &nbsp;
      </span>
      <span class="col-xs-10">
        &nbsp;
      </span>
      <span class="col-xs-2">
        <q-icon size="md" name="keyboard_arrow_right" @click="switchToRightCadran"/>
      </span>
    </span>
  </span>
</span>
  <q-img
    :src="currentCadranPictures()"
    style="height: 140px; width: 300px"
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
  </span>
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
      this.products = response
      this.cadransPictures = (data.filter( prod => prod.type === 'cadran')).map( prod => prod.pictures)
      this.braceletsPictures = (data.filter( prod => prod.type === 'bracelet')).map( prod => prod.pictures)
      console.log('braceletsPictures =', this.braceletsPictures)
      console.log('cadransPictures =', this.cadransPictures)
    }).catch (err => {
      console.warn('error=', err)
    })
  },
  data () {
    return {
      cadransPictures: [],
      braceletsPictures: [],
      products: [],
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
        strap: this.numBracelet,
        housing: this.numCadran,
        name: this.WatchName
      }
      console.log('project =', this.project)
      //  createProject(this.project).then( response => {
        this.$q.notify({
          color: 'green-7',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Projet Sauvegarder, vous pouvez le retrouver dans votre profile'
        })
        this.$router.push('/home')
    //        })
    //    }).catch ( err =>{
    //      console.warn('error :', err)
    //    })
    }
  }
}
</script>
