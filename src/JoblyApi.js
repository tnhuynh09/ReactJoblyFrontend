import axios from "axios";
import { TOKEN_LOCALSTORAGE } from "./App.js"

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// const BASE_URL = "https://tnhuynh-react-jobly-backend.herokuapp.com";
console.log("JoblyApi - BASE_URL =", BASE_URL);

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
        console.log("API CALL - GET COMPANIES RESULT", res);
        return res.companies;
    }

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        console.log("API CALL - GET SINGLE COMPANY RESULT", res);
        return res.company;
    }

    static async getJobs(search) {
        let res = await this.request(`jobs`, { search });
        console.log("API CALL - GET ALL JOBS RESULT", res);
        return res.jobs;
    }

    static async applyToJob(id) {
        let res = await this.request(`jobs/${id}/apply`, {}, "post");
        return res.message;
    }

    static async login(data) {
        let res = await this.request(`login`, data, "post");
        console.log("API CALL - LOGIN", res);
        return res.token;
    }

    static async register(data) {
        let res = await this.request(`users`, data, "post");
        console.log("API CALL - REGISTER", res);
        return res.token;
    }

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        console.log("API CALL - GET CURRENT USER", res);
        return res.user;
    }

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        console.log("API CALL - SAVE PROFILE", res);
        return res.user;
    }
}

export default JoblyApi;