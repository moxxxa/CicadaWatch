<template>
  <q-page class="flex columns">
      <q-btn class="q-ml-xl col-md-1"
        color="primary"
        icon="arrow_left"
        flat
        dense
        size="25px"
        @click="goBack"
        />
    <div class="q-pa-md column col justify-end q-pl-xs">
        <div class="q-pl-xs">
          <div v-if="noMessageSent">
              <q-chat-message
              name="Augarde robot"
              avatar="https://cdn.quasar.dev/img/avatar1.jpg"
              text-color="white"
              >
              <q-spinner-dots size="2rem" />
            </q-chat-message>
          </div>
          <q-chat-message
            v-for="message in messages"
            :key="message.text"
            :name="message.from"
            :text="[message.text]"
            :sent="message.from == 'Augarde robot' ? false : true"
            :avatar="message.avatar"
          >
        </q-chat-message>
      </div>
    </div>
      <q-footer elevated>
        <q-toolbar>
          <q-form class="full-width">
          <q-input
            v-model="newMessage"
            bg-color="white"
            outlined
            rounded
            label="Message"
            dense
          >
          <template v-slot:after>
            <q-btn
              type="submit"
              round
              dense
              flat
              color="white"
              icon="send"
              @click="sendMessage"
            />
          </template>
        </q-input>
      </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
  </template>

<script>
export default {
  name: 'ServiceClient',
  components: {
  },
  data () {
    return {
      noMessageSent: true,
      newMessage: '',
      messages: [
      ]
    }
  },
  methods: {
    sendMessage () {
      if (this.newMessage !== '') {
        this.messages.push({
          text: this.newMessage,
          from: 'client',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
        })
      }
      this.newMessage = ''
    },
    goBack () {
      this.$router.back()
    },
    changeFirstMessageStatut () {
      this.noMessageSent = false
      this.messages.push({
        text: 'Bonjour comment puis-je vous aider',
        from: 'Augarde robot',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
      })
    }
  },
  created () {
    setTimeout(() => {
      this.changeFirstMessageStatut()
    }, 3000)
  },
  computed: {

  }
}
</script>
