/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import { createStore } from "vuex";
import authModule from "./auth/index";
import settingsModule from "./settings/index";
import videosModule from "./videos/index";
import signalsModule from "./signals/index";
import integrationsModule from "./integrations/index";

export default createStore({
  state() {
    return {
      isLoading: false,
    };
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    setIsLoading(context, payload) {
      context.commit("setIsLoading", payload);
    },
  },
  modules: {
    authModule,
    settingsModule,
    videosModule,
    signalsModule,
    integrationsModule,
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
  },
});
