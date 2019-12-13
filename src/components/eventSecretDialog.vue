<template>
<div class="q-gutter-sm row items-center no-wrap">
  <q-btn no-caps icon="phonelink_lock" label="Set Event Secret" color="accent" @click="persistent = true" />

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
    <q-card class="text-white" style="width: 44vw">
      <q-card-section style="background: #6e76ff">
        <div class="text-center text-lg">Set the <b>Event Check-in Secret</b></div>
      </q-card-section>

      <q-card-section class="q-mt-md">
        <q-input label="Event Secret" v-model="secret" :type="isPwd ? 'password' : 'text'" class="text-center" rounded standout="bg-primary text-white">
          <template v-slot:prepend>
            <q-icon name="phonelink_lock" />
          </template>
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn class="text-negative q-ml-sm" flat label="Cancel" @click="this.cancel" v-close-popup />
        <q-btn class="text-positive q-mr-sm" flat label="Set" @click="this.SetSecret" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
export default {
  name: 'eventSecretDialog',
  data() {
    return {
      persistent: false,
      isPwd: true,
      secret: this.$event_secret
    }
  },
  methods: {
    cancel() {
      this.secret = this.$event_secret;
    },
    SetSecret() {
      this.$event_secret = this.secret; //DOESN'T MODIFY THE PROTOTYPE :( pass the secret instead
      this.$emit('new_secret', this.secret)
    }
  }
}
</script>
