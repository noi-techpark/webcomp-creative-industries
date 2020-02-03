new Vue({
  el: '#app',
  data: {
    map: null,
    markers: null,
    testIcon: null,
    tileLayer: null,
    activities: repo.activities,
    industries: repo.industries,
    points: repo.points,
    filters: {
      industries: [],
      sectors: [],
      activities: [],
    },
    // results: points.filter(function(i) {
    //   return i.active == true;
    // }),
  },
  mounted() {
    this.initMap();
    this.initMarkers();
    this.initFilters();
    this.renderFilters();
  },
  methods: {

    sectorSelected(sectorId) {
      document.getElementById('sectors').classList.toggle("active");
      document.getElementById('results').classList.toggle("active");

      this.filters.sectors = [sectorId];
      this.renderFilters();
    },

    industrieSelected(industrieId) {
      document.getElementById('industries').classList.toggle("active");
      document.getElementById('sectors').classList.toggle("active");

      this.industries.forEach((industrie) => {
        if (industrie.id !== industrieId) {
          industrie.active = false;
        } else {
          industrie.active = true;
        }
        this.industrieChanged(industrie.id, industrie.active);
      });

      const industrie = this.industries.find(industrie => industrie.id === industrieId);
      this.filters.sectors = industrie.sectors;
    },

    industrieChanged(industrieId, active) {
      if (active) {
        if (!this.filters.industries.includes(industrieId)) {
          this.filters.industries.push(industrieId);
        }
      } else {
        this.filters.industries = this.filters.industries.filter(function (i) {
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
        this.filters.activities = this.filters.activities.filter(function (i) {
          return i !== activityId;
        });
      }

      this.renderFilters();
    },

    renderFilters() {
      // var newMarkers = new L.MarkerClusterGroup();
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

        point.leafletObject = L.marker(point.coords, { icon: industrie.marker });
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
