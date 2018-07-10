<template>
  <div v-loading="loading" class="camera">
    <qrcode-reader @init="onInit" @decode="onDecode" :paused = "paused">
      <div class="qrcode-reader-text">Center the QR Code in the Camera frame to scan.</div>
    </qrcode-reader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      paused: false
    }
  },
  methods: {
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
          this.$notify({
            title: 'Camera Permission',
            message: 'You have denied this app permission to access your camera. Please enable camera access for this app so you can scan.'
          })
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
          this.$notify({
            title: 'Camera Missing',
            message: 'We cannot find a camera attached to this device :(.'
          })
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
          this.$notify({
            title: 'Unsecure',
            message: 'We cannot acccess your camera because you are in an unsecure environment.'
          })
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
          this.$notify({
            title: 'Camera Unreadable',
            message: 'We cannot read your camera stream. Make sure another program is not using it.'
          })
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
          this.$notify({
            title: 'Camera Missing',
            message: 'We cannot find the type of camera(e.g. Front Camera, Back Camera, etc.) you requested attached to this device :('
          })
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
          this.$notify({
            title: 'Browser Unsupported',
            message: 'Your browser does not support native access to your camera. Please make sure you are using a supported browser, and that browser is up-to-date.'
          })
        }
      } finally {
        this.loading = false
      }
    },
    onDecode (decodedUrl) {
      this.paused = true
      console.log(decodedUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
  .camera {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: black;
    overflow: hidden;
    text-align: left;
  }
  .qrcode-reader-text {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    width: 100%;
    bottom: 0;
    background-color: #1BBC9B;
    color: white;
  }
</style>
