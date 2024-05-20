/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import axios from "axios";
import { apiBaseUrl } from "../../utils/config";

const api = `${apiBaseUrl}/v0/signals`;

/*
  Axios is being used to make calls to API
  https://github.com/axios/axios
  https://www.npmjs.com/package/vue-axios
*/
export default {
  // calls the API Gateway endpoint for getting all Signals
  async fetchSignals({ commit, rootState }) {
    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      "Authorization": rootState.authModule.idToken,
    };

    commit("setIsLoading", true);

    const response = await axios.get(api, {
      headers: headers,
    });

    if (response.status == "200") {
      commit("setSignals", response.data);
      commit("setIsLoading", false);
    }
  },

  // calls the delete API Gateway endpoint for Signals
  async saveSignals({ commit, rootState }, payload) {
    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

    commit("setIsLoading", true);
    const response = await axios.post(api, payload, {
      headers: headers,
    });

    if (response.status == "200") {
      commit("setSignals", payload);
      commit("setIsLoading", false);
    }
  },
};
