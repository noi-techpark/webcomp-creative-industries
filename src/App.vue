<template>
  <div>
    <div id="app" class="container">
      <div id="map" ref="map" class="map"></div>
      <div class="center-button inline-block button white-bg rounded" @click="centerMap()">
        <div class="center-area">
          <div class="center-icon icon center-x center-y"></div>
        </div>
      </div>
      <div class="logo bottom-left"></div>
      <div id="omnibox" class="margined shadowed rounded">
        <div class="navbar" v-bind:class="{ active: !filterIsActive}">
          <div class="row">
            <div
              class="title-header center-area fill"
              v-bind:class="{active: currentSinglebox !== 'industries' || search}"
            >
              <div
                class="nav-back inline-block center-y icon back-icon clickable"
                @click="stepBack()"
              ></div>
              <div class="title inline-block center-y title">{{ currentSingleboxTitle }}</div>
            </div>
            <div class="center-area">
              <input
                ref="search-bar"
                class="search-bar inline-block center-y rounded"
                v-bind:class="{active: searchIsActive}"
                type="text"
                v-model="searchValue"
              />
              <div
                class="search-button inline-block button rounded center-y"
                v-bind:class="{active: searchIsActive}"
                @click="toggleSearchbar()"
              >
                <div class="center-area">
                  <div class="icon center-x center-y">
                    <svg
                      id="Capa_1"
                      enable-background="new 0 0 515.558 515.558"
                      viewBox="0 0 515.558 515.558"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="inline-block button primary-bg rounded center-y" @click="showFilters()">
                <div class="center-area">
                  <div class="icon center-x center-y">
                    <svg version="1.1" viewBox="-5 0 394 394" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="m367.82 0h-351.26c-6.1992-0.011719-11.879 3.4492-14.711 8.9609-2.8711 5.5859-2.3672 12.312 1.3008 17.414l128.69 181.29c0.042968 0.0625 0.089843 0.12109 0.13281 0.18359 4.6758 6.3125 7.207 13.961 7.2188 21.816v147.8c-0.027344 4.375 1.6914 8.582 4.7734 11.688 3.0859 3.1016 7.2812 4.8516 11.656 4.8516 2.2227-0.003906 4.4258-0.44531 6.4805-1.3008l72.312-27.57c6.4766-1.9805 10.777-8.0938 10.777-15.453v-120.02c0.011719-7.8555 2.543-15.504 7.2148-21.816 0.042968-0.0625 0.089844-0.12109 0.13281-0.18359l128.69-181.29c3.668-5.0977 4.1719-11.82 1.3008-17.406-2.8281-5.5156-8.5117-8.9766-14.707-8.9648z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-filters navbar" v-bind:class="{active: filterIsActive}">
          <div class="row">
            <div class="center-area fill">
              <div class="inline-block center-y title">Filter</div>
            </div>
            <div class="center-area">
              <div class="inline-block button primary-bg rounded center-y" @click="showFilters()">
                <div class="center-area">
                  <div class="icon center-x center-y">
                    <svg
                      enable-background="new 0 0 492 492"
                      version="1.1"
                      viewBox="0 0 492 492"
                      xml:space="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m484.13 104.48-16.116-16.116c-5.064-5.068-11.816-7.856-19.024-7.856s-13.964 2.788-19.028 7.856l-226.45 226.45-141.48-141.49c-5.064-5.06-11.82-7.852-19.028-7.852-7.204 0-13.956 2.792-19.024 7.852l-16.12 16.112c-5.068 5.076-7.852 11.836-7.852 19.036 0 7.204 2.784 13.96 7.852 19.028l159.74 159.74c0.212 0.3 0.436 0.58 0.696 0.836l16.12 15.852c5.064 5.048 11.82 7.572 19.084 7.572h0.084c7.212 0 13.968-2.524 19.024-7.572l16.124-15.992c0.26-0.256 0.48-0.468 0.612-0.684l244.78-244.76c10.5-10.476 10.5-27.52 4e-3 -38.008z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="industries"
          class="singlebox"
          v-bind:class="{active: currentSinglebox === 'industries'}"
        >
          <div class="select-list">
            <div
              class="select-item center-area"
              v-for="industrie in industries"
              :key="industrie.id"
              @click="industrieSelected(industrie.id)"
            >
              <div
                class="center-y icon rounded primary-bg"
                v-bind:style="{'background': 'url(' + industrie.icon + ') no-repeat center', 'background-size': '65%'}"
              ></div>
              <div class="select-item-label center-y">{{ industrie.name }}</div>
              <div class="center-y icon forward-icon"></div>
            </div>
          </div>
        </div>
        <div id="sectors" class="singlebox" v-bind:class="{active: currentSinglebox === 'sectors'}">
          <div class="select-list">
            <div
              class="select-item center-area"
              v-for="sector in filters.sectors"
              :key="sector"
              @click="sectorSelected(sector)"
            >
              <div class="select-item-label center-y">{{ sector }}</div>
              <div class="center-y icon forward-icon"></div>
            </div>
          </div>
        </div>
        <div id="results" class="singlebox" v-bind:class="{active: currentSinglebox === 'results'}">
          <div class="select-list">
            <div class="select-item center-area" v-if="results.length === 0">
              <div class="select-item-label center-y">No results.</div>
            </div>
            <div
              class="select-item center-area"
              v-for="point in results"
              :key="point"
              @click="pointSelected(point.id)"
            >
              <div
                class="center-y icon rounded primary-bg"
                v-bind:style="{'background': 'url(' + point.logo + ')', 'background-size': 'contain'}"
              ></div>
              <div class="select-item-label center-y">{{ point.name }}</div>
              <div class="center-y icon forward-icon"></div>
            </div>
          </div>
        </div>
        <div
          id="selection"
          class="singlebox"
          v-bind:class="{active: currentSinglebox === 'selection'}"
        >
          <div class="row">
            <div class="links">
              <div class="social">
                <!-- <div class="center-y icon rounded instagram"></div> -->
                <div
                  class="center-y icon rounded facebook-icon clickable"
                  v-if="selection.facebook"
                  @click="window.open(selection.facebook)"
                ></div>
                <div
                  class="center-y icon rounded linkedin-icon clickable"
                  v-if="selection.linkedin"
                  @click="window.open(selection.linkedin)"
                ></div>
              </div>
              <div class="website">
                <a v-bind:href="selection.website">{{ selection.website }}</a>
              </div>
            </div>
            <div
              class="logo rounded"
              v-bind:style="{'background-image': 'url(' + selection.logo + ')'}"
            ></div>
          </div>
          <div class="description">{{ selection.description }}</div>
          <div class="contact center-area">
            <div class="center-y button rounded primary-bg">
              <div class="center-area">
                <div class="icon center-x center-y">
                  <svg
                    enable-background="new 0 0 384 384"
                    version="1.1"
                    viewBox="0 0 384 384"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m353.19 252.05c-23.51 0-46.594-3.677-68.469-10.906-10.719-3.656-23.896-0.302-30.438 6.417l-43.177 32.594c-50.073-26.729-80.917-57.563-107.28-107.26l31.635-42.052c8.219-8.208 11.167-20.198 7.635-31.448-7.26-21.99-10.948-45.063-10.948-68.583 1e-3 -16.991-13.822-30.814-30.812-30.814h-70.52c-16.99 0-30.813 13.823-30.813 30.813 0 194.75 158.44 353.19 353.19 353.19 16.99 0 30.813-13.823 30.813-30.813v-70.323c-1e-3 -16.989-13.824-30.812-30.813-30.812z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="phone-number center-y">{{ selection.phone }}</div>
          </div>
          <div class="contact center-area">
            <div class="center-y button rounded primary-bg">
              <div class="center-area">
                <div class="icon center-x center-y">
                  <svg
                    enable-background="new 0 0 512 512"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m10.688 95.156c70.27 59.511 193.57 164.21 229.81 196.85 4.865 4.406 10.083 6.646 15.5 6.646 5.406 0 10.615-2.219 15.469-6.604 36.271-32.677 159.57-137.38 229.84-196.9 4.375-3.698 5.042-10.198 1.5-14.719-8.188-10.447-20.396-16.437-33.48-16.437h-426.67c-13.083 0-25.292 5.99-33.479 16.438-3.542 4.52-2.875 11.02 1.5 14.718z"
                    />
                    <path
                      d="m505.81 127.41c-3.781-1.76-8.229-1.146-11.375 1.542-77.928 66.062-177.39 150.74-208.68 178.94-17.563 15.854-41.938 15.854-59.542-0.021-33.354-30.052-145.04-125-208.66-178.92-3.167-2.688-7.625-3.281-11.375-1.542-3.77 1.751-6.187 5.522-6.187 9.678v268.25c0 23.532 19.135 42.667 42.667 42.667h426.67c23.531 0 42.666-19.135 42.666-42.667v-268.25c0-4.156-2.417-7.937-6.187-9.677z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="mail center-y">{{ selection.mail }}</div>
          </div>
          <div class="contact center-area">
            <div class="center-y button rounded primary-bg">
              <div class="center-area">
                <div class="icon center-x center-y">
                  <svg
                    enable-background="new 0 0 512 512"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m256 0c-105.88 0-192 86.135-192 192 0 141.65 177.15 310 184.69 317.1 2.062 1.927 4.687 2.896 7.312 2.896s5.25-0.969 7.313-2.896c7.541-7.104 184.69-175.46 184.69-317.1 0-105.86-86.125-192-192-192zm0 298.67c-58.813 0-106.67-47.854-106.67-106.67s47.855-106.67 106.67-106.67 106.67 47.855 106.67 106.67-47.854 106.67-106.67 106.67z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="address center-y">{{ selection.address }}</div>
          </div>
        </div>
        <div id="filters" class="singlebox" v-bind:class="{active: filterIsActive}">
          <div class="filter-class">
            <div class="title">Type:</div>
            <div class="form-check" v-for="activity in activities" :key="activity.id">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="activity.active"
                  @change="activityChanged(activity.id, activity.active)"
                />
                {{ activity.name }}
              </label>
            </div>
          </div>

          <div class="filter-class" v-if="search">
            <div class="title">Industry:</div>
            <div class="form-check" v-for="industrie in industries" :key="industrie.id">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="industrie.active"
                  @change="industrieChanged(industrie.id, industrie.active)"
                />
                {{ industrie.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <img id="h" /> -->

    <div>
      <!-- <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script> -->

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
      />
      <!-- <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script> -->

      <!-- <script src="https://unpkg.com/merge-images"></script> -->
    </div>
  </div>
</template>

<script>
import * as L from "leaflet";
require("leaflet.markercluster");

// import mergeImages from "merge-images";

export default {
  data() {
    return {
      searchValue: "",
      markers: [],
      tileLayer: null,
      filters: {
        industries: [],
        sectors: [],
        activities: []
      },
      results: [],
      selection: "",

      search: false,
      lastBoxes: [],
      lastBoxesTitle: [],
      currentSinglebox: "industries",
      currentSingleboxTitle: "industries",
      titleHeaderIsActive: false,
      searchIsActive: false,
      filterIsActive: false

      // path: ""
    };
  },
  props: {
    center: { type: Array, default: () => [46.643211, 11.365379] },
    zoom: { type: Number, default: 9 },
    activities: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: "Freelancer",
          active: false
        },
        {
          id: 1,
          name: "Company",
          active: false
        },
        {
          id: 2,
          name: "Entity",
          active: false
        }
      ]
    },
    industries: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: "Architecture",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/00.svg"),
          marker: L.icon({
            iconUrl: require("@/assets/markers/00.svg"),
            iconSize: [18.5, 30], // size of the icon
            iconAnchor: [24, 32] // point of the icon which will correspond to marker's location
          })
        },
        {
          id: 1,
          name: "Software Production",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/01.svg"),
          marker: L.icon({
            iconUrl: require("@/assets/markers/01.svg"),
            iconSize: [18.5, 30], // size of the icon
            iconAnchor: [24, 32] // point of the icon which will correspond to marker's location
          })
        },
        {
          id: 2,
          name: "Design",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/02.svg"),
          marker: L.icon({
            iconUrl: require("@/assets/markers/02.svg"),
            iconSize: [18.5, 30], // size of the icon
            iconAnchor: [24, 32] // point of the icon which will correspond to marker's location
          })
        },
        {
          id: 3,
          name: "Editoria & Stampa",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/03.svg")
        },
        {
          id: 4,
          name: "Visual Arts",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/04.svg")
        },
        {
          id: 5,
          name: "Video Production",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/05.svg")
        },
        {
          id: 6,
          name: "Radio & TV",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/06.svg")
        },
        {
          id: 7,
          name: "Music",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/07.svg")
        },
        {
          id: 8,
          name: "Performing Arts",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/08.svg")
        },
        {
          id: 9,
          name: "",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/09.svg")
        },
        {
          id: 10,
          name: "Education",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/10.svg")
        },
        {
          id: 11,
          name: "Advertising",
          sectors: [],
          active: false,
          icon: require("@/assets/icons/industries/11.svg")
        }
      ]
    },
    points: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: "Bozen",
          industrie: 0,
          sector: "UniBz",
          activity: 2,
          address: "Piazza Universita', 39100 Bolzano (BZ)",
          coords: [46.49067, 11.33982],
          logo: require("@/assets/logos/flashbeing.png"),
          description: "Lorem Ipsum lorot sit amet",
          linkedin: "",
          facebook: "",
          website: "jdsajsd",
          phone: "",
          mail: "",
          active: false
        },
        {
          id: 1,
          name: "Brixen",
          industrie: 0,
          sector: "UniBz",
          activity: 2,
          address: "Via Volta",
          coords: [46.71503, 11.65598],
          logo: require("@/assets/logos/unibz.png"),
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkedin: "linkedin",
          facebook: "facebook",
          website: "jdsajsd",
          phone: "38923820",
          mail: "shsaas@kjdfjds.co",
          active: false
        },
        {
          id: 2,
          name: "Bruneck",
          industrie: 0,
          sector: "UniBz",
          activity: 2,
          coords: [46.79942, 11.93429],
          logo: require("@/assets/logos/unibz.png"),
          description: "Lorem Ipsum lorot sit amet",
          linkedin: "",
          facebook: "",
          website: "jdsajsd",
          phone: "",
          mail: "",
          active: false
        },
        {
          id: 3,
          name: "Claudiana",
          industrie: 0,
          sector: "Private Uni",
          activity: 2,
          coords: [46.499657, 11.31319],
          logo: require("@/assets/logos/unibz.png"),
          description: "Lorem Ipsum lorot sit amet",
          linkedin: "",
          facebook: "",
          website: "jdsajsd",
          phone: "",
          mail: "",
          active: false
        },
        {
          id: 4,
          name: "FlashBeing",
          industrie: 1,
          sector: "Software Production",
          activity: 1,
          coords: [46.488827, 11.332528],
          logo: require("@/assets/logos/flashbeing.png"),
          description: "Lorem Ipsum lorot sit amet",
          linkedin: "",
          facebook: "",
          website: "jdsajsd",
          phone: "",
          mail: "",
          active: false
        },
        {
          id: 5,
          name: "Free Software Lab",
          industrie: 1,
          sector: "Software Production",
          activity: 1,
          coords: [46.478827, 11.332528]
        },
        {
          id: 6,
          name: "Tizio",
          industrie: 1,
          sector: "Software Production",
          activity: 0,
          coords: [46.458827, 11.332528]
        },
        {
          id: 7,
          name: "Test",
          industrie: 0,
          sector: "Private Uni",
          activity: 2,
          coords: [46.488827, 11.332528]
        }
      ]
    }
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
      this.results = this.points.filter(function(point) {
        var a = point.name.toLowerCase();
        return a.includes(b);
      });

      this.points.forEach(point => {
        if (this.results.includes(point)) {
          point.active = true;
        } else {
          point.active = false;
        }
      });

      this.renderFilters();
    },

    toggleSearchbar() {
      this.titleHeaderIsActive = true;

      this.searchIsActive = true;
      // this.activate("search-button");
      // this.activate("search-bar");
      this.$refs["search-bar"].focus();

      this.initFilters();
      this.showActivePoints();
      this.search = true;

      // this.activateSinglebox("results");
      this.lastBoxes = ["industries"];
      this.lastBoxesTitle = ["industries"];
      this.currentSinglebox = "results";
      this.currentSingleboxTitle = "";
    },

    resetSearchbar() {
      if (this.search) {
        this.searchIsActive = false;
        // this.deactivate("search-button");
        // this.deactivate("search-bar");
        this.searchValue = "";
        this.search = false;

        this.backToStart();
        return;
      }
    },

    showFilters() {
      // document.getElementById("filters").classList.toggle("active");
      // document.getElementById("nav-filters").classList.toggle("active");
      this.filterIsActive = !this.filterIsActive;
      // document.getElementById("nav").classList.toggle("active");
    },

    centerMap() {
      this.map.flyTo(this.center, this.zoom);
    },

    backToStart() {
      // if (this.currentSinglebox !== "industries") {
      //   this.stepBack();
      //   this.backToStart();
      // } else {
      //   this.currentSinglebox = "industries";
      //   // this.deactivate("title-header");
      // }

      this.currentSinglebox = "industries";
      this.lastBoxes = [];
      this.lastBoxesTitle = [];
    },

    stepBack() {
      // this.deactivate(this.currentSinglebox);

      if (this.search) {
        this.search = false;
        this.searchIsActive = false;
      }

      switch (this.currentSinglebox) {
        case "sectors":
          this.filters.industries = [];
          this.industries.forEach(industrie => {
            this.filters.industries.push(industrie.id);
          });
        /* falls through */
        case "results":
          this.filters.sectors = [];
          this.filters.industries.forEach(industrieId => {
            var industrie = this.industries.find(
              industrie => industrie.id === industrieId
            );
            industrie.sectors.forEach(sector => {
              this.filters.sectors.push(sector);
            });
          });
          break;
        case "selection":
          this.centerMap();
          // if (this.search) {
          // }
          break;
      }
      // if (this.lastBoxes.includes("sectors")) {
      //   let i = this.lastBoxes.indexOf("sectors");
      //   const industrie = this.industries.find(
      //     industrie => industrie.id === this.filters.industries[0]
      //   );
      //   this.filters = [this.lastBoxesTitle[i]];
      // }
      // if (this.lastBoxes.includes("industries")) {
      //   let i = this.lastBoxes.indexOf("industries");
      //   this.filters = [this.lastBoxesTitle[i]];
      // }

      this.currentSingleboxTitle = this.lastBoxesTitle.pop();
      this.currentSinglebox = this.lastBoxes.pop();

      /*

      switch (this.currentSinglebox) {
        case "selection":
          this.centerMap();

          if (this.search) {
            this.toggleSearchbar();
          } else if (
            document.getElementById("results").classList.contains("active")
          ) {
            this.currentSingleboxTitle = this.filters.sectors[0];
            this.currentSinglebox = "results";
          } else if (
            document.getElementById("sectors").classList.contains("active")
          ) {
            const industrie = this.industries.find(
              industrie => industrie.id === this.filters.industries[0]
            );
            this.currentSingleboxTitle = industrie.name;
            this.currentSinglebox = "sectors";
          } else {
            this.currentSinglebox = "industries";
          }

          break;

        case "results":
          var industrie = this.industries.find(
            industrie => industrie.id === this.filters.industries[0]
          );
          this.currentSingleboxTitle = industrie.name;
          this.filters.sectors = industrie.sectors;

          this.resetSearchbar();
          this.currentSinglebox = "sectors";
          break;

        case "sectors":
          this.currentSingleboxTitle = "Industries";
          this.initFilters();

          this.resetSearchbar();
          // this.deactivate("title-header");
          this.currentSinglebox = "industries";
          break;

        default:
          this.resetSearchbar();
          break;
      }
      */

      this.activateAllPoints();
      this.renderFilters();
    },

    pointSelected(id) {
      const point = this.points.find(point => point.id === id);

      // this.activate("title-header");

      // this.deactivate("search-button");
      // this.deactivate("search-bar");

      this.activateSinglebox("selection", point.name);
      this.selection = point;

      this.map.flyTo(point.coords, 16);
      // Todo: change icon to selection
    },

    sectorSelected(sectorId) {
      this.activateSinglebox("results", sectorId);
      // this.currentSingleboxTitle = sectorId;

      this.filters.sectors = [sectorId];
      this.renderFilters();
      this.results = this.points.filter(function(i) {
        return i.active === true;
      });
    },

    industrieSelected(industrieId) {
      const industrie = this.industries.find(
        industrie => industrie.id === industrieId
      );

      // this.activate("title-header");
      this.activateSinglebox("sectors", industrie.name);
      // this.currentSingleboxTitle = industrie.name;

      this.industries.forEach(i => {
        if (i.id !== industrieId) {
          i.active = false;
        } else {
          i.active = true;
        }
        this.industrieChanged(i.id, i.active);
      });

      this.filters.industries = [industrieId];
      this.filters.sectors = industrie.sectors;

      this.searching();
    },

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

      this.searching();
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

      this.points.forEach(point => {
        point.active = true;
      });

      this.searching();
    },

    activateSinglebox(id, title) {
      this.lastBoxes.push(this.currentSinglebox);
      this.lastBoxesTitle.push(this.currentSingleboxTitle);
      this.currentSinglebox = id;
      this.currentSingleboxTitle = title;
    },

    activateAllPoints() {
      this.points.forEach(point => {
        point.active = true;
      });
    },

    showActivePoints() {
      var newMarkers = new L.MarkerClusterGroup();
      // var newMarkers = new L.LayerGroup();

      this.points.forEach(point => {
        if (point.active) {
          point.leafletObject.addTo(newMarkers);
        }
      });

      this.markers.removeFrom(this.map);
      this.markers = newMarkers;
      this.markers.addTo(this.map);
    },

    renderFilters() {
      this.points.forEach(point => {
        var a = this.filters.industries.includes(point.industrie);
        var b = this.filters.sectors.includes(point.sector);
        var c = this.filters.activities.includes(point.activity);

        if (!(a && b && c)) {
          point.active = false;
          this.results = this.results.filter(function(i) {
            return i !== point;
          });
        }
      });

      this.showActivePoints();
    },

    initFilters() {
      this.filters.industries = [];
      this.industries.forEach(industrie => {
        industrie.active = true;

        if (!this.filters.industries.includes(industrie.id)) {
          this.filters.industries.push(industrie.id);
        }
      });

      this.filters.sectors = [];
      this.points.forEach(point => {
        const industrie = this.industries.find(
          industrie => industrie.id === point.industrie
        );

        if (!industrie.sectors.includes(point.sector)) {
          console.log("Push " + point.sector + " for " + industrie.name);
          industrie.sectors.push(point.sector);
        }

        if (!this.filters.sectors.includes(point.sector)) {
          this.filters.sectors.push(point.sector);
        }

        point.active = true;
      });

      this.filters.activities = [];
      this.activities.forEach(activity => {
        activity.active = true;

        if (!this.filters.activities.includes(activity.id)) {
          this.filters.activities.push(activity.id);
        }
      });

      this.searchValue = "";
    },

    initMarkers() {
      this.markers = new L.MarkerClusterGroup();
      // this.markers = new L.layerGroup();

      this.points.forEach(point => {
        const industrie = this.industries.find(
          industrie => industrie.id === point.industrie
        );
        console.log(industrie.name);

        point.leafletObject = L.marker(point.coords, {
          icon: industrie.marker,
          title: point.name
        });
        point.leafletObject.on("click", () => {
          this.pointSelected(point.id);
        });
        point.leafletObject.addTo(this.markers);
      });

      this.markers.addTo(this.map);
    },

    initMap() {
      this.map = L.map("map", { zoomControl: false }).setView(
        this.center,
        this.zoom
      );
      L.control.zoom({ position: "bottomright" }).addTo(this.map);
      this.tileLayer = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        }
      );

      this.tileLayer.addTo(this.map);
    }
  },
  watch: {
    searchValue: function() {
      this.searching();
    }
  }
};
</script>

