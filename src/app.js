var myname = new Vue({
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
    results: repo.points,
    searchValue: '',
    search: false,
  },
  mounted() {
    this.initMap();
    this.initMarkers();
    this.initFilters();
    this.renderFilters();
  },
  methods: {
    activate(id) {
      const el = document.getElementById(id).classList;

      if (!el.contains("active")) {
        el.toggle("active");
      }
    },

    deactivate(id) {
      const el = document.getElementById(id).classList;

      if (el.contains("active")) {
        el.toggle("active");
      }
    },

    searching() {
      var b = this.searchValue.toLowerCase();
      this.results = this.points.filter(function (point) {
        var a = point.name.toLowerCase();
        return a.includes(b);
      });
      
      this.points.forEach((point) => {
        if (this.results.includes(point)) {
          point.active = true;
        } else {
          point.active = false;
        }
      });
      
      this.renderFilters();
    },

    toggleSearchbar() {
      if (this.search) {
        return;
      }

      this.activate('search-button');
      this.activate('search-bar');
      document.getElementById('search-bar').focus();

      this.initFilters();
      this.showActivePoints();
      this.search = true;

      this.activateSinglebox('results');
      document.getElementById('nav-title').innerHTML = "";
    },

    showFilters() {
      document.getElementById('filters').classList.toggle("active");
      document.getElementById('nav-filters').classList.toggle("active");
      document.getElementById('nav').classList.toggle("active");
    },

    centerMap() {
      this.map.flyTo(this.center, this.zoom);
    },

    backToStart() {
      if (this.singlebox !== 'industries') {
        this.stepBack();
        this.backToStart();
      }
    },

    stepBack() {
      this.deactivate(this.singlebox);

      if (this.search) {
        this.deactivate('search-button');
        this.deactivate('search-bar');
        this.searchValue = '';
        this.search = false;

        this.backToStart();
        return;
      }

      switch (this.singlebox) {
        case 'selection':
          document.getElementById('nav-title').innerHTML = this.filters.sectors[0];
          this.centerMap();

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

      this.activateAllPoints();
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

      this.industries.forEach((i) => {
        if (i.id !== industrieId) {
          i.active = false;
        } else {
          i.active = true;
        }
        this.industrieChanged(i.id, i.active);
      });

      this.filters.sectors = industrie.sectors;

      this.searching();
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

      this.searching();
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

      this.points.forEach((point) => {
        point.active = true;
      });

      this.searching();
    },

    activateSinglebox(id) {
      this.activate(id);
      this.singlebox = id;
    },

    activateAllPoints() {
      this.points.forEach((point) => {
        point.active = true;
      });
    },

    showActivePoints() {
      // var newMarkers = new L.MarkerClusterGroup();
      var newMarkers = new L.LayerGroup();

      this.points.forEach((point) => {
        if (point.active) {
          point.leafletObject.addTo(newMarkers);
        }
      });

      this.markers.removeFrom(this.map);
      this.markers = newMarkers;
      this.markers.addTo(this.map);
    },

    renderFilters() {
      this.points.forEach((point) => {

        var a = this.filters.industries.includes(point.industrie);
        var b = this.filters.sectors.includes(point.sector);
        var c = this.filters.activities.includes(point.activity);

        if (a && b && c) {
        } else {
          point.active = false;
          this.results = this.results.filter( function(i) {
            return i !== point;
          });
        }
      });

      this.showActivePoints();
    },


    initFilters() {
      this.filters.industries = [];
      this.industries.forEach((industrie) => {
        industrie.active = true;

        if (!this.filters.industries.includes(industrie.id)) {
          this.filters.industries.push(industrie.id);
        }
      });

      this.filters.sectors = [];
      this.points.forEach((point) => {
        const industrie = this.industries.find(industrie => industrie.id === point.industrie);

        if (!industrie.sectors.includes(point.sector)) {
          console.log("Push " + point.sector + " for " + industrie.name)
          industrie.sectors.push(point.sector);
        }

        if (!this.filters.sectors.includes(point.sector)) {
          this.filters.sectors.push(point.sector);
        }

        point.active = true;
      });

      this.filters.activities = [];
      this.activities.forEach((activity) => {
        activity.active = true;

        if (!this.filters.activities.includes(activity.id)) {
          this.filters.activities.push(activity.id);
        }
      });

      searchValue = '';
    },

    initMarkers() {
      // var markers = new L.MarkerClusterGroup();
      this.markers = new L.layerGroup();

      this.points.forEach((point) => {
        const industrie = this.industries.find(industrie => industrie.id === point.industrie);

        point.leafletObject = L.marker(point.coords, { icon: industrie.marker, title: point.name });
        point.leafletObject.on('click', function(e) { myname.pointSelected(point.id) } );
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
  watch: {
    'searchValue': function () {
      this.searching();
    },
  }
});
