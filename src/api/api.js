import config from "./config";
import axios from "axios";

export function get(path, parameters) {
    return axios
        .get(config.API_BASE_URL + path, {
            parameters: parameters
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            throw error;
        });
}