<style>
/* #h {
  height: 300px;
  width: 180px;
} */

/* INIT */

html,
body {
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
}

.title {
  font-size: 1.3rem;
}

/* CUSTOM */

#app {
  position: relative;
  height: 700px;
  width: 1100px;
}

#map {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.center-button {
  position: absolute;
  height: 30px !important;
  width: 30px !important;
  bottom: 120px;
  right: 30px;
  border: 2px solid rgba(0, 0, 0, 0.2);
}

.logo {
  background-image: url("assets/icons/idm.svg");
  background-repeat: no-repeat;
}

.logo.bottom-left {
  position: absolute;
  height: 45px;
  width: 120px;
  z-index: 20;
  bottom: 30px;
  left: 30px;
}

#omnibox {
  position: absolute;
  top: 0;
  z-index: 20;
  width: 400px;
  height: 65%;
  background: white;
  overflow: hidden;
}

.navbar {
  display: none;
  height: 75px;
  padding: 0 30px;
}

.navbar .title {
  text-transform: capitalize;
}

#navbar-filters {
  position: absolute;
}

.title-header {
  transform: translate(-45px);
  transition: all 0.15s ease-in-out;
}

.title-header.active {
  display: flex !important;
  transform: translate(0);
}

.nav-back {
  opacity: 0;
  transition: opacity 0.15s linear;
}

