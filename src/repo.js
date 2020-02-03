var repo = new Vue({
  // el: '#app',
  data: {
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
        marker: L.icon({
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
        marker: L.icon({
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
});