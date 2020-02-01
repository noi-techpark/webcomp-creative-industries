new Vue({
  el: '#app',
  data: {
    map: null,
    markers: null,
    testIcon: null,
    tileLayer: null,
    activities: [
      {
        id: 0,
        name: 'Freelancer',
        active: false,
      },
      {
        id: 1,
        name: 'Company',
        active: false,
      },
      {
        id: 2,
        name: 'Entity',
        active: false,
      },
    ],
    industries: [
      {
        id: 0,
        name: 'Education',
        sectors: [],
        active: false,
        icon: L.icon({
          iconUrl: 'leaf-green.png',
          shadowUrl: 'leaf-shadow.png',

          iconSize: [38, 95], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }),
      },
      {
        id: 1,
        name: 'Technology',
        sectors: [],
        active: false,
        icon: L.icon({
          iconUrl: 'leaf-green.png',
          shadowUrl: 'leaf-shadow.png',

          iconSize: [38, 95], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }),
      },
    ],
    filters: {
      industries: [],
      sectors: [],
      activities: [],
    },
    points: [
      {
        id: 0,
        name: 'Bozen',
        industrie: 0,
        sector: 'UniBz',
        activity: 2,
        coords: [46.4906700, 11.3398200],
        active: false,
      },
      {
        id: 1,
        name: 'Brixen',
        industrie: 0,
        sector: 'UniBz',
        activity: 2,
        coords: [46.7150300, 11.6559800],
        active: false,
      },
      {
        id: 2,
        name: 'Bruneck',
        industrie: 0,
        sector: 'UniBz',
        activity: 2,
        coords: [46.7994200, 11.9342900],
        active: false,
      },
      {
        id: 3,
        name: 'Claudiana',
        industrie: 0,
        sector: 'Private Uni',
        activity: 2,
        coords: [46.499657, 11.313190],
      },
      {
        id: 4,
        name: 'FlashBeing',
        industrie: 1,
        sector: 'Software Production',
        activity: 1,
        coords: [46.488827, 11.332528],
      },
      {
        id: 5,
        name: 'Free Software Lab',
        industrie: 1,
        sector: 'Software Production',
        activity: 1,
        coords: [46.478827, 11.332528],
      },
      {
        id: 6,
        name: 'Tizio',
        industrie: 1,
        sector: 'Software Production',
        activity: 0,
        coords: [46.458827, 11.332528],
      },
    ],
  },
  mounted() {
    this.initMap();
    this.initMarkers();
    this.initFilters();
    this.renderFilters();
  },
  methods: {

    industrieChanged(industrieId, active) {
      if (active) {
        if (!this.filters.industries.includes(industrieId)) {
          this.filters.industries.push(industrieId);
        }
      } else {
        this.filters.industries = this.filters.industries.filter(function(i) {
          return i !== industrieId;
        });
      }

      this.renderFilters();
    },

    activityChanged(activityId, active) {
      if (active) {
        if (!this.filters.activities.includes(activityId)) {
          this.filters.activities.push(activityId);
        }
      } else {
        this.filters.activities = this.filters.activities.filter(function(i) {
            return i !== activityId;
          });
      }

      this.renderFilters();
    },

    renderFilters() {
      var newMarkers = new L.LayerGroup();

      this.points.forEach((point) => {

        var a = this.filters.industries.includes(point.industrie);
        var b = this.filters.sectors.includes(point.sector);
        var c = this.filters.activities.includes(point.activity);

        if (a && b && c) {
          point.leafletObject.addTo(newMarkers);
        }
      });

      this.markers.removeFrom(this.map);
      this.markers = newMarkers;
      this.markers.addTo(this.map);
    },


    initFilters() {
      this.industries.forEach((industrie) => {
        industrie.active = true;

        if (!this.filters.industries.includes(industrie.id)) {
          this.filters.industries.push(industrie.id);
        }
      });

      this.points.forEach((point) => {
        const industrie = this.industries.find(industrie => industrie.id === point.industrie);

        if (!industrie.sectors.includes(point.sector)) {
          industrie.sectors.push(point.sector);

          if (!this.filters.sectors.includes(point.sector)) {
            this.filters.sectors.push(point.sector);
          }
        }
      });

      this.activities.forEach((activity) => {
        activity.active = true;

        if (!this.filters.activities.includes(activity.id)) {
          this.filters.activities.push(activity.id);
        }
      });
    },

    initMarkers() {
      // var markers = new L.MarkerClusterGroup();
      this.markers = new L.layerGroup();

      this.points.forEach((point) => {
        const industrie = this.industries.find(industrie => industrie.id === point.industrie);

        point.leafletObject = L.marker(point.coords, {icon: industrie.icon});
        point.leafletObject.addTo(this.markers);
      });

      this.markers.addTo(this.map);
    },

    initMap() {
      this.map = L.map('map', { zoomControl: false }).setView([46.643211, 11.365379], 9);
      L.control.zoom({ position: 'bottomright' }).addTo(this.map);
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
});