.title-header.active .nav-back {
  opacity: 100;
}

.search-bar {
  /* display: none; */
  height: 34px;
  width: 0;
  opacity: 0;
  transition: width 0.15s ease-out;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-right: none;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.search-bar.active {
  width: 160px;
  opacity: 100;
}

.search-button.active {
  height: 36px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  margin-left: 0;
}

#omnibox .singlebox {
  /* display: none; */
  position: absolute;
  transform: translate(100%);
  opacity: 0;
  overflow-y: scroll;
  height: calc(100% - 75px);
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  transition: all 0.15s ease-in-out;
}

#industries {
  z-index: 100;
}

#sectors {
  z-index: 110;
}

#results {
  z-index: 120;
}

#selection {
  z-index: 130;
  padding: 0 30px;
}

#selection .row {
  margin: 25px 0;
}

#filters {
  z-index: 200;
  margin: 0 30px;
}

.filter-class {
  margin-top: 30px;
}

.select-list > .select-item {
  height: 75px;
  padding: 0 15px 0 30px;
  cursor: pointer;
}

.select-list > .select-item:hover {
  background: #eeeeee;
}

.select-item > .icon {
  height: 50px;
  width: 50px;
  margin-right: 15px !important;
}

.leaflet-bar {
  border-radius: 10px;
}

