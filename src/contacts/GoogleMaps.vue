<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
export default {
  /* global google */
  name: 'google-map',
  props: ['name'],
  data () {
    return {
      mapName: this.name + '-map'
    }
  },
  mounted () {
    const element = document.getElementById(this.mapName)
    const options = {
      center: new google.maps.LatLng(44.979930, -93.234065),
      zoom: 14,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          elementType: 'geometry',
          stylers: [ { color: '#ebe3cd' } ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [ { color: '#523735' } ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [ { color: '#f5f1e6' } ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [ { color: '#c9b2a6' } ]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [ { color: '#dcd2be' } ]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [ { color: '#ae9e90' } ]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [ { color: '#dfd2ae' } ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [ { color: '#dfd2ae' } ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.icon',
          stylers: [ { visibility: 'off' } ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [ { visibility: 'off' } ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [ { color: '#93817c' } ]
        },
        {
          featureType: 'poi.business',
          stylers: [ { visibility: 'off' } ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [ { color: '#a5b076' } ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [ { color: '#447530' } ]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [ { color: '#f5f1e6' } ]
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [ { visibility: 'off' } ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [ { color: '#fdfcf8' } ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [ { color: '#f8c967' } ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [ { color: '#e9bc62' } ]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [ { color: '#e98d58' } ]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [ { color: '#db8555' } ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels',
          stylers: [ { visibility: 'off' } ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [ { color: '#806b63' } ]
        },
        {
          featureType: 'transit',
          stylers: [ { visibility: 'off' } ]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [ { color: '#dfd2ae' } ]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [ { color: '#8f7d77' } ]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [ { color: '#ebe3cd' } ]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [ { color: '#dfd2ae' } ]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [ { color: '#b9d3c2' } ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [ { color: '#92998d' } ]
        }
      ]
    }
    // eslint-disable-next-line
    const map = new google.maps.Map(element, options)
  }
}
</script>

<style lang="scss" scoped>
  .google-map {
    right: 0;
    top: 60px;
    width: 100vw;
    height: calc(100vh - 120px);
    margin: 0px;
    position: absolute;
    background-color: grey;
  }
</style>


