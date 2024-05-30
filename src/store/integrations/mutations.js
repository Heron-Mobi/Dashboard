/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
export default {
  setTwitterLink(state, payload) {
    state.twitterLink = payload;
  },
  setSQS(state, payload) {
    console.log(payload) 
    state.sqs = payload;
  },
};
