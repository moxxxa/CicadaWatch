<template>
  <div>
    <q-list>

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
