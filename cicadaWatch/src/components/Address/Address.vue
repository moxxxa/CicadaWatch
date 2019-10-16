<template>
  <div class="adresse">
    <h2 class="p-5 text-center">{{title}}</h2>
      <div class="row section-content">
        <div class="col-md-6">
          <div>
            <div  v-if="isHidden" style="width: 100%"><iframe width="100%" height="464" src="https://maps.google.com/maps?width=100%&amp;height=464&amp;hl=en&amp;q=242%20Rue%20du%20Faubourg%20Saint-Antoine%2C%2075012%20Paris+(Augarde)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.maps.ie/coordinates.html">find my coordinates</a></iframe></div><br />
          </div>
          <figure  v-if="!isHidden" id="hide" class="image-hero image-store-gallery"></figure>
        </div>
        <div class="col-md-4">
           <div class="mt-5 mb-5">
            <h4>Adresse</h4>
            <p class="hcard-address">2 Place du Général de Gaulle</p>
            <p class="hcard-address"></p>
            <p class="hcard-address">75000 Nation</p>
            <p class="hcard-address">01 90 91 92 93</p>
            <a v-on:click="isHidden = true" href="#/adress">Itinéraire et plan</a>
           </div>
            <div class="mt-5 mb-5">
            <h4>Heures d’ouverture </h4>
            <p class="hcard-address">Lun - Ven : <span>10 h - 19 h 30</span></p>
            <p class="hcard-address">Sam  <span>10 h - 20 h</span></p>
            <p class="hcard-address">Dim :<span>11 h - 18 h</span></p>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'blog',
  data () {
    return {
      title: 'Notre Magasin',
      show: true,
      isHidden: false
    }
  }
}
</script>

<style scoped>
.adresse {
margin: auto;
}
.section-content {
  background:
#f4f4f4;
    width: 100%;
    max-width: 1068px;
}
.section-content {
    margin-left: auto;
    margin-right: auto;
    margin: auto;
}
.hcard-address {
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 400;
    letter-spacing: -.022em;
    font-family: SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    margin-bottom: 0;
    margin-top: 0;
    text-align: start;
}

.image-hero {
    background-image: url('../../assets/images/apple.png');
}

.image-store-gallery {
    background-repeat: no-repeat;
    background-position: 50%;
    height: 464px;
    background-size: 100% 464px;
}
</style>
