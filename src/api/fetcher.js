import config from "./config";
import axios from "axios";

export function getPoints(path, parameters) {
    var data = axios.get(config.API_BASE_URL + path, {
            parameters: parameters
        })
        .then(function (response) {
            console.log(response.data)
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            throw error;
        });
    data = [
        {
          id: 0,
          name: "Bozen",
          industrie: 2,
          sector: "UniBz",
          activity: 2,
          address: "Piazza Universita', 39100 Bolzano (BZ)",
          coords: [46.49067, 11.33982],
          logo: require("@/assets/logos/flashbeing.png"),
          description: "Lorem Ipsum lorot sit amet",
          linkedin: "",
          facebook: "",
          instagram: "",
          website: "jdsajsd",
          phone: "",
          mail: "",
          active: false
        },
        {
          id: 1,
          name: "Brixen",
          industrie: 2,
          sector: "UniBz",
          activity: 2,
          address: "Via Volta",
          coords: [46.71503, 11.65598],
          logo: require("@/assets/logos/unibz.png"),
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkedin: "linkedin.com",
          facebook: "facebook.com",
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
          website: "nada.com",
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
          website: "xyz.abc",
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
          website: "abc.com",
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
          coords: [46.478827, 11.332528],
          active: false
        },
        {
          id: 6,
          name: "Tizio",
          industrie: 1,
          sector: "Software Production",
          activity: 0,
          coords: [46.458827, 11.332528],
          active: false
        },
        {
          id: 7,
          name: "Test",
          industrie: 0,
          sector: "Private Uni",
          activity: 2,
          coords: [46.488827, 11.332528],
          active: false
        }
      ];
      return data;
}