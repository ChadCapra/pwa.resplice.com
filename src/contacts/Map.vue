<template>
<keep-alive>
  <google-map name="resplice"></google-map>
</keep-alive>
</template>

<script>
import GoogleMaps from './GoogleMaps.vue'

export default {
  components: {
    'google-map': GoogleMaps
  }
}
</script>

