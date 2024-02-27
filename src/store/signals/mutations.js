/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
export default {
  setSignals(state, payload) {
    state.signals = payload.signals;
  },
  setSignal(state, payload) {
    state.signals = payload;
  },
};