.leaflet-control-zoom.leaflet-bar.leaflet-control {
  /* box-shadow: rgba(50, 50, 50, 0.75) 1px 0px 15px 0px; */
  bottom: 20px;
  right: 20px;
}

.leaflet-touch .leaflet-bar a:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.leaflet-touch .leaflet-bar a:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

/* STYLE */

.primary-bg {
  background-color: #a9bf00 !important;
}

.white-bg {
  background-color: white !important;
}

.margined {
  margin: 30px;
}

.shadowed {
  box-shadow: rgba(50, 50, 50, 0.75) 1px 0px 15px 0px;
}

.rounded {
  border-radius: 10px;
}

.center-area {
  display: flex;
  flex: auto;
  height: 100%;
}

.center-area .center-y {
  margin-top: auto;
  margin-bottom: auto;
}

.center-area .center-x {
  margin-left: auto;
  margin-right: auto;
}

.fill {
  width: 100%;
}

.inline-block {
  display: inline-block;
}

a {
  color: black;
  text-decoration: none;
  border-bottom: 0.5px lightgray solid;
}

.icon {
  height: 30px;
  width: 30px;
  background-size: contain;
  background-repeat: no-repeat;
}

.button {
  height: 40px;
  width: 40px;
  margin-left: 15px;
  background-color: #eeeeee;
  cursor: pointer;
}

