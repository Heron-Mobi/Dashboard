/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import axios from "axios";
import { apiBaseUrl } from "../../utils/config";

const api = `${apiBaseUrl}/v0/integrations/`;
/*
  Axios is being used to make calls to API
  https://github.com/axios/axios
  https://www.npmjs.com/package/vue-axios
*/
export default {
  // calls the API Gateway endpoint for getting all Signals
  async fetchTwitterLink({ commit, rootState }) {
    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      "Authorization": rootState.authModule.idToken,
    };

    commit("setIsLoading", true);

    const response = await axios.get(api + "twitter", {
      headers: headers,
    });

    if (response.status == "200") {
      commit("setTwitterLink", response.data);
      commit("setIsLoading", false);
    }
  },
  async setTwitterToken({ commit, rootState }, url) {
    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      "Authorization": rootState.authModule.idToken,
    };

    commit("setIsLoading", true);
    console.log(url);
    const response = await axios.post(api + "twitter", url , {
      headers: headers,
    });

    if (response.status == "200") {
      console.log(response.data)
      commit("setTwitterLink", response.data);
      commit("setIsLoading", false);
    }
  },

};
