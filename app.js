new Vue({
  el: '#app',
  data: {
    map: null,
    markers: null,
    testIcon: null,
    tileLayer: null,
    layers: [
      {
        id: 0,
        name: 'Uni',
        icon: L.icon({
          iconUrl: 'leaf-green.png',
          shadowUrl: 'leaf-shadow.png',

          iconSize: [38, 95], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }),
        active: true,
        features: [
          {
            id: 0,
            name: 'Bozen',
            type: 'marker',
            coords: [46.4906700, 11.3398200],
          },
          {
            id: 1,
            name: 'Brixen',
            type: 'marker',
            coords: [46.7150300, 11.6559800],
          },
          {
            id: 2,
            name: 'Bruneck',
            type: 'marker',
            coords: [46.7994200, 11.9342900],
          },
          {
            id: 3,
            name: 'Claudiana',
            type: 'marker',
            coords: [46.499657, 11.313190],
          },
        ],
      },
      {
        id: 1,
        name: 'Software',
        icon: L.icon({
          iconUrl: 'leaf-green.png',
          shadowUrl: 'leaf-shadow.png',

          iconSize: [38, 95], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }),
        active: true,
        features: [
          {
            id: 0,
            name: 'FlashBeing',
            type: 'marker',
            coords: [46.478827, 11.332528],
          },
          {
            id: 1,
            name: 'Free Software Lab',
            type: 'marker',
            coords: [46.478827, 11.332528],
          },
        ],
      },
    ],
  },
  mounted() {
    // this.initStyle();
    this.initMap();
    this.initLayers();
  },
  methods: {
    layerChanged(layerId, active) {
      const layer = this.layers.find(layer => layer.id === layerId);

      layer.features.forEach((feature) => {
        if (active) {
          feature.leafletObject.addTo(this.markers);
        } else {
          feature.leafletObject.removeFrom(this.markers);
        }
      });
    },
    initLayers() {

      this.layers.forEach((layer) => {
        const markerFeatures = layer.features.filter(feature => feature.type === 'marker');

        // var markers = new L.MarkerClusterGroup();
        this.markers = new L.layerGroup();

        markerFeatures.forEach((feature) => {
          feature.leafletObject = L.marker(feature.coords, { icon: layer.icon });

          feature.leafletObject.addTo(this.markers);
        });

        this.markers.addTo(this.map);

      });
    },

    initMap() {
      // this.map = L.map('map').setView([38.63, -90.23], 12);
      this.map = L.map('map').setView([46.643211, 11.365379], 9);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );

      this.tileLayer.addTo(this.map);
    },
  },

  initStyle() {
    this.testIcon = L.icon({
      iconUrl: 'leaf-green.png',
      shadowUrl: 'leaf-shadow.png',

      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
  },
});
