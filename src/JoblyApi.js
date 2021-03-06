import axios from "axios";
import { TOKEN_LOCALSTORAGE } from "./App.js"

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
        // paramsOrData._token = ( // for now, hardcode token for "testing"
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
        //     "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
        //     "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U");

        let _token = localStorage.getItem(TOKEN_LOCALSTORAGE);
        if (_token != null) {
            _token = _token.replace(/"/g, "");
        }

        console.debug("API Call:", endpoint, paramsOrData, verb);

        try {
            return (await axios({
                method: verb,
                url: `${BASE_URL}/${endpoint}`,
                //     [verb === "get" ? "params" : "data"]: paramsOrData
                // })).data;
                [verb === "get" ? "params" : "data"]: { _token, ...paramsOrData }
            })).data;
            // axios sends query string data via the "params" key,
            // and request body data via the "data" key,
            // so the key we need depends on the HTTP verb
        }

        catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getCompanies(search) {
        let res = await this.request(`companies`, { search });
        return res.companies;
    }

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getJobs(search) {
        let res = await this.request(`jobs`, { search });
        return res.jobs;
    }

    static async applyToJob(id) {
        let res = await this.request(`jobs/${id}/apply`, {}, "post");
        return res.message;
    }

    static async login(data) {
        let res = await this.request(`login`, data, "post");
        return res.token;
    }

    static async register(data) {
        let res = await this.request(`users`, data, "post");
        return res.token;
    }

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }
}

export default JoblyApi;