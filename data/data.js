var a =
    [
        {
            id: 0,
            name: 'Education',
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
            sectors: [
                {
                    id: 0,
                    name: 'UniBz',
                    active: true,
                    entities: [
                        {
                            id: 0,
                            name: 'Bozen',
                            activity: 'entity',
                            coords: [46.4906700, 11.3398200],
                        },
                        {
                            id: 1,
                            name: 'Brixen',
                            activity: 'entity',
                            coords: [46.7150300, 11.6559800],
                        },
                        {
                            id: 2,
                            name: 'Bruneck',
                            activity: 'entity',
                            coords: [46.7994200, 11.9342900],
                        },
                    ]
                },
                {
                    id: 0,
                    name: 'Private Uni',
                    active: true,
                    entities: [
                        {
                            id: 0,
                            name: 'Claudiana',
                            activity: 'entity',
                            coords: [46.499657, 11.313190],
                        },
                    ],
                },
            ],
        },
        {
            id: 1,
            name: 'Technology',
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
            sectors: [
                {
                    id: 0,
                    name: 'Software Production',
                    active: true,
                    entities: [
                        {
                            id: 0,
                            name: 'FlashBeing',
                            activity: 'company',
                            coords: [46.488827, 11.332528],
                        },
                        {
                            id: 1,
                            name: 'Free Software Lab',
                            activity: 'company',
                            coords: [46.478827, 11.332528],
                        },
                        {
                            id: 2,
                            name: 'Tizio',
                            activity: 'freelancer',
                            coords: [46.458827, 11.332528],
                        },
                    ],
                },
            ],
        },
    ];