.button .icon {
  height: 60%;
  width: 60%;
}

.navbar .button .icon {
  fill: #707173;
  opacity: 40%;
}

.row {
  height: 100px;
  display: flex;
  justify-content: space-between;
}

.links {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.social {
  display: flex;
}

.social > :first-child {
  margin-right: 15px;
}

.logo {
  background-size: contain;
  width: 100px;
}

.description {
  margin-top: 15px;
  margin-bottom: 30px;
}

.contact {
  height: 40px;
  margin: 15px 0;
}

.contact > .button {
  margin-right: 15px;
  margin-left: 0px;
  cursor: auto;
}

.contact .icon {
  fill: white;
  opacity: 90%;
}

.clickable {
  cursor: pointer;
}

.singlebox.active {
  transform: translate(0%) !important;
  opacity: 100 !important;
}

.active {
  display: block !important;
}

/* ICONS */

.back-icon {
  background-image: url("assets/icons/left.svg");
  margin-right: 15px !important;
}

.select-item > .forward-icon {
  background-image: url("assets/icons/right.svg");
  margin-left: auto !important;
  background-position: right;
  height: 55px;
}

.filter-icon {
  background-image: url("assets/icons/filter.svg");
}

.center-icon {
  background-image: url("assets/icons/center-map.svg");
}

.facebook-icon {
  background-image: url("assets/icons/facebook.jpeg");
}

.linkedin-icon {
  background-image: url("assets/icons/linkedin.png");
}
</style>
