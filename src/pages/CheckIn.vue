<template>
<q-page>

  <!--STARTUP DIALOG-->
  <form class="absolute-center" enctype="multipart/form-data" novalidate v-if="isInitial">
    <q-card class="text-white" style="background: #6e76ff">
      <q-card-section>
        <div class="text-h5 text-center q-pb-md text-italic">Kickback Event Check-In</div>

        <eventSecretDialog class="justify-center q-mb-md" @new_secret="event_secret"></eventSecretDialog>

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

    </q-card>

  </div>

  <!-- FAILED TO GET EVENT FROM SECRET -->
  <div v-if="isFailedCheck" class="flex absolute-center object-center text-center">
    <q-card class="bg-warning" style="width: 80%">

      <h2>Unable to Find Event</h2>
      <h5><em>Please Re-enter the Event Secret</em></h5>

      <eventSecretDialog class="justify-center q-mb-xl" @new_secret="event_secret"></eventSecretDialog>

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
      event_secret: this.$event_secret,
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
    openInNewWindow() {
      window.open(this.qrSrc)
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
