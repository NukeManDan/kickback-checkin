<template>
<q-page>

  <!--STARTUP DIALOG-->
  <form class="absolute-center" enctype="multipart/form-data" novalidate v-if="isInitial">
    <q-card class="text-white" style="background: #6e76ff">
      <q-card-section>
        <div class="text-h5 text-center q-pb-md text-italic">Kickback Event Check-In</div>

        <eventSecretDialog class="justify-center q-mb-md" @new_secret="checkSecret"></eventSecretDialog>

        <!-- LOADING (displayed under image) -->
        <div v-if="isLoading" class="text-center">
          <q-spinner-pie class="q-mt-lg" color="primary" size="13%" />
          <p class="text-italic q-pa-sm" style="font-size:150%">Verifying Secret...</p>

          <!-- TODO: PUT BECKEND CHECK ON EVENT SECRET HERE! -->

        </div>

        </div>
      </q-card-section>
    </q-card>
  </form>

  <!--TOPT DISPLAY-->
  <div v-if="!isInitial && !isFailedCheck" class="flex justify-center q-py-xl">
    <q-card class="bg-blue-grey-2" align="center" style="max-width: 90vw;">

      <!-- TODO: ADD TOPT QR HERE -->
      <img :src="qrSrc">

    </q-card>

  </div>

  <!-- FAILED TO GET EVENT FROM SECRET -->
  <div v-if="isFailedCheck" class="flex absolute-center object-center text-center">
    <q-card class="bg-warning" style="width: 80%">

      <h2>Unable to Find Event</h2>
      <h5><em>Please Re-enter the Event Secret</em></h5>

      <eventSecretDialog class="justify-center q-mb-xl" @new_secret="checkSecret"></eventSecretDialog>

    </q-card>
  </div>

</q-page>
</template>

<script>
import eventSecretDialog from "../components/eventSecretDialog";
import qrCode from 'qrcode'

export default {

  name: "CheckIn",
  data: function() {
    return {
      event_secret: '',
      currentStatus: "STATUS_INITIAL",
      qrText: '',
      qrSrc: null
    };
  },

  beforeDestroy() {
    this.reset()
  },

  mounted: function() {},
  computed: {
    verifiedColor() {
      if (this.verifiedCID) return "background: green"
      else return "background: yellow"
    },
    isInitial() {
      return this.currentStatus === "STATUS_INITIAL";
    },
    isLoading() {
      return this.currentStatus === "STATUS_LOADING";
    },
    isSuccess() {
      return this.currentStatus === "STATUS_SUCCESS";
    },
    isFailedCheck() {
      return this.currentStatus === "STATUS_FAILED_CHECK";
    }
  },

  methods: {
    checkSecret(secret) {
      console.log("TODO!!! Need to get Kickback backend to see if this is valid and return event info for it if so. ");
      // TODO: Need to get Kickback backend to see if this is valid and return event info for it if so.
      console.log("*** \n This is the secret set for the QR:\n\n" + secret +"\n\n");
      this.event_secret = secret;
      this.qrText = this.genToken(secret);
      this.generateQrCode();
      this.currentStatus = "STATUS_SUCCESS";
    },
    genToken(secret){
      // TODO: add token generated from given secret
      console.log("in TOPT creator");
      return this.event_secret; // FIXME: get this as the token
    },
    createObjectUrl(err, canvas) {
      if (!err) {
        canvas.toBlob((blob) => {
          this.qrSrc = window.URL.createObjectURL(blob)
        })
      } else {
        console.warn('generateQrCode:ERROR', err)
      }
    },
    generateQrCode() {
      if (!this.qrText) {
        return
      }

      window.URL.revokeObjectURL(this.qrSrc)
      qrCode.toCanvas(this.qrText, {}, this.createObjectUrl)
    },
    reset() {
      window.URL.revokeObjectURL(this.qrSrc)
      this.qrSrc = null
      this.qrText = ''
    }
  },

  components: {
    eventSecretDialog: eventSecretDialog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
