<template>
  <div>
    <q-header elevated class="bg-white">
        <q-toolbar class="row">
          <q-toolbar-title class="col-md-2 col-xs-4" @click="goHome">
            <q-img
              src="statics/Logo-Augarde-HD.png"
              style="height: 60px; max-width: 92px"
            >
            </q-img>
          </q-toolbar-title>
          <span class="col-md-2"/>
          <span class="col-md-6 col-xs-8 col-sm-11">
            <q-stepper
              v-model="step"
              header-nav
              ref="stepper"
              color="primary"
              animated
              flat
              alternative-labels
            >
              <q-step
                :name="1"
                title="Panier"
                :done="step > 1"
                icon="shopping_basket"
              >
            </q-step>
            <q-step
              :name="2"
              :done="done1"
              title="Validation"
              icon="local_shipping"
            >
          </q-step>
        </q-stepper>
          </span>
        </q-toolbar>
      </q-header>
      <div v-if="step === 1" class="q-pa-md bg-indigo-1">
        <br><br>
        <div class="row">
          <div class="col-md-9 col-xs-12 col-sm-12">
            <div class="row">
              <div class="col-md-1 col-xs-1 col-sm-1">
                &nbsp;
              </div>
              <div class="col-md-11 col-xs-11 col-sm-11">
                <p><font size="4">PANIER ({{panierListe.length}} PRODUIT)</font></p>
              </div>
              <div class="col-md-12 col-xs-12 col-sm-12">
                &nbsp;
              </div>
              <div class="col-md-12 col-xs-12 col-sm-12" v-for="link in panierListe" :key="link">
                <div class="row">
              <div class="col-md-1 col-xs-1 col-sm-1">
              </div>
              <div class="col-md-10 col-xs-10 col-sm-10">
                <q-card>
                  <q-card-section class="row">
                    <span class="col-md-1">
                    </span>
                    <span class="col-md-2 col-xs-3 col-sm-3">
                      <q-img
                        :src="link.imageGenarle"
                        spinner-color="white"
                        style="height: 120px; max-width: 80px"
                      />
                    </span>
                    <span class="col-md-5 col-xs-4 col-sm-4">
                      <span class="row">
                        <span class="col-md-12 col-xs-12 col-sm-12">
                          <font size="2" face="Arial">&nbsp;&nbsp;&nbsp;{{link.name}}</font>
                        </span>
                        <span class="col-md-12 col-xs-12 col-sm-12">
                          <font size="2" face="Arial" color="grey">&nbsp;&nbsp;&nbsp;{{link.category}}</font>
                        </span>
                        <span class="col-md-12 col-xs-12 col-sm-12">
                          <font size="2" face="Arial" color="green">&nbsp;&nbsp;&nbsp;<q-icon name="done" color="green"/><strong>En Stock</strong></font>
                        </span>
                      </span>
                    </span>
                    <span class="col-md-4 col-xs-4 col-sm-4">
                      <span class="row">
                        <span class="col-md-5 col-xs-4 col-sm-4">
                          &nbsp;
                        </span>
                        <span class="col-md-5 col-xs-4 col-sm-4">
                          &nbsp;&nbsp;&nbsp;<strong>{{getPrice(link.id)}}EUR</strong>
                        </span>
                        <span class="col-md-12 col-xs-12 col-sm-12">
                          &nbsp;
                        </span>
                        <span class="col-md-12 col-xs-12 col-sm-12">
                          &nbsp;
                        </span>
                        <span class="col-md-12 col-xs-12 col-sm-12">
                          &nbsp;
                        </span>
                        <span class="col-md-6 col-xs-6 col-sm-6">
                          &nbsp;
                        </span>
                        <span class="col-md-3 col-xs-5 col-sm-4">
                          <q-input rounded standout v-model.number="finalPrice[getIndice(link.id)].amount" readonly/>
                        </span>
                        <span class="col-md-3 col-xs-3 col-sm-3">
                          &nbsp;
                        </span>
                        <span class="col-md-2 col-xs-2 col-sm-2">
                          &nbsp;
                        </span>
                        <span class="col-md-10 col-xs-10 col-sm-10">
                          <span class="row">
                            <span class="col-md-1 col-xs-1 col-sm-1">
                              &nbsp;
                            </span>
                            <span class="col-md-1 col-xs-1 col-sm-1">
                              <q-btn
                              icon="remove"
                              size="sm"
                              color="warning"
                              rounded
                              @click="removeUnit(link.id)"
                            />
                          </span>
                          <span class="col-md-3 col-xs-4 col-sm-4">
                            &nbsp;
                          </span>
                          <span class="col-md-4 col-xs-4 col-sm-4">
                          </span>
                          <span class="col-md-1 col-xs-1 col-sm-1">
                            <q-btn
                              icon="add"
                              size="sm"
                              color="warning"
                              rounded
                              @click="addUnit(link.id)"
                            />
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="col-md-2 col-xs-2 col-sm-4">
                    <q-btn icon="delete" flat round dense @click="removeFromBasket(link)" />
                  </span>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-md-1 col-xs-1 col-sm-1">
                &nbsp;
              </div>
          </div>
          <br>
        </div>
          </div>
            </div>
          <div class="col-md-3 col-xs-12 col-sm-12">
            <div class="row">
              <div class="col-md-12 col-xs-12 col-sm-12">
                <p><font size="4">RECAPITULATIF</font></p>
              </div>
              <div class="col-md-12 col-xs-12 col-sm-12">
                <q-card>
                  <q-card-section class="row">
                    <span class="col-md-9 col-xs-9 col-sm-9">
                      Panier ({{panierListe.length}})
                    </span>
                    <span class="col-md-3 col-xs-3 col-sm-3">
                      Prix
                    </span>
                  </q-card-section>
                  <q-separator/>
                  <q-card-section class="row">
                    <span class="col-md-9 col-xs-9 col-sm-9">
                      Retrait <font color="red">gratuit</font> en magasin
                    </span>
                  </q-card-section>
                  <q-separator/>
                  <q-card-section class="row">
                    <span class="col-md-9 col-xs-9 col-sm-9">
                      <font size="4"><strong>TOTAL</strong></font>
                      (TVA inclus)
                    </span>
                    <span class="col-md-3 col-xs-3 col-sm-3">
                      <font size="4" color="red">{{totalPrice()}}&nbsp;EUR</font>
                    </span>
                  </q-card-section>
                  <q-card-section class="row">
                    <span class="col-md-3 col-xs-3 col-sm-3">
                      &nbsp;
                    </span>
                    <span class="col-md-7 col-xs-7 col-sm-7">
                      <q-btn label="Valider mon panier" color="warning" @click="livraisonStep"/>
                    </span>
                    <span class="col-md-2 col-xs-2 col-sm-2">
                    </span>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-if="step === 2" class="q-pa-md bg-indigo-1">
      <!--<div>
          <vue-stripe-checkout
            ref="checkoutRef"
            :image="image"
            :name="name"
            :description="description"
            :currency="currency"
            :amount="amount"
            :allow-remember-me="false"
            @done="done"
            @opened="opened"
            @closed="closed"
            @canceled="canceled"
          ></vue-stripe-checkout>
          <button @click="checkout">Checkout</button>
        </div>
    </div>
  -->
  <div class="flex row">
    <div class="col-12">
      &nbsp;
    </div>
    <div class="col-12">
      <center>
        <q-img
          src="statics/cc-visa-brands.svg"
          style="height: 50px; max-width: 60px"
        >
      </q-img>
      &nbsp;&nbsp;
        <font size="5">Payer avec Visa ou MasterCard</font>
        &nbsp;&nbsp;
        <q-img
          src="statics/cc-mastercard-brands.svg"
          style="height: 50px; max-width: 60px"
        >
      </q-img>
      </center>
    </div>
    <div class="col-12">
      &nbsp;
    </div>
    <div class="col-4"/>
    <div class="col-4">
      <q-input color="teal" filled v-model="text" label="Nom">
        <template v-slot:prepend>
          <q-icon name="person_pin" />
        </template>
      </q-input>
    </div>
    <div class="col-4"/>
    <!---------------->
    <div class="col-12">
      &nbsp;
    </div>
    <div class="col-4"/>
    <div class="col-4">
      <q-input color="teal" filled v-model="text" label="Numéro de la carte">
        <template v-slot:prepend>
          <q-icon name="credit_card" />
        </template>
      </q-input>
    </div>
    <div class="col-4"/>
    <div class="col-12">
      &nbsp;
    </div>
    <div class="col-4"/>
    <div class="col-2">
      <q-input color="teal" filled v-model="text" label="MM/YY">
        <template v-slot:prepend>
          <q-icon name="calendar_today" />
        </template>
      </q-input>
    </div>
    <div class="col-2">
      <q-input color="teal" filled v-model="text" label="CVC">
        <template v-slot:prepend>
          <q-icon name="security" />
        </template>
      </q-input>
    </div>
  <div class="col-4"/>
      <div class="col-12">
        &nbsp;
      </div>
      <div class="col-5"/>
      <div class="col-4">
        <q-btn label="Valider le payement" color="primary" @click="PayerWithStripe"/>
      </div>
      <div class="col-4"/>
    </div>
