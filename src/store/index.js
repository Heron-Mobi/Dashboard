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
      isLoadingTwitter: false,
      isLoadingSQS: false,
    };
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setIsLoadingTwitter(state, payload) {
      state.isLoadingTwitter = payload;
    },
    setIsLoadingSQS(state, payload) {
      state.isLoadingSQS = payload;
    },
  },
  actions: {
    setIsLoading(context, payload) {
      context.commit("setIsLoading", payload);
    },
    setIsLoadingTwitter(context, payload) {
      context.commit("setIsLoadingTwitter", payload);
    },
    setIsLoadingSQS(context, payload) {
      context.commit("setIsLoadingSQS", payload);
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
    getIsLoadingTwitter(state) {
      return state.isLoadingTwitter;
    },
    getIsLoadingSQS(state) {
      return state.isLoadingSQS;
    },
  },
});
