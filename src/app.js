new Vue({
  el: '#app',
  data: {
    map: null,
    center: [46.643211, 11.365379],
    zoom: 9,
    markers: null,
    testIcon: null,
    tileLayer: null,
    singlebox: 'industries',
    activities: repo.activities,
    industries: repo.industries,
    points: repo.points,
    filters: {
      industries: [],
      sectors: [],
      activities: [],
    },
    results: null,
    search: true,
  },
  mounted() {
    this.initMap();
    this.initMarkers();
    this.initFilters();
    this.renderFilters();
  },
  methods: {
    showFilters() {
      document.getElementById('filters').classList.toggle("active");
    },

    stepBack() {
      document.getElementById(this.singlebox).classList.toggle("active");

      
      switch (this.singlebox) {
        case 'selection':
          document.getElementById('nav-title').innerHTML = this.filters.sectors[0];
          this.map.flyTo(this.center, this.zoom);
          
          this.singlebox = 'results';
          break;
          
        case 'results':
          const industrie = this.industries.find(industrie => industrie.id === this.filters.industries[0]);
          document.getElementById('nav-title').innerHTML = industrie.name;
          this.filters.sectors = industrie.sectors;

          this.singlebox = 'sectors';
          break;

        case 'sectors':
          document.getElementById('nav-title').innerHTML = "Industries";
          this.initFilters();

          this.singlebox = 'industries';
          break;
      }

      this.renderFilters();
    },

    pointSelected(id) {
      const point = this.points.find(point => point.id === id);

      this.activateSinglebox('selection');
      document.getElementById('nav-title').innerHTML = point.name;

      this.map.flyTo(point.coords, 16);
      // Todo: change icon to selection
    },

    sectorSelected(sectorId) {
      this.activateSinglebox('results');
      document.getElementById('nav-title').innerHTML = sectorId;

      this.filters.sectors = [sectorId];
      this.renderFilters();
      this.results = this.points.filter(function (i) {
        return i.active === true;
      });
    },

    industrieSelected(industrieId) {
      const industrie = this.industries.find(industrie => industrie.id === industrieId);

      this.activateSinglebox('sectors');
      document.getElementById('nav-title').innerHTML = industrie.name;

      this.industries.forEach((industrie) => {
        if (industrie.id !== industrieId) {
          industrie.active = false;
        } else {
          industrie.active = true;
        }
        this.industrieChanged(industrie.id, industrie.active);
      });

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

    activateSinglebox(id) {
      document.getElementById(id).classList.toggle("active");
      this.singlebox = id;
    },

    renderFilters() {
      // var newMarkers = new L.MarkerClusterGroup();
      var newMarkers = new L.LayerGroup();

      this.points.forEach((point) => {

        var a = this.filters.industries.includes(point.industrie);
        var b = this.filters.sectors.includes(point.sector);
        var c = this.filters.activities.includes(point.activity);
        // console.log(a + " " + b + " " + c);

        if (a && b && c) {
          point.leafletObject.addTo(newMarkers);
          point.active = true;
        } else {
          point.active = false;
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
        }

        if (!this.filters.sectors.includes(point.sector)) {
          this.filters.sectors.push(point.sector);
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
      this.map = L.map('map', { zoomControl: false }).setView(this.center, this.zoom);
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