</div>
</div>
</template>
<script>
import Vue from 'vue'
import VueStripeCheckout from 'vue-stripe-checkout'
Vue.use(VueStripeCheckout, 'your-publishable-key-here')
import { openURL } from 'quasar'
export default {
  name: 'Panier',
  components: {
  },
  data () {
    return {
      step: 1,
      panierListe: [],
      finalPrice: [],
      image: 'https://i.imgur.com/HhqxVCW.jpg',
      name: 'Shut up and take my money!',
      description: 'Cats are the best dog!',
      currency: 'PHP',
      amount: 99999
    }
  },
  computed: {
  },
  created () {
    window.bus.$on('gameAddToPanier', (game) => {
      console.log('onnnnnnnnnnnnnnnnnn')
      this.panierListe.push(game)
    })
    console.log('route params =', this.$route.query)
    if (this.$route.query) {
      this.panierListe = this.$route.query.liste
      console.log('panierListe =', this.panierListe)
      for (var i = 0; i < this.panierListe.length; i++) {
        this.finalPrice.push({
          id: this.panierListe[i].id,
          price: this.panierListe[i].price,
          amount: 1
        })
      }
    }
  },
  methods: {
    openURL,
    removeFromBasket (link) {
      for (var i = 0; i < this.panierListe.length; i++) {
        if (this.panierListe[i].id === link.id) {
          this.panierListe.splice(i, 1)
        }
      }
      for (i = 0; i < this.finalPrice.length; i++) {
        if (this.finalPrice[i].id === link.id) {
          this.finalPrice.splice(i, 1)
        }
      }
    },
    getPrice (id) {
      console.log('finalPrice')
      let val = this.finalPrice.filter(val => val.id === id)
      console.log('val =', val)
      return val[0].price
    },
    getIndice (id) {
      for (var i = 0; i < this.finalPrice.length; i++) {
        if (id === this.finalPrice[i].id) {
          return i
        }
      }
      return -1
    },
    goHome () {
      this.$router.back()
    },
    totalPrice () {
      let sum = 0
      for (var i = 0; i < this.finalPrice.length; i++) {
        sum += this.finalPrice[i].price
      }
      return sum
    },
    addUnit (id) {
      for (var i = 0; i < this.finalPrice.length; i++) {
        if (id === this.finalPrice[i].id) {
          if (this.finalPrice[i].amount < 6) {
            this.finalPrice[i].amount += 1
            this.finalPrice[i].price = this.finalPrice[i].amount * this.panierListe[i].price
          }
        }
      }
    },
    removeUnit (id) {
      for (var i = 0; i < this.panierListe.length; i++) {
        if (id === this.panierListe[i].id) {
          if (this.finalPrice[i].amount > 1) {
            this.finalPrice[i].amount -= 1
            this.finalPrice[i].price = this.finalPrice[i].amount * this.panierListe[i].price
          }
        }
      }
    },
    livraisonStep () {
      console.log('step unpdated')
      this.step = 2
    }
  }
}
</script>
<style lang="stylus">
  .myInput .q-input-target
    text-align: center;
</style>
