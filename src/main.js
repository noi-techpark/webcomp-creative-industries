import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// /*
// import L from 'leaflet'
// import _ from 'leaflet/markercluster'

new Vue({
/*
    // el: '#app',
    data: {
        map: Vue.app,
        center: [46.643211, 11.365379],
        zoom: 9,
        marker: L.icon({
            iconUrl: require('@/assets/markers/pin.svg'),
            iconSize: [50, 33], // size of the icon
            iconAnchor: [24, 32], // point of the icon which will correspond to marker's location
        }),
        markers: [],
        testIcon: "",
        // tileLayer: null,
        singlebox: 'industries',
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
                name: 'Architecture',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/00.svg'),
            },
            {
                id: 1,
                name: 'Software Production',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/01.svg'),
            },
            {
                id: 2,
                name: 'Design',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/02.svg'),
            },
            {
                id: 3,
                name: 'Editoria & Stampa',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/03.svg'),
            },
            {
                id: 4,
                name: 'Visual Arts',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/04.svg'),
            },
            {
                id: 5,
                name: 'Video Production',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/05.svg'),
            },
            {
                id: 6,
                name: 'Radio & TV',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/06.svg'),
            },
            {
                id: 7,
                name: 'Music',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/07.svg'),
            },
            {
                id: 8,
                name: 'Performing Arts',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/08.svg'),
            },
            {
                id: 9,
                name: '',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/09.svg'),
            },
            {
                id: 10,
                name: 'Education',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/10.svg'),
            },
            {
                id: 11,
                name: 'Advertising',
                sectors: [],
                active: false,
                icon: require('@/assets/icons/industries/11.svg'),
            }
        ],
        points: [
            {
                id: 0,
                name: 'Bozen',
                industrie: 0,
                sector: 'UniBz',
                activity: 2,
                address: "Piazza Universita', 39100 Bolzano (BZ)",
                coords: [46.4906700, 11.3398200],
                logo: require('@/assets/logos/flashbeing.png'),
                description: "Lorem Ipsum lorot sit amet",
                linkedin: "",
                facebook: "",
                website: "jdsajsd",
                phone: "",
                mail: "",
                active: false,
            },
            {
                id: 1,
                name: 'Brixen',
                industrie: 0,
                sector: 'UniBz',
                activity: 2,
                address: "Via Volta",
                coords: [46.7150300, 11.6559800],
                logo: require('@/assets/logos/unibz.png'),
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                linkedin: "linkedin",
                facebook: "facebook",
                website: "jdsajsd",
                phone: "38923820",
                mail: "shsaas@kjdfjds.co",
                active: false,
            },
            {
                id: 2,
                name: 'Bruneck',
                industrie: 0,
                sector: 'UniBz',
                activity: 2,
                coords: [46.7994200, 11.9342900],
                logo: require('@/assets/logos/unibz.png'),
                description: "Lorem Ipsum lorot sit amet",
                linkedin: "",
                facebook: "",
                website: "jdsajsd",
                phone: "",
                mail: "",
                active: false,
            },
            {
                id: 3,
                name: 'Claudiana',
                industrie: 0,
                sector: 'Private Uni',
                activity: 2,
                coords: [46.499657, 11.313190],
                logo: require('@/assets/logos/unibz.png'),
                description: "Lorem Ipsum lorot sit amet",
                linkedin: "",
                facebook: "",
                website: "jdsajsd",
                phone: "",
                mail: "",
                active: false,
            },
            {
                id: 4,
                name: 'FlashBeing',
                industrie: 1,
                sector: 'Software Production',
                activity: 1,
                coords: [46.488827, 11.332528],
                logo: require('@/assets/logos/flashbeing.png'),
                description: "Lorem Ipsum lorot sit amet",
                linkedin: "",
                facebook: "",
                website: "jdsajsd",
                phone: "",
                mail: "",
                active: false,
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
            {
                id: 7,
                name: 'Test',
                industrie: 0,
                sector: 'Private Uni',
                activity: 2,
                coords: [46.488827, 11.332528],
            },
        ],
        filters: {
            industries: [],
            sectors: [],
            activities: [],
        },
        results: [],
        selection: "s",
        searchValue: "placeholder",
        search: false,
    },
    mounted() {
        console.log(document.getElementById('map'));
        this.searchValue = "";  
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
            // if (this.search) {
            //   return;
            // }

            this.activate('title-header');

            this.activate('search-button');
            this.activate('search-bar');
            document.getElementById('search-bar').focus();

            this.initFilters();
            this.showActivePoints();
            this.search = true;

            this.activateSinglebox('results');
            document.getElementById('nav-title').innerHTML = "";
        },

        resetSearchbar() {
            if (this.search) {
                this.deactivate('search-button');
                this.deactivate('search-bar');
                this.searchValue = "";
                this.search = false;

                this.backToStart();
                return;
            }
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
            } else {
                this.singlebox = 'industries';
                this.deactivate('title-header');
            }
        },

        stepBack() {
            this.deactivate(this.singlebox);

            switch (this.singlebox) {
                case 'selection':
                    this.centerMap();

                    if (this.search) {
                        this.toggleSearchbar();
                    } else if (document.getElementById('results').classList.contains('active')) {
                        document.getElementById('nav-title').innerHTML = this.filters.sectors[0];
                        this.singlebox = 'results';
                    } else if (document.getElementById('sectors').classList.contains('active')) {
                        const industrie = this.industries.find(industrie => industrie.id === this.filters.industries[0]);
                        document.getElementById('nav-title').innerHTML = industrie.name;
                        this.singlebox = 'sectors';
                    } else {
                        this.singlebox = 'industries';
                    }

                    break;

                case 'results':
                    var industrie = this.industries.find(industrie => industrie.id === this.filters.industries[0]);
                    document.getElementById('nav-title').innerHTML = industrie.name;
                    this.filters.sectors = industrie.sectors;

                    this.resetSearchbar();
                    this.singlebox = 'sectors';
                    break;

                case 'sectors':
                    document.getElementById('nav-title').innerHTML = "Industries";
                    this.initFilters();

                    this.resetSearchbar();
                    this.deactivate('title-header');
                    this.singlebox = 'industries';
                    break;

                default:
                    this.resetSearchbar();
                    break;
            }

            this.activateAllPoints();
            this.renderFilters();
        },

        pointSelected(id) {
            const point = this.points.find(point => point.id === id);

            this.activate('title-header');

            this.deactivate('search-button');
            this.deactivate('search-bar');

            this.activateSinglebox('selection');
            document.getElementById('nav-title').innerHTML = point.name;
            this.selection = point;

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

            this.activate('title-header');
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

                if (!(a && b && c)) {
                    point.active = false;
                    this.results = this.results.filter(function (i) {
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

            this.searchValue = "";
        },

        initMarkers() {
            // this.markers = new L.MarkerClusterGroup();
            this.markers = new L.layerGroup();

            this.points.forEach((point) => {
                // const industrie = this.industries.find(industrie => industrie.id === point.industrie);

                point.leafletObject = L.marker(point.coords, { icon: this.marker, title: point.name });
                point.leafletObject.on('click', function () {
                    myname.pointSelected(point.id)
                });
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
    },
*/
// */
// new Vue({
    render: h => h(App),

}).$mount('#app')

