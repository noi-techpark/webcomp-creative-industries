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
        name: 'Designer',
        icon: L.icon({
          iconUrl: 'leaf-green.png',
          shadowUrl: 'leaf-shadow.png',

          iconSize: [38, 95], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }),
        active: false,
        features: [
          {
            id: 0,
            name: 'Bogart\'s Smokehouse',
            type: 'marker',
            coords: [38.6109607, -90.2050322],
          },
          {
            id: 1,
            name: 'Pappy\'s Smokehouse',
            type: 'marker',
            coords: [38.6350008, -90.2261532],
          },
          {
            id: 2,
            name: 'Broadway Oyster Bar',
            type: 'marker',
            coords: [38.6188362, -90.1947098],
          },
          {
            id: 3,
            name: 'Charlie Gitto\'s On the Hill',
            type: 'marker',
            coords: [38.617972, -90.2756436],
          },
          {
            id: 4,
            name: 'Sugarfire',
            type: 'marker',
            coords: [38.6304077, -90.1916921],
          },
          {
            id: 5,
            name: 'The Shaved Duck',
            type: 'marker',
            coords: [38.6036282, -90.2381407],
          },
          {
            id: 6,
            name: 'Mango Restaurant',
            type: 'marker',
            coords: [38.6313642, -90.1961267],
          },
          {
            id: 7,
            name: 'Zia\'s Restaurant',
            type: 'marker',
            coords: [38.6157376, -90.27716],
          },
          {
            id: 8,
            name: 'Anthonio\'s Taverna',
            type: 'marker',
            coords: [38.6143846, -90.280048],
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
          feature.leafletObject = L.marker(feature.coords, {icon: layer.icon});

          feature.leafletObject.addTo(this.markers);
        });

        this.markers.addTo(this.map);

      });
    },

    initMap() {
      this.map = L.map('map').setView([38.63, -90.23], 12);
      // this.map = L.map('map').setView([46.49, 11.34], 10);
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
