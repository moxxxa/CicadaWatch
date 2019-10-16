<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h1 class="text-center">{{title}}</h1>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled v-model="name" label="Your name *"
        hint="Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please your name']"
      />

      <q-input filled v-model="email" label="Your Email *"
        hint="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type email']"
      />

      <q-input filled v-model="object" label="Object"
        hint="Object"
        lazy-rules
      />
      <textarea placeholder="Placeholder"></textarea>
      <div>
        <q-btn label="Envoyer" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>
<script>
export default {
  name: 'blog',
  data () {
    return {
      title: 'Contact',
      show: true
    }
  }
}
</script>

<style scoped>

  .contact form{
    max-width: 40em;
    margin: 2em auto;
  }
  .contact form .form-control{
    margin-bottom: 1em;
  }
  .contact form textarea{
    min-height: 20em;
  }
</style